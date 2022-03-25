import { combineReducers, createStore } from 'redux'
import appReducer from './reducers/appReducer'

const reducers = combineReducers({
  appState: appReducer
})

export const store = createStore(
  reducers,
  {}
)
