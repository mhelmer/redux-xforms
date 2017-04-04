import { map, into } from 'transducers.js'

/**
 * Transforms an object with reducers into an object with the original reducers
 * merged with transformed reducers for matching keys. It can for example be
 * composed with combineReducers or createReducersByKey.
 *
 * @example
 * const reducer = (state = null, action) => {
 *   return action.type === 'SUCCESS' ? action.payload
 *     : state
 * }
 * const enhance = reducer => (state = {}, action) => ({
 *   ...state,
 *   enhanced: reducer(state.enhanced, action),
 * })
 * const reducers = {
 *   a: reducer,
 *   b: reducer,
 * }
 * const transformedReducers = transformReducers({
 *   a: enhance,
 * })(reducers)
 *
 * // returns { enhanced: 'some-payload' }
 * [{}, {
 *   type: 'SUCCESS',
 *   payload: 'some-payload',
 * }].reduce(transformedReducers.a, undefined)
 *
 * // returns null
 * transformedReducers.b(undefined, {})
 *
 * @param {Object} transformers The reducer transformers
 * @returns {function} The reducer transformer
 */
function transformReducers(transformers = {}) {
  return reducers => {
    const xf = map(
      ([ key, reducer ]) => [
        key,
        transformers.hasOwnProperty(key) ? transformers[key](reducer)
          : reducer,
      ]
    )
    return into({}, xf, reducers)
  }
}

export default transformReducers
