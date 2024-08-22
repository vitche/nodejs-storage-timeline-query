import objectHash from "object-hash";
import memoryCache, {Cache} from 'memory-cache';

let lastTimeLine = undefined;

export function count(timeLine, callback, hashFunction = objectHash) {

    if (!timeLine.memoryCache) {
        timeLine.memoryCache = memoryCache;
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

        const hash = hashFunction(item);
        if (true === timeLine.memoryCache.get(hash)) {

            // Item was processed before.
            lastTimeLine._count++;
            lastTimeLine._size += JSON.stringify(item).length;
        } else {
            timeLine.memoryCache.put(hash, true);
        }

        // A recursion call to process the next item.
        count(timeLine, callback);
    });
}

export async function unique(timeLine, hashFunction = objectHash) {

    const memoryCache = new Cache();

    let item;
    while (true) {

        item = await new Promise((resolve, reject) => {
            timeLine.next(function (error, item) {
                if (error) {
                    reject(error);
                } else {
                    resolve(item);
                }
            });
        });

        if (!item) {
            return timeLine.cleanCopy;
        } else {

            // Calculate the desired event hash
            const hash = hashFunction(item);

            if (true === memoryCache.get(hash)) {

                // Item was processed before.
                // continue;
            } else {

                memoryCache.put(hash, true);

                // Create a new time-line to hold the clean copy
                if (!timeLine.cleanCopy) {

                    // Тут мы специально копируем весь файл, чтобы одновременно убедиться, что есть свободное место.
                    // Грязное и ленивое решение.
                    let newTimeLine = await new Promise((resolve, reject) => {
                        timeLine.copy(timeLine._name + '.tmp', async function (error, value) {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(value)
                            }
                        });
                    });

                    // And we delete the temporary file
                    newTimeLine = await new Promise((resolve, reject) => {
                        newTimeLine.truncate(function (error, value) {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(value);
                            }
                        })
                    });

                    // Therefore, we get the new, empty, clean time-line
                    timeLine.cleanCopy = newTimeLine;
                }

                // Сохраняем элемент в очищенную версию временного ряда
                await new Promise((resolve, reject) => {
                    timeLine.cleanCopy.add(item.time, item.value, async function (error) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
                });
            }
        }
    }
}
