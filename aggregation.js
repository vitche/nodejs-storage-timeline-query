import objectHash from "object-hash";
import {Cache} from 'memory-cache';

export async function countDuplicates(timeLine, hashFunction = objectHash) {

    const memoryCache = new Cache();

    let count = 0;
    let size = 0;

    while (true) {

        const item = await new Promise((resolve, reject) => {
            timeLine.next(function (error, value) {
                if (error) {
                    reject(error);
                } else {
                    resolve(value);
                }
            });
        });

        if (!item) {
            return {
                count,
                size
            }
        }

        const hash = hashFunction(item);
        if (true === memoryCache.get(hash)) {

            // Item was processed before.
            count++;
            size += JSON.stringify(item).length;
        } else {
            memoryCache.put(hash, true);
        }
    }
}

export async function countUnique(timeLine, hashFunction = objectHash) {

    const memoryCache = new Cache();

    let count = 0;
    let size = 0;

    while (true) {

        const item = await new Promise((resolve, reject) => {
            timeLine.next(function (error, value) {
                if (error) {
                    reject(error);
                } else {
                    resolve(value);
                }
            });
        });

        if (!item) {
            return {
                count, size
            }
        }

        const hash = hashFunction(item);
        if (true === memoryCache.get(hash)) {

            // Item was processed before.
        } else {
            count++;
            size += JSON.stringify(item).length;

            memoryCache.put(hash, true);
        }
    }
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
