import withFilter from './withFilter'

describe('withFilter', () => {
  describe('simple reducer', () => {
    const ACTION_TYPE = 'ACTION_TYPE'
    const reducer = (state = null, action) => action.type === ACTION_TYPE ? action.payload
      : state

    describe('match payload', () => {
      const xform = withFilter(action => action.payload === 'shiny thing')
      const onlyShinyReducer = xform(reducer)

      it('should return initial state', () => {
        const state = onlyShinyReducer(undefined, {})
        expect(state).toBe(null)
      })
      it('should skip actions where predicate returns false', () => {
        const state = [
          {},
          { type: ACTION_TYPE, payload: 'shiny thing' },
          { type: ACTION_TYPE, payload: 'useless thing' },
        ].reduce(onlyShinyReducer, undefined)
        expect(state).toBe('shiny thing')
      })

    })
  })
})
