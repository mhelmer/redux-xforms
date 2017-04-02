# `transformReducers([transformers])`

Transforms an object with reducers into an object with the original
reducers merged with transformed reducers for matching keys

#### Arguments

1. `transformers` *(Object)*: Object with reducer transformers

#### Returns

*(Function)*: The reducer transformer. Takes an object with reducers and applies the transformers.

#### Example

```javascript
import { transformReducers } from 'redux-xforms'

const reducer = (state = null, action) => {
  return action.type === 'SUCCESS' ? action.payload
    : state
}
const enhance = reducer => (state = {}, action) => ({
  ...state,
  enhanced: reducer(state.enhanced, action),
})
const reducers = {
  a: reducer,
  b: reducer,
}
const transformedReducers = transformReducers({
  a: enhance,
})(reducers)

// returns { enhanced: 'some-payload' }
[{}, {
  type: 'SUCCESS',
  payload: 'some-payload',
}].reduce(transformedReducers.a, undefined)

// returns null
transformedReducers.b(undefined, {})
```
