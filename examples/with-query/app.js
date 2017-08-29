const mri = require('mri')

const args = process.argv.slice(2)
const cli = mri(args)

// node app.js --name akameco
console.log({ name: cli.name })
