const fs = require("fs");
const { v4: uuid } = require('uuid');
const storageTimeline = require("nodejs-storage-timeline");

/**
 * Generates a random number within the given range.
 * @param min Range start.
 * @param max Range end.
 * @returns The resulting random number.
 */
const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Extrude a storage with the random pyramid shape.
 * @param storageName The file-system path to a storage.
 * @param min Random range start.
 * @param max Random range end.
 */
// TODO: Check-out the "random pyramid" term
const randomPyramidalStorage = (storageName, min, max) => {

    // Open / create the storage
    if (!fs.existsSync(storageName)) {
        fs.mkdirSync(storageName);
    }

    const storage = new storageTimeline.Storage(storageName);

    // Seed random schema
    const schemaCount = randomInRange(min, max);
    for (let i = 0; i < schemaCount; i++) {

        const schemaName = `schema-${i}`;

        // Open / create the schema
        storage.create(schemaName, () => {

            const schema = storage.get(schemaName);

            // Seed random time-lines
            const timeLineCount = randomInRange(min, max);
            for (let k = 0; k < timeLineCount; k++) {

                // Open / create the time-line
                const timeLineName = `time-line-${k}`;
                schema.create(timeLineName, () => {

                    const timeLine = schema.get(timeLineName);

                    // Seed random events
                    const eventCount = randomInRange(min, max);
                    for (let l = 0; l < eventCount; l++) {
                        timeLine.add(uuid(), () => {});
                    }
                });
            }
        });
    }
};

module.exports = {
    randomPyramidalStorage
};
