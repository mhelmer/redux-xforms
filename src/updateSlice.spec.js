import updateSlice from './updateSlice'

describe('updateSlice', () => {
  describe('simple reducer', () => {
    const ACTION_TYPE = 'ACTION_TYPE'

    it('should skip actions where predicate returns false', () => {
      const mapActionToSlice = action => action.sliceName

      const reducer = (state = {}, action) => {
        if(action.type === ACTION_TYPE) {
          return action.payload
        }
        return state[mapActionToSlice(action)]
      }

      const xform = updateSlice(mapActionToSlice)
      const sliceReducer = xform(reducer)

      const state = [
        { type: ACTION_TYPE, payload: 'shiny thing', sliceName: 'sliced' },
      ].reduce(sliceReducer, {})
      expect(state).toEqual({ sliced: 'shiny thing' })
    })

  })
})
