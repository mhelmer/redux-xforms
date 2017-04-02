# `withOldStateIfEqual(compareStates)`

Creates a reducer transformer that will compare the old and new state with
a custom function, and re-use the old state if it returns true.

#### Arguments

1. `compareStates ` *(Function)*: Predicate for equality. Gets called with `state` and `nextState`

#### Returns

*(Function)*: A reducer transformer

#### Example

```javascript
import { withOldStateIfEqual } from 'redux-xforms'

const caseInsensitiveReducer = withOldStateIfEqual(
  (state, nextState) => state.toLowerCase() === nextState.toLowerCase()
)(reducer)
                                                                        
// returns 'someState' if reducer returns 'SomeState'
initializedReducer('someState', { payload: 'SomeState' })
```
