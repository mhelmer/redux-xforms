import createReducersByKey, { createGetReducerByKey } from './createReducersByKey'

describe('Higher order reducers for filters', () => {
  describe('example', () => {
    const reducer = (state = null, action) => action.type === 'SUCCESS' ? action.payload : state
    const enhanceReducers = createReducersByKey(
      action => action.hasOwnProperty('filterName'),
      action => action.filterName
    )
    const byFilterNameReducer = enhanceReducers({
      FILTER_ONE: reducer,
      FILTER_TWO: reducer,
    })

    const state = byFilterNameReducer({
      FILTER_ONE: { username: 'mrXform' },
      FILTER_TWO: { username: 'otherUser' },
    }, {
      type: 'SUCCESS',
      filterName: 'FILTER_ONE',
      payload: { username: 'nextUserName' },
    })
    expect(state).toEqual({
     FILTER_ONE: { username: 'nextUserName' },
     FILTER_TWO: { username: 'otherUser' },
    })
  })
  describe('simple reducer', () => {
    const reducer = (state = null, action) => action.type === 'FETCH_FILTER_SUCCESS' ? action.payload
      : state
    describe('createReducersByFilterName', () => {

      const mapActionToKey = action => action.filterName
      const filterPredicate = filterReducers => action => action.hasOwnProperty('filterName')
      const getByFilter = createGetReducerByKey(({ filterName }) => filterName)(state => state)

      it('should have initial state', () => {
        const filterReducers = { FILTER_ONE: reducer }
        const createReducersByFilterName = createReducersByKey(
          filterPredicate(filterReducers),
          mapActionToKey
        )
        const filtereReducer = createReducersByFilterName(filterReducers)

        const state = [ {} ].reduce(filtereReducer, undefined)
        expect(getByFilter(state, { filterName: 'FILTER_ONE' })).toBe(null)
      })
      it('should handle a single filter', () => {
        const FILTER_ONE = 'FILTER_ONE'
        const filterReducers = { [FILTER_ONE]: reducer }
        const createReducersByFilterName = createReducersByKey(
          filterPredicate(filterReducers),
          mapActionToKey
        )
        const filterReducer = createReducersByFilterName(filterReducers)

        const state = [ {}, {
          type: 'FETCH_FILTER_SUCCESS',
          filterName: FILTER_ONE,
          payload: 'some-payload',
        } ].reduce(filterReducer, undefined)
        expect(getByFilter(state, { filterName: FILTER_ONE })).toBe('some-payload')
      })

      const fetchSuccess = (filterName, payload) => ({
        type: 'FETCH_FILTER_SUCCESS',
        filterName,
        payload,
      })
      it('should handle two filters and initial state', () => {
        const FILTER_ONE = 'FILTER_ONE'
        const FILTER_TWO = 'FILTER_TWO'
        const filterReducers = {
          [FILTER_ONE]: reducer,
          [FILTER_TWO]: reducer,
        }
        const createReducersByFilterName = createReducersByKey(
          filterPredicate(filterReducers),
          mapActionToKey
        )
        const filterReducer = createReducersByFilterName(filterReducers)

        const state = [ {},
          fetchSuccess(FILTER_ONE, 'some-payload'),
        ].reduce(filterReducer, undefined)

        expect(getByFilter(state, { filterName: FILTER_ONE })).toBe('some-payload')
        expect(getByFilter(state, { filterName: FILTER_TWO })).toBe(null)
      })
    })
    describe('different mapActionToKey', () => {
      it('should handle a different different mapActionToKey', () => {
        const FILTER_ONE = 'FILTER_ONE'
        const filterReducers = { [FILTER_ONE]: reducer }

        const mapActionToKey = action => action.sliceName
        const filterPredicate = filterReducers => action => action.hasOwnProperty('sliceName')

        const getByFilter = createGetReducerByKey(({ sliceName }) => sliceName)(state => state)

        const createReducersByFilterName = createReducersByKey(
          filterPredicate(filterReducers),
          mapActionToKey
        )
        const filterReducer = createReducersByFilterName(filterReducers)

        const state = [ {}, {
          type: 'FETCH_FILTER_SUCCESS',
          sliceName: FILTER_ONE,
          payload: 'some-payload',
        } ].reduce(filterReducer, undefined)
        expect(getByFilter(state, { sliceName: FILTER_ONE })).toBe('some-payload')
      })
    })
  })
})
