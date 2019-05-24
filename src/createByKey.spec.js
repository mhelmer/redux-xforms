import { createByKey, createGetByKey } from './'

describe('createByKey', () => {
  it('should work as in the example', () => {
    const getContainsId = (state, { id }) => state.ids.indexOf(id) !== -1
    const getContainsIdByKind = createGetByKey(({ kind }) => kind)(
      getContainsId
    )
    const state = getContainsIdByKind(
      { approved: { ids: [1, 2, 3] } },
      { kind: 'approved', id: 2 }
    )
    expect(state).toBe(true)
  })

  const ACTION_TYPE = 'ACTION_TYPE'
  const reducer = (state = null, action) =>
    action.type === ACTION_TYPE ? action.payload : state
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
      const state = [
        {},
        {
          type: ACTION_TYPE,
          filterKey: 4,
          payload: 'some-payload',
        },
      ].reduce(byKeyReducer, undefined)
      expect(selector(state, { filterKey: 4 })).toBe('some-payload')
    })
  })
})
