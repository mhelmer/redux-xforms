/**
 * Creates a reducer transformer that updates only one slice of the state based
 * on the action.
 *
 * Make sure to put a filtering xform in front of this, so actions that can't
 * be mapped wil not run. It also expects state to be initialized as an Object.
 *
 * @example
 * const reduceSlice = updateSlice(action => action.id)(reducer)
 * // returns {
 * //   2: reducer({ username: 'xForman' }, action),
 * // }
 * reduceSlice(
 *   { 2: { username: 'xForman' }, 3: { username: 'yUser' } },
 *   { id: 2 }
 * )
 *
 * @param {function(action: Object): string} mapActionToSlice Map action to the key of the updating slice.
 * @returns {function} A reducer transformer
 */
function updateSlice(mapActionToSlice) {
  return reducer => (state, action) => {
    const result = reducer(state, action)
    const key = mapActionToSlice(action)

    if (state[key] === result) {
      return state
    }
    return { ...state, [key]: result }
  }
}

export default updateSlice
