import Immutable from 'immutable'
import createByKey, { createGetByKey } from './createByKey'

describe('createByKey', () => {
  it('should work as in the example', () => {
    const getContainsId = (state, { id }) => state.ids.indexOf(id) !== -1
    const getContainsIdByKind = createGetByKey(({ kind }) => kind)(getContainsId)
    const state = getContainsIdByKind(
      { 'approved': { ids: [1, 2, 3] } },
      { kind: 'approved', id: 2 }
    )
    expect(state).toBe(true)
  })

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
      console.log(state)
      expect(selector(state, { filterKey: 4 })).toBe('some-payload')
    })
  })

  describe('work with Map', () => {
    it('modified example with Map should work', () => {
      /* eslint-disable no-extend-native */
      Map.prototype['@@transducer/init'] = () => new Map()
      Map.prototype['@@transducer/result'] = result => result
      Map.prototype['@@transducer/step'] = (result, [key, val]) => result.set(key, val)
      /* eslint-enable no-extend-native */


      const ACTION_TYPE = 'ACTION_TYPE'
      const reducer = (state = null, action) => action.type === ACTION_TYPE ? action.payload
        : state

      const mapInputToKey = input => input.filterKey
      const byKeyReducer = createByKey(
        action => action.hasOwnProperty('filterKey'),
        mapInputToKey,
        () => new Map(),
        (val, key) => val.get(key)
      )(reducer)
      const state = [ {}, {
        type: ACTION_TYPE,
        filterKey: 4,
        payload: 'some-payload',
      }, {
        type: ACTION_TYPE,
        filterKey: 5,
        payload: 'some-other',
      }].reduce(byKeyReducer, undefined)
      expect(state).toEqual(new Map([ [ 4, 'some-payload' ], [ 5, 'some-other' ] ] ))
    })
  })

  describe('work with Immutable.Map', () => {
    it('modified example with Map should work', () => {
      Immutable.Map.prototype['@@transducer/init'] = () => Immutable.Map().asMutable()
      Immutable.Map.prototype['@@transducer/result'] = result => result.asImmutable()
      Immutable.Map.prototype['@@transducer/step'] = (result, [key, val]) => result.set(key, val)

      const ACTION_TYPE = 'ACTION_TYPE'
      const reducer = (state = null, action) => action.type === ACTION_TYPE ? action.payload
        : state

      const mapInputToKey = input => input.filterKey
      const byKeyReducer = createByKey(
        action => action.hasOwnProperty('filterKey'),
        mapInputToKey,
        () => Immutable.Map(),
        (val, key) => val.get(key)
      )(reducer)
      const state = [ {}, {
        type: ACTION_TYPE,
        filterKey: 4,
        payload: 'some-payload',
      }, {
        type: ACTION_TYPE,
        filterKey: 5,
        payload: 'some-other',
      }].reduce(byKeyReducer, undefined)

      expect(state).toEqual(Immutable.Map([ [ 4, 'some-payload' ], [ 5, 'some-other' ] ]))
    })
  })
})
