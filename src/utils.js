export const mapValues = fn => obj => Object.keys(obj).reduce((acc, key) => {
  acc[key] = fn(obj[key])
  return acc
}, {})

export const has = (obj, property) => obj.hasOwnProperty(property)
