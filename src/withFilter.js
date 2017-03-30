
/**
 * Creates a reducer transformer that will filter based on the action
 *
 * @example
 * const onlyEvenIds = withFilter(action => action.id % 2 === 0)(reducer)
 *
 * // returns reducer('some-state', { id: 2 })
 * reduceSlice('some-state', { id: 2 })
 *
 * // returns 'some-state'
 * reduceSlice('some-state', { id: 3 })
 *
 * @param {function(action: Object): bool} predicate The predicate to use
 * @returns {function} A reducer transformer
 */
function withFilter(predicate) {
  return reducer => (state, action) => {
    const isInitializationCall = state === undefined
    const shouldRunReducer = predicate(action) || isInitializationCall
    return shouldRunReducer ? reducer(state, action) : state
  }
}

export default withFilter
