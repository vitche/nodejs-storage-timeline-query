import {randomPyramidalStorage} from "./generation.js";
import {Storage} from "nodejs-storage-timeline";

randomPyramidalStorage('./.storages/storage-1', 17, 23);
randomPyramidalStorage('./.storages/storage-2', 17, 23);

const storage = new Storage('./.storages/storage-1');
const schema = storage.get('schema-0');
const timeLine = schema.get('time-line-0');
timeLine.nextString((error, value) => {
    console.log(value);
});

