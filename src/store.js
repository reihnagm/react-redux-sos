import { createStore, applyMiddleware } from "redux"
import { routerMiddleware } from "connected-react-router"
import { composeWithDevTools } from "redux-devtools-extension"
import { createBrowserHistory } from "history"
import thunk from "redux-thunk"
import reducers from "./reducers"
export const history = createBrowserHistory()
const initialState = {}
const middleware = [thunk, routerMiddleware(history)]
const store = createStore(reducers(history), initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store
