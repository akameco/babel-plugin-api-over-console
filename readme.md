# babel-plugin-api-over-console [![Build Status](https://travis-ci.org/akameco/babel-plugin-api-over-console.svg?branch=master)](https://travis-ci.org/akameco/babel-plugin-api-over-console)

> transfrom to JSON Server from CLI app!!!


## Install

```
$ npm install --save-dev babel-plugin-api-over-console
```


## Usage

.babelrc

```js
{
  plugins: ["api-over-console"]
}
```

```js
console.log('hello')


↓ ↓ ↓ ↓ ↓


const express = require('express');

const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.get('/', (req, res) => {
  res.json('hello');
});
app.listen(port, () => {
  console.log('listening on %s', port);
});
```

## License

MIT © [akameco](http://akameco.github.io)
