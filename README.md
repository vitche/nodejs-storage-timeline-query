# Node.js `Storage.Timeline` Query

## Project Description

This project provides a powerful query mechanism for the `Storage.Timeline` time series database, implemented in Node.js. The `Storage.Timeline` database is designed for efficient time series data management with a portable data format.

This library enhances the functionality of `Storage.Timeline` by offering a set of tools to query, analyze, and manipulate the stored time series data effectively. Whether you need to count events, remove duplicates, or generate random pyramid-shaped data for testing, this library has got you covered.

<img src="./storage_timeline_aggregation.png" alt="Storage.Timeline Aggregation" />

## Features

- **Time Series Querying**: Efficiently query time series data stored in `Storage.Timeline` format.
- **Aggregation Operations**: Perform operations like counting events, de-duplication, and finding minimum/maximum time on the time series data.
- **Data Generation**: Generate random pyramid-shaped data for testing and development purposes.
- **Portable Data Format**: Work with a portable data format suitable for various applications and platforms.

## Installation

To install the project dependencies, you can use:

```sh
npm install
```

## Usage

### Generating Random Pyramid-Shaped Data

You can generate random pyramid-shaped data and store it in `Storage.Timeline`:

```js
import { randomPyramidalStorage } from "./generation.js";

randomPyramidalStorage('./.storages/storage-1', 17, 23, ":)");
randomPyramidalStorage('./.storages/storage-2', 17, 23, ":(");
```

### Counting Events and Data Size

Count the number of unique events and the total data size in a timeline:

```js
import { Storage } from "nodejs-storage-timeline";
import { countUnique } from "./aggregation.js";

const storage = new Storage('./.storages/storage-1');
const schema = storage.get('schema-0');
const timeLine = schema.get('time-line-0');

countUnique(timeLine).then((result) => {
    console.log(`Count: ${result.count}, Size: ${result.size}`);
}).catch((error) => {
    console.error(error);
});
```

### De-duplicating Events

Remove duplicate events from a timeline:

```js
import { unique } from "./aggregation.js";

unique(timeLine).then((result) => {
    console.log('De-duplicated Timeline:', result);
}).catch((error) => {
    console.error(error);
});
```

### Counting Duplicates

Count duplicate events in a timeline:

```js
import { Storage } from "nodejs-storage-timeline";
import { countDuplicates } from "./aggregation.js";
import objectHash from "object-hash";

const storage = new Storage('./.storages/storage-1');
const schema = storage.get('schema-0');
const timeLine = schema.get('time-line-0');

countDuplicates(timeLine, item => objectHash(item.value)).then((analytics) => {
    console.log(analytics);
}).catch((error) => {
    console.error(error);
});
```

### Finding Minimum and Maximum Time

Find the minimum and maximum event time in a timeline:

```js
import { minimumTime, maximumTime } from "./aggregation.js";

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
```

## Project Structure

- **generation.js**: Contains functions to generate random pyramid-shaped data.
- **aggregation.js**: Contains functions for aggregating and querying time series data.
- **main.js**: Entry point of the project, exporting aggregation and generation functions.
- **test.js**: Script to test the functionalities of the project.
- **commit.sh**: Script to configure git user details for commits.
- **package.json**: Project configuration and dependencies.

## Contributing

We welcome contributions to the project! Please feel free to submit issues or pull requests.

## License

This project is licensed under the LGPL License. See the `LICENSE` file for details.

## Authors

Developed and maintained by the `Vitche Research Team`. Contact us at [developer@vitche.com](mailto:developer@vitche.com).
