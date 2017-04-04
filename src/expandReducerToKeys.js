import { map, into } from 'transducers.js'

/**
 * Expands a single reducer into an object with many reducers, suitable for
 * composition with `combineReducers`, `transformReducers` etc.
 *
 * @example
 * const reducer = (state = null, action) => action.type === 'SUCCESS' ? action.payload : state
 * const reducerKeys = [ 'a', 'b' ]
 * const reducers = expandReducerToKeys(reducerKeys)(reducer)
 *
 * // returns 'some-payload'
 * [ {}, {
 *   type: 'SUCCESS',
 *   payload: 'some-payload',
 * } ].reduce(reducers.a, undefined)
 *
 * // returns null
 * reducers.b(undefined, {})
 *
 * @param {string[]} reducerKeys The keys to populate with the reducer
 * @returns {function} The reducer transformer
 */
function expandReducerToKeys(reducerKeys) {
  return reducer => {
    const xform = map(key => [ key, reducer ])
    return into({}, xform, reducerKeys)
  }
}

export default expandReducerToKeys
