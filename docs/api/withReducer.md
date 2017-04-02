# `withReducer(injectedReducer)`

Creates a reducer transformer that applies an injected reducer before applying
the next reducer.

#### Arguments

1. `injectedReducer ` *(Function)*: Reducer to run before the next reducer

#### Returns

*(Function)*: The wrapped reducer

#### Example

```javascript
import { withReducer } from 'redux-xforms'

const toIdSlice = withReducer((state, action) => state[action.id])(reducer)
// returns reducer({ username: 'xForman' }, { id: 2 })
toIdSlice(
  { 2: { username: 'xForman' } },
  { id: 2 }
)
```
