export const mapping = fn => rf => (acc, val, ...args) => rf(acc, fn(val), ...args)
export const filtering = pred => rf => (acc, val, ...args) => pred(val) ? rf(acc, val, ...args) : acc

const objRf = (acc = {}, val, idx, arr) => {
  acc[arr[idx]] = val
  return acc
}

export const mapToValues = obj => rf => (acc, val, ...args) => rf(acc, obj[val], ...args)

export const transduceObj = xf => obj => {
  return Object.keys(obj).reduce(xf(objRf), undefined)
}

export const mapValues = fn => obj => Object.keys(obj).reduce((acc, key) => {
  acc[key] = fn(obj[key])
  return acc
}, {})

export const has = (obj, property) => obj.hasOwnProperty(property)
