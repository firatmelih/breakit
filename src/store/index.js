import { applyMiddleware, combineReducers, createStore } from 'redux'
import appReducer from './reducers/appReducer'
import addictionReducer from './reducers/addictionReducer'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const reducers = combineReducers({
  appState: appReducer,
  addictionState: addictionReducer
})

export const store = createStore(
  reducers,
  {},
  composedEnhancer,
)
