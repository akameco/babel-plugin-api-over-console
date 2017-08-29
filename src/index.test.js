// @flow
import pluginTester from 'babel-plugin-tester'
import plugin from '.'

pluginTester({
  plugin,
  snapshot: true,
  tests: [
    `console.log('hello')`,
    `function hello () {}`,
    `
    var a = 1
    console.log(a)
  `,
    `
    const obj = {a: 1, b: 2, c: 3}
    console.log(obj)
  `,
    `
    console.log('hello')
    console.log('world')
  `,
    `
    const args = process.argv.slice(2)
    console.log({name: args[1]})
  `,
    `console.log()`,
  ],
})
