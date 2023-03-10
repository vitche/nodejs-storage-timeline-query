const objectHash = require('object-hash');

module.exports = function () {

    let lastTimeLine = undefined;

    const self = {
        count: function (timeLine, callback) {

            if (!timeLine.memoryCache) {
                timeLine.memoryCache = require('memory-cache');
                timeLine.memoryCache.clear();
                lastTimeLine = timeLine;
                lastTimeLine._count = 0;
                lastTimeLine._size = 0;
            }

            timeLine.next(function (error, item) {

                if (error) {
                    callback(error);
                    return;
                } else if (!item) {
                    callback(undefined, {
                        count: lastTimeLine._count,
                        size: lastTimeLine._size
                    });
                    lastTimeLine = undefined;
                    return;
                }

                const hash = objectHash(item);
                if (true === timeLine.memoryCache.get(hash)) {

                    // Item was processed before.
                    lastTimeLine._count++;
                    lastTimeLine._size += JSON.stringify(item).length;
                } else {
                    timeLine.memoryCache.put(hash, true);
                }

                // A recursion call to process the next item.
                self.count(timeLine, callback);
            });
        },
        // This is a recursive method. So, the amount of items processed can be limited.
        // TODO: Change to a recurrent implementation
        unique: function (timeLine, callback) {
            if (!timeLine.memoryCache) {
                timeLine.memoryCache = require('memory-cache');
                timeLine.memoryCache.clear();
            }
            timeLine.next(function (error, item) {

                if (error) {
                    callback(error);
                    return;
                } else if (!item) {
                    callback(undefined, timeLine.cleanCopy);
                    return;
                }

                const hash = objectHash(item);
                if (true === timeLine.memoryCache.get(hash)) {

                    // Item was processed before.
                    // A recursion call to process the next item.
                    self.unique(timeLine, callback);
                } else {

                    timeLine.memoryCache.put(hash, true);

                    // Save this item
                    function _saveItem(timeLine, item) {

                        // ?????????????????? ?????????????? ?? ?????????????????? ???????????? ???????????????????? ????????
                        timeLine.cleanCopy.add(item.time, item.value, function (error) {
                            if (error) {
                                callback(error);
                                return;
                            }

                            // ???????????????????? ???????????????????????? ?????????????????? ??????????????
                            self.unique(timeLine, callback);
                        });
                    }

                    if (!timeLine.cleanCopy) {

                        // ?????? ???? ???????????????????? ???????????????? ???????? ????????, ?????????? ???????????????????????? ??????????????????, ?????? ???????? ?????????????????? ??????????.
                        // ?????????????? ?? ?????????????? ??????????????.
                        timeLine.copy(timeLine._name + '.tmp', function (error, newTimeLine) {

                            newTimeLine.truncate(function (error, newTimeLine) {

                                timeLine.cleanCopy = newTimeLine;
                                _saveItem(timeLine, item);
                            });
                        });
                    } else {
                        _saveItem(timeLine, item);
                    }
                }
            });
        }
    }

    return self;
};
