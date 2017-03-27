import { compose } from 'redux'

import isolateSlice from './isolateSlice'
import updateSlice from './updateSlice'
import withFilter from './withFilter'
import withInitialState from './withInitialState'

/**
 * Creates a reducer transformer that adds byKey-filtering.
 *
 * @param {function(action: Object): bool} predicate The predicate to use
 * @param {function(action: Object): string} mapActionToKey Map action to the key of the selected slice.
 * @returns {function} A reducer transformer
 */
function createByKey(predicate, mapActionToKey) {
  return compose(
    withInitialState({}),
    withFilter(predicate),
    updateSlice(mapActionToKey),
    isolateSlice(mapActionToKey)
  )
}

export default createByKey

const defaultSelector = state => state

/**
 * Creates a selector transformer with byKey-filtering.
 *
 * @param {function(action: Object): string} mapFilterToKey Map filter to the key of the selected slice.
 * @returns {function} A selctor transformer
 */
export function createGetByKey(mapFilterToKey) {
  return (selector = defaultSelector) => isolateSlice(mapFilterToKey)(selector)
}
