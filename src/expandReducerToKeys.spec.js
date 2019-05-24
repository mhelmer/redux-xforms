import { combineReducers, compose } from 'redux'

import { expandReducerToKeys } from './'

describe('expandReducerToKeys', () => {
  describe('example', () => {
    it('should expand a reducer to two keys', () => {
      const reducer = (state = null, action) =>
        action.type === 'SUCCESS' ? action.payload : state
      const reducerKeys = ['a', 'b']
      const reducers = expandReducerToKeys(reducerKeys)(reducer)

      const stateA = [
        {},
        {
          type: 'SUCCESS',
          payload: 'some-payload',
        },
      ].reduce(reducers.a, undefined)
      expect(stateA).toBe('some-payload')

      const stateB = reducers.b(undefined, {})
      expect(stateB).toBe(null)
    })
  })
  describe('simple reducer', () => {
    it('should work with combineReducers', () => {
      const reducer = (state = null, action) =>
        action.type === 'SUCCESS' ? action.payload : state
      const reducerKeys = ['a', 'b']
      const reducers = compose(
        combineReducers,
        expandReducerToKeys(reducerKeys)
      )(reducer)

      const state = [
        {},
        {
          type: 'SUCCESS',
          payload: 'some-payload',
        },
      ].reduce(reducers, undefined)
      expect(state).toEqual({
        a: 'some-payload',
        b: 'some-payload',
      })
    })
  })
})
