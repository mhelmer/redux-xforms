/**
 * Creates a reducer transformer that applies an injected reducer before applying
 * the next reducer.
 *
 * @example
 * const toIdSlice = withReducer((state, action) => state[action.id])(reducer)
 * // returns reducer({ username: 'xForman' }, { id: 2 })
 * toIdSlice(
 *   { 2: { username: 'xForman' } },
 *   { id: 2 }
 * )
 *
 * @param {function} injectedReducer Reducer to run before the next reducer
 * @returns {function} The wrapped reducer
 */

function withReducer(injectedReducer) {
  return reducer => (state, action) => {
    return reducer(injectedReducer(state, action), action)
  }
}

export default withReducer
