const fs = require("fs");
const { v4: uuid } = require('uuid');
const storageTimeline = require("nodejs-storage-timeline");

const storageName = './.storage';
const schemaName = "schema";

const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Open / create the storage
if (!fs.existsSync(storageName)) {
    fs.mkdirSync(storageName);
}
const storage = new storageTimeline.Storage(storageName);

// Open / create the schema
storage.create(schemaName, () => {

    const schema = storage.get(schemaName);

    // Seed random time-lines
    const timeLineCount = randomInRange(500, 1000);
    for (let i = 0; i < timeLineCount; i++) {

        const timeLineName = `time-line-${i}`;

        // Open / create the time-line
        schema.create(timeLineName, () => {

            const timeLine = schema.get(timeLineName);
            for (let k = 0; k < 111; k++) {
                timeLine.add(uuid(), () => {});
            }
        });
    }
});
