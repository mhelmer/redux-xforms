import { compose } from 'redux'

import isolateSlice from './isolateSlice'
import updateSlice from './updateSlice'
import withFilter from './withFilter'
import withInitialState from './withInitialState'

const initialize = () => ({})
const getByObjKey = (obj, key) => obj[key]

/**
 * Creates a reducer transformer that adds byKey-filtering.
 *
 * @example
 * const byKeyReducer = createByKey(
 *   action => action.hasOwnProperty('userId'),
 *   action => action.userId
 * )(reducer)
 *
 * // returns {
 * //   2: { username: 'mrXform' },
 * //   3: reducer({ username: 'otherUser' }, action),
 * // }
 * byKeyReducer({
 *   { 2: { username: 'mrXform' } },
 *   { 3: { username: 'otherUser' } },
 * }, { userId: 3 })
 *
 * @param {function(action: Object): bool} predicate The predicate to use
 * @param {function(action: Object): string} mapActionToKey Map action to the key of the selected slice.
 * @param {function} init Optional initializer for the state. Use this for eg ImmutableJS
 * @param {function} getByKey Optional selector to get an entity in the state
 * @returns {function} A reducer transformer
 */
function createByKey(predicate, mapActionToKey, init = initialize, getByKey = getByObjKey) {
  return compose(
    withInitialState(init()),
    withFilter(predicate),
    updateSlice(mapActionToKey, init, getByKey),
    isolateSlice(mapActionToKey, getByKey)
  )
}

export default createByKey

const defaultSelector = state => state

/**
 * Creates a selector transformer with byKey-filtering.
 *
 * @example
 * const getContainsId = (state, { id }) => state.ids.indexOf(id) !== -1
 * const getContainsIdByKind = createGetByKey(({ kind }) => kind)(getContainsId)
 * // returns true
 * getContainsIdByKind(
 *   { 'approved': { ids: [1, 2, 3] } },
 *   { kind: 'approved', id: 2 }
 * )
 *
 * @param {function(action: Object): string} mapFilterToKey Map filter to the key of the selected slice.
 * @param {function} getByKey Optional selector to get an entity in the state
 * @returns {function} A selector transformer
 */
export function createGetByKey(mapFilterToKey, getByKey = getByObjKey) {
  return (selector = defaultSelector) => isolateSlice(mapFilterToKey, getByKey)(selector)
}
