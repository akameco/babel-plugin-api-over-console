const fs = require('fs')
const babel = require('babel-core')
const { default: plugin } = require('../../lib')

const { code } = babel.transformFileSync('app.js', {
  babelrc: false,
  plugins: [plugin],
})

fs.writeFileSync('server.js', code.trim())
