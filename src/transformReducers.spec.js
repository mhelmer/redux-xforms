import transformReducers from './transformReducers'

describe('transformReducers', () => {
  describe('example', () => {
    it('should handle a two filters with one enhancer', () => {
      const reducer = (state = null, action) => action.type === 'SUCCESS' ? action.payload : state
      const enhancer = reducer => (state = {}, action) => ({
        ...state,
        enhanced: reducer(state.enhanced, action),
      })
      const reducers =  {
        a: reducer,
        b: reducer,
      }
      const transformedReducers = transformReducers({
        a: enhancer,
      })(reducers)

      const stateA = [ {}, {
        type: 'SUCCESS',
        payload: 'some-payload',
      } ].reduce(transformedReducers.a, undefined)

      const stateB = transformedReducers.b(undefined, {})

      expect(stateA.enhanced).toBe('some-payload')
      expect(stateB).toBe(null)
    })
  })
})
