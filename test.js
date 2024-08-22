import objectHash from "object-hash";

import {randomPyramidalStorage} from "./generation.js";
import {Storage} from "nodejs-storage-timeline";
import {unique} from "./aggregation.js";

randomPyramidalStorage('./.storages/storage-1', 17, 23, ":)");
randomPyramidalStorage('./.storages/storage-2', 17, 23, ":(");

const storage = new Storage('./.storages/storage-1');
const schema = storage.get('schema-0');
const timeLine = schema.get('time-line-0');

// Count events and total data size for the given time-line
// count(timeLine, (error, length) => {
//     console.log(length);
// });

// De-duplicate events for the given time-line
// unique(timeLine, (item) => {
//     return objectHash(item.value);
// }).then((uniqueTimeLine) => {
//     console.log(uniqueTimeLine);
// });
