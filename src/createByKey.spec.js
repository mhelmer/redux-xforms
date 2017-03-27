import createByKey, { createGetByKey } from './createByKey'

describe('createByKey', () => {
  const ACTION_TYPE = 'ACTION_TYPE'
  const reducer = (state = null, action) => action.type === ACTION_TYPE ? action.payload
    : state
  describe('simple reducer', () => {
    const mapInputToKey = input => input.filterKey
    const byKeyReducer = createByKey(
      action => action.hasOwnProperty('filterKey'),
      mapInputToKey
    )(reducer)
    const selector = createGetByKey(mapInputToKey)()

    it('should have initial global state', () => {
      const state = byKeyReducer(undefined, {})
      expect(state).toEqual({})
    })
    it('should create a simple byKey reducer', () => {
      const state = [ {}, {
        type: ACTION_TYPE,
        filterKey: 4,
        payload: 'some-payload',
      } ].reduce(byKeyReducer, undefined)
      expect(selector(state, { filterKey: 4 })).toBe('some-payload')
    })
  })
})
