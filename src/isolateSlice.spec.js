import isolateSlice from './isolateSlice'

describe('isolateSlice', () => {
  describe('simple reducer', () => {
    const ACTION_TYPE = 'ACTION_TYPE'
    const reducer = (state = {}, action) => {
      if (action.type === ACTION_TYPE) {
        return { ...state, nested: action.payload }
      }
      return state
    }

    it('should skip actions where predicate returns false', () => {

      const mapActionToSlice = action => action.sliceName
      const xform = isolateSlice(mapActionToSlice)
      const isolatedReducer = xform(reducer)

      const initialState = {
        sliced: { otherThing: 'something-else' },
        otherSlice: {},
      }
      const state = [
        { type: ACTION_TYPE, payload: 'thing', sliceName: 'sliced' },
      ].reduce(isolatedReducer, initialState)
      expect(state).toEqual({ otherThing: 'something-else', nested: 'thing' })
    })

  })
})
