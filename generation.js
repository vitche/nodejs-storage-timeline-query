import fs from "fs";
import uuid from "uuid";
import storageTimeline from "nodejs-storage-timeline";

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
 * @param value The value to be stored.
 *
 * A random pyramid can refer to different things depending on the context. In mathematics, a random pyramid could be a geometric shape that has a polygonal base and triangular faces that meet at a single point (the apex). The term "random" might be used to suggest that the dimensions or angles of the pyramid are chosen randomly or according to some probabilistic distribution.
 * However, in other contexts, "random pyramid" might simply be a descriptive phrase that implies an irregular or haphazard arrangement of objects that roughly form a pyramid-like shape. For example, a pile of rocks or a stack of books arranged in a pyramid shape could be described as a "random pyramid" to emphasize the lack of deliberate design or organization.
 * Without additional context, it's difficult to determine precisely what is meant by the term "random pyramid."
 *
 */
export function randomPyramidalStorage(storageName, min, max, value = uuid()) {

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
                        timeLine.add(value, () => {
                        });
                    }
                });
            }
        });
    }
}
