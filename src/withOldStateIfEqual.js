
/**
 * Creates a reducer transformer that will compare the old and new state with
 * a custom function, and re-use the old state if it returns true.
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
