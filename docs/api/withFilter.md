# `withFilter(predicate)`

Creates a reducer transformer that will filter based on the action

#### Arguments

1. `predicate` *(Function)*: A predicate that gets called with the action

#### Returns

*(Function)*: A reducer transformer

#### Example

```javascript
import { withFilter } from 'redux-xforms'

const onlyEvenIds = withFilter(action => action.id % 2 === 0)(reducer)

// returns reducer('some-state', { id: 2 })
onlyEvenIds('some-state', { id: 2 })

// returns 'some-state'
onlyEvenIds('some-state', { id: 3 })
```
