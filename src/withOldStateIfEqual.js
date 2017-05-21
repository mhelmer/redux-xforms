/**
 * Creates a reducer transformer that will compare the old and new state with
 * a custom function, and re-use the old state if it returns true.
 *
 * @example
 * const caseInsensitiveReducer = withOldStateIfEqual(
 *   (state, nextState) => state.toLowerCase() === nextState.toLowerCase()
 * )(reducer)
 *
 * // returns 'someState' if reducer returns 'SomeState'
 * initializedReducer('someState', { payload: 'SomeState' })
 *
 * @param {function(state: any, nextState: any): bool} compareStates Predicate for equality
 * @returns {function} A reducer transformer
 */
function withOldStateIfEqual(compareStates) {
  return reducer => (state, action) => {
    const isInitializationCall = state === undefined
    const nextState = reducer(state, action)
    const shouldReturnOldState = !isInitializationCall &&
      state !== nextState && compareStates(state, nextState)

    if (shouldReturnOldState) {
      return state
    }
    return nextState
  }
}

export default withOldStateIfEqual
