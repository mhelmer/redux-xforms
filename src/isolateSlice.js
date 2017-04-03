import withReducer from './withReducer'

const getByObjKey = (obj, key) => obj[key]

/**
 * Creates a reducer transformer that calls the reducer with only a slice of
 * the state, based on the action.
 *
 * Make sure to put a filtering xform in front of this, so actions that can't
 * be mapped wil not run. It also expects state to be initialized as an Object.
 *
 * @example
 * const toIdSlice = isolateSlice(action => action.id)(reducer)
 * // returns reducer({ username: 'xForman' }, { id: 2 })
 * toIdSlice(
 *   { 2: { username: 'xForman' } },
 *   { id: 2 }
 * )
 *
 * @param {function(action: Object): string} mapActionToSlice Map action to the key of the updating slice.
 * @param {function} getByKey Optional selector to get an entity in the state
 * @returns {function} A reducer transformer
 */
function isolateSlice(mapActionToSlice, getByKey = getByObjKey) {
  return withReducer((state, action) => getByKey(state, mapActionToSlice(action)))
}

export default isolateSlice
