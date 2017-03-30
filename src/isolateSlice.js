import withReducer from './withReducer'
/**
 * Creates a reducer transformer that calls the reducer with only a slice of
 * the state, based on the action.
 *
 * Make sure to put a filtering xform in front of this, so actions that can't
 * be mapped wil not run. It also expects state to be initialized as an Object.
 *
 * @param {function(action: Object): string} mapActionToSlice Map action to the key of the updating slice.
 * @returns {function} A reducer transformer
 */

function isolateSlice(mapActionToSlice) {
  return withReducer((state, action) => state[mapActionToSlice(action)])
}

export default isolateSlice
