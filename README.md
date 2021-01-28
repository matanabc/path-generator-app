[![GitHub all releases](https://img.shields.io/github/downloads/matanabc/path-generator-app/total?logo=github)](https://github.com/matanabc/path-generator-app/releases)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/matanabc/path-generator-app?logo=github)](https://github.com/matanabc/path-generator-app/releases)

# PathGenerator

![App view](./app.png)
**PathGenerator** is a motion profile path generator, which you can easily use to draw a path for your robot to follow. <br/>
When you finish setting up the path for your robot to follow, just press on the export button and use the CSV files on your robot to follow the path.

**PathGenerator** is based on [PathGenerator](https://www.npmjs.com/package/path-generator) package.

## Setup Instructions:

### Release:

-   Web latest version [here](https://matanabc.github.io/path-generator-app/).
-   Download desktop latest version [here](https://github.com/matanabc/path-generator-app/releases).

### Source:

1. Install [Node.js](https://nodejs.org).
1. Clone this repository.
1. Install all project dependencies: `npm i`.

-   npm commands:
    -   Development:
        -   `npm run start-web` to run in web mode.
        -   `npm run start-app` to run in desktop mode.
    -   Build:
        -   `npm run build-web` to build for web, Build files will located in `/build` folder.
        -   `npm run build-app` to build for desktop, Build files will located in `/dist` folder.
