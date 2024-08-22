# Node.js `Storage.Timeline` Query

## Project Description

This project provides a powerful query mechanism for the `Storage.Timeline` time series database, implemented in Node.js. The `Storage.Timeline` database is designed for efficient time series data management with a portable data format.

This library enhances the functionality of `Storage.Timeline` by offering a set of tools to query, analyze, and manipulate the stored time series data effectively. Whether you need to count events, remove duplicates, or generate random pyramid-shaped data for testing, this library has got you covered.

## Features

- **Time Series Querying**: Efficiently query time series data stored in `Storage.Timeline` format.
- **Aggregation Operations**: Perform operations like counting events and de-duplication on the time series data.
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

Count the number of events and the total data size in a timeline:

```js
import { Storage } from "nodejs-storage-timeline";
import { count } from "./aggregation.js";

const storage = new Storage('./.storages/storage-1');
const schema = storage.get('schema-0');
const timeLine = schema.get('time-line-0');

count(timeLine).then((result) => {
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

## Contributing

We welcome contributions to the project! Please feel free to submit issues or pull requests.

## License

This project is licensed under the LGPL License. See the `LICENSE` file for details.

## Authors

Developed and maintained by the `Vitche Research Team`. Contact us at [developer@vitche.com](mailto:developer@vitche.com).

