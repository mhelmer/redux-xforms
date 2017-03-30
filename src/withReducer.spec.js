import withReducer from './withReducer'

describe('withReducer', () => {
  describe('simple reducer', () => {
    const ACTION_TYPE = 'ACTION_TYPE'
    const reducer = (state = {}, action) => {
      if (action.type === ACTION_TYPE) {
        return { ...state, nested: action.payload }
      }
      return state
    }

    it('should return the slice with nested payload', () => {

      const mapActionToSlice = (state, action) => state[action.sliceName]
      const xform = withReducer(mapActionToSlice)
      const slicedReducer = xform(reducer)

      const initialState = {
        sliced: { otherThing: 'something-else' },
        otherSlice: {},
      }
      const state = [
        { type: ACTION_TYPE, payload: 'thing', sliceName: 'sliced' },
      ].reduce(slicedReducer, initialState)
      expect(state).toEqual({ otherThing: 'something-else', nested: 'thing' })
    })

  })
})
