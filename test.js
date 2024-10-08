import objectHash from "object-hash";
import {randomPyramidalStorage} from "./generation.js";
import {Storage} from "nodejs-storage-timeline";
import {countDuplicates, maximumTime, minimumTime} from "./aggregation.js";

randomPyramidalStorage('./.storages/storage-1', 17, 23, ":)");
randomPyramidalStorage('./.storages/storage-2', 17, 23, ":(");

const storage = new Storage('./.storages/storage-1');
const schema = storage.get('schema-0');
const timeLine = schema.get('time-line-0');

// Count events and total data size for the given time-line
countDuplicates(timeLine, (item) => {
    return objectHash(item.value);
}).then((analytics) => {
    console.log(analytics);
});

// De-duplicate events for the given time-line
// unique(timeLine, (item) => {
//     return objectHash(item.value);
// }).then((uniqueTimeLine) => {
//     console.log(uniqueTimeLine);
// });

minimumTime(timeLine).then((minTime) => {
    console.log(`Minimum time: ${minTime}`);
}).catch((error) => {
    console.error(error);
});

maximumTime(timeLine).then((maxTime) => {
    console.log(`Maximum time: ${maxTime}`);
}).catch((error) => {
    console.error(error);
});
