
/**
 * Creates a reducer transformer that will inject initial state before calling
 * the reducing function
 *
 * @param {any} initialState The initial state
 * @returns {function} A reducer transformer
 */
function withInitialState(initialState) {
  return reducer => (state = initialState, action) => reducer(state, action)
}

export default withInitialState
