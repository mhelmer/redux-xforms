/**
 * Creates a reducer transformer that will inject initial state before calling
 * the reducing function
 *
 * @example
 * const initializedReducer = withInitialState('some-state')(reducer)
 *
 * // returns reducer('some-state', { id: 2 })
 * initializedReducer(undefined, { id: 2 })
 *
 * @param {any} initialState The initial state
 * @returns {function} A reducer transformer
 */
function withInitialState(initialState) {
  return reducer => (state = initialState, action) => reducer(state, action)
}

export default withInitialState
