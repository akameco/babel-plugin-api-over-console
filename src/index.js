// @flow
import type { NodePath } from 'babel-traverse'
import template from 'babel-template'
import { looksLike } from './util'

const consoleObj = {
  node: {
    callee: {
      type: 'MemberExpression',
      object: { name: 'console' },
    },
  },
}

const processArgv = {
  node: {
    object: { name: 'process' },
    property: { name: 'argv' },
  },
}

const resJsonBuilder = template(`
  res.json(OUTPUT)
`)

const obj2ArgvBuilder = template(`
  function __API_OVER_CONSOLE__obj2Argv(obj) {
    return Object.keys(obj).reduce(
      (prev, key) => [...prev, '--' + key, obj[key]],
      [null, null]
    )
  }
`)

const queryBuilder = template(`
  __API_OVER_CONSOLE__obj2Argv(req.query)
`)

const expressBuilder = template(`
  const express = require('express')
  const cors = require('cors')

  const app = express()
  const port = process.env.PORT || 3000
  app.use(cors())

  app.get('/', (req, res) => {
    BODY
  })

  app.listen(port, () => {
    console.log('listening on %s', port)
  })
`)

export default function() {
  return {
    name: 'api-over-console',
    visitor: {
      Program: {
        exit(path: NodePath) {
          let hasConsole = false
          let hasProcessArgv = false

          const visitorForConsoleLog = {
            CallExpression(path: NodePath) {
              if (hasConsole || !looksLike(path, consoleObj)) {
                return
              }

              const args = path.node.arguments
              if (args.length <= 0) {
                return
              }
              path.parentPath.replaceWithMultiple(
                resJsonBuilder({ OUTPUT: args[0] })
              )

              hasConsole = true
            },
            MemberExpression(path: NodePath) {
              if (!looksLike(path, processArgv)) {
                return
              }

              path.replaceWith(queryBuilder())

              hasProcessArgv = true
            },
          }

          path.traverse(visitorForConsoleLog)

          if (!hasConsole) {
            return
          }

          path.node.body = expressBuilder({ BODY: path.node.body })

          if (hasProcessArgv) {
            path.node.body.push(obj2ArgvBuilder())
          }
        },
      },
    },
  }
}
