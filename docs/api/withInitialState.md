# `withInitialState(initialState)`

Creates a reducer transformer that will inject initial state before calling
the reducing function

#### Arguments

1. `initialState` *(Any)*: The initial state

#### Returns

*(Function)*: A reducer transformer

#### Example

```javascript
import { withInitialState } from 'redux-xforms'

const initializedReducer = withInitialState('some-state')(reducer)
                                                                   
// returns reducer('some-state', { id: 2 })
initializedReducer(undefined, { id: 2 })
```
