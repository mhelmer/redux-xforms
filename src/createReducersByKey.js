import { compose } from 'redux'
import { into, map } from 'transducers.js'

import createByKey, { createGetByKey } from './createByKey'
import withInitialState from './withInitialState'

const initializeReducer = ([ key, reducer ]) => [ key, reducer(undefined, {}) ]
const combineInitialStates = obj => into({}, map(initializeReducer), obj)

const getReducerByKey = (reducers, key) => reducers[key]
const mapActionToReducer = mapActionToKey => reducers => (state, action) => {
  return getReducerByKey(reducers, mapActionToKey(action))(state, action)
}

/**
 * Transforms an object with reducers to a combined reducer with byKey-filtering.
 *
 * @example
 * const enhanceReducers = createReducersByKey(
 *   action => action.hasOwnProperty('filterName'),
 *   action => action.filterName
 * )
 * const byFilterNameReducer = enhanceReducers({
 *   FILTER_ONE: reducer,
 *   FILTER_TWO: reducer,
 * })
 *
 * // returns {
 * //   reducer({ username: 'mrXform' }, action),
 * //   FILTER_TWO: { username: 'otherUser' },
 * // }
 * byFilterNameReducer({
 *   FILTER_ONE: { username: 'mrXform' },
 *   FILTER_TWO: { username: 'otherUser' },
 * }, {
 *   type: 'SUCCESS',
 *   filterName: 'FILTER_ONE',
 *   payload: { username: 'nextUserName' },
 * })
 *
 * @param {function(action: Object): bool} predicate The predicate to use
 * @param {function(action: Object): string} mapActionToKey Map action to the key of the selected slice.
 * @returns {function} A reducer transformer
 */
function createReducersByKey(predicate, mapActionToKey)  {
  return reducers => {
    const initialState = combineInitialStates(reducers)
    const reducerPredicate = action => predicate(action) && reducers.hasOwnProperty(action.filterName)

    return compose(
      withInitialState(initialState),
      createByKey(reducerPredicate, mapActionToKey),
      mapActionToReducer(mapActionToKey)
    )(reducers)
  }
}

export default createReducersByKey

export const createGetReducerByKey = createGetByKey
