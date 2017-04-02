import { compose } from 'redux'

import { transduceObj, mapping, filtering } from './utils'

describe('transduceObj', () => {
  it('should transduce', () => {
    const obj = {
      a: 2,
      b: 3,
      c: 4,
    }
    const xf = compose(
      mapping(val => obj[val]),
      filtering(val => val % 2 === 0),
      mapping(val => val * 2)
    )
    const reduced = transduceObj(xf)(obj)
    expect(reduced).toEqual({ a: 4, c: 8})
  })
})
