// @flow
export function isPrimitive(val: any) {
  // eslint-disable-next-line
  return val == null || /^[sbn]/.test(typeof val)
}

export function looksLike(a: any, b: any) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey]
      const aVal = a[bKey]
      if (typeof bVal === 'function') {
        return bVal(aVal)
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal)
    })
  )
}

// {name: 'anje'} => ['--name', 'anje']
export function obj2Cli(obj: Object) {
  return Object.keys(obj).reduce(
    (prev, key) => [...prev, `--${key}`, obj[key]],
    [null, null]
  )
}
