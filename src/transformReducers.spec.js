import { combineReducers, compose } from 'redux'

import { transformReducers, createReducersByKey } from './'

describe('transformReducers', () => {
  describe('example', () => {
    it('should handle a two filters with one enhancer', () => {
      const reducer = (state = null, action) =>
        action.type === 'SUCCESS' ? action.payload : state
      const enhancer = reducer => (state = {}, action) => ({
        ...state,
        enhanced: reducer(state.enhanced, action),
      })
      const reducers = {
        a: reducer,
        b: reducer,
      }
      const transformedReducers = transformReducers({
        a: enhancer,
      })(reducers)

      const stateA = [
        {},
        {
          type: 'SUCCESS',
          payload: 'some-payload',
        },
      ].reduce(transformedReducers.a, undefined)

      const stateB = transformedReducers.b(undefined, {})

      expect(stateA.enhanced).toBe('some-payload')
      expect(stateB).toBe(null)
    })
  })
  describe('simple reducer', () => {
    const reducer = (state = null, action) =>
      action.type === 'SUCCESS' ? action.payload : state
    it('should handle a two filters with one enhancer', () => {
      const reducers = { a: reducer }
      const transformedReducers = transformReducers()(reducers)

      const stateA = [
        {},
        {
          type: 'SUCCESS',
          payload: 'some-payload',
        },
      ].reduce(transformedReducers.a, undefined)

      expect(stateA).toEqual('some-payload')
    })
    it('should work with combineReducers', () => {
      const enhancer = reducer => (state = {}, action) => ({
        ...state,
        enhanced: reducer(state.enhanced, action),
      })
      const transformedReducers = compose(
        combineReducers,
        transformReducers({ a: enhancer })
      )({ a: reducer, b: reducer })

      const state = [
        {},
        {
          type: 'SUCCESS',
          payload: 'some-payload',
        },
      ].reduce(transformedReducers, undefined)

      expect(state.a.enhanced).toBe('some-payload')
      expect(state.b).toBe('some-payload')
    })
    it('should work with createReducersByKey', () => {
      const enhanceReducersByKey = createReducersByKey(
        action => action.hasOwnProperty('filterName'),
        action => action.filterName
      )
      const enhancer = reducer => (state = {}, action) => ({
        ...state,
        enhanced: reducer(state.enhanced, action),
      })

      const reducers = {
        FILTER_ONE: reducer,
        FILTER_TWO: reducer,
      }
      const transformedReducer = compose(
        enhanceReducersByKey,
        transformReducers({ FILTER_ONE: enhancer })
      )(reducers)

      const state = transformedReducer(
        {
          FILTER_ONE: { enhanced: { username: 'mrXform' } },
          FILTER_TWO: { username: 'otherUser' },
        },
        {
          type: 'SUCCESS',
          filterName: 'FILTER_ONE',
          payload: { username: 'nextUserName' },
        }
      )

      expect(state).toEqual({
        FILTER_ONE: { enhanced: { username: 'nextUserName' } },
        FILTER_TWO: { username: 'otherUser' },
      })
    })
  })
})
