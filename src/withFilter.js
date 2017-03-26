
/**
 * Creates a reducer transformer that will filter based on the action
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
