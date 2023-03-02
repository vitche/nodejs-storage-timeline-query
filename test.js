const fs = require("fs");
const storageTimeline = require("nodejs-storage-timeline");

const storageName = './.storage';
const schemaName = "schema";
const timeLineName = "time-line";

// Open / create the storage
if (!fs.existsSync(storageName)) {
    fs.mkdirSync(storageName);
}
const storage = new storageTimeline.Storage(storageName);

// Open / create the schema
storage.create(schemaName, () => {

    const schema = storage.get(schemaName);

    // Open / create the time-line
    schema.create(timeLineName, () => {

        const timeLine = schema.get(timeLineName);
        for (let i = 0; i < 100000; i++) {
            timeLine.add(`${i}:)`, () => {});
        }
    });
});
