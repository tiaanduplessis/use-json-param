
# use-json-param
[![package version](https://img.shields.io/npm/v/use-json-param.svg?style=flat-square)](https://npmjs.org/package/use-json-param)
[![package downloads](https://img.shields.io/npm/dm/use-json-param.svg?style=flat-square)](https://npmjs.org/package/use-json-param)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/use-json-param.svg?style=flat-square)](https://npmjs.org/package/use-json-param)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Little wrapper around useSearchParams for large JSON objects

## Table of Contents
- [use-json-param](#use-json-param)
  - [Table of Contents](#table-of-contents)
  - [Background](#background)
  - [Install](#install)
  - [Usage](#usage)
    - [Kitchen sink](#kitchen-sink)
  - [API](#api)
  - [Contributing](#contributing)
  - [License](#license)

## Background

This library combines React Router v6's [`useSearchParams`](https://reactrouter.com/docs/en/v6/hooks/use-search-params) with [`JSONCrush`](https://github.com/KilledByAPixel/JSONCrush) to persist large JSON objects to the URL query string in a highly compressed manner. You'll likely only want to use it if you need to persist a lot of things to the query string and want to avoid possibly running into [max length issues](https://stackoverflow.com/questions/812925/what-is-the-maximum-possible-length-of-a-query-string).

## Install

Install the package locally within you project folder with your package manager:

With `npm`:
```sh
npm install use-json-param
```

With `yarn`:
```sh
yarn add use-json-param
```

With `pnpm`:
```sh
pnpm add use-json-param
```

## Usage

### Kitchen sink

```tsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  useJsonParam // Also useJSONParam alias
} from "use-json-param";

function Page () {
  const [jsonParams, setJsonParams] = useJsonParam() // default key is "q"
  const otherJsonParams, setOtherJsonParams] = useJsonParams({
    // Optional defaults will be deeply merged with setOtherJsonParams
    foo: true,
    baz: false
  })

  // With key and defaults
  const [anotherJsonParams, setAnotherJsonParams] = useJsonParams('custom', {
    nananan: 'batman'
  })

  const handleUpdateParams = () => setJsonParams({foo: true, bar: false})

  return <main>
    <button type="button" onClick={handleUpdateParams}>Update</button>
  </main>
}

export default function App() {
  return (
    <BrowserRouter>
      <Page>
    </BrowserRouter>
  );
}
```


## API

For all configuration options, please see the [API docs](https://paka.dev/npm/use-json-param).

## Contributing

Got an idea for a new feature? Found a bug? Contributions are welcome! Please [open up an issue](https://github.com/tiaanduplessis/use-json-param/issues) or [make a pull request](https://makeapullrequest.com/).

## License

[MIT © Tiaan du Plessis](./LICENSE)
    