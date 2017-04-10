import  { withFilter } from './'

describe('withFilter', () => {

  it('should work as in the example', () => {
    const reducer = jest.fn();
    reducer.mockReturnValueOnce('some-next-state')
    const onlyEvenIds = withFilter(action => action.id % 2 === 0)(reducer)

   // returns reducer('some-state', { id: 2 })
    expect(onlyEvenIds('some-state', { id: 2 })).toBe('some-next-state')
    expect(onlyEvenIds('some-initial-state', { id: 3 })).toBe('some-initial-state')

    expect(reducer.mock.calls.length).toBe(1)
    expect(reducer.mock.calls[0].length).toBe(2)
    expect(reducer.mock.calls[0][0]).toEqual('some-state', { id: 2 })
  })

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
