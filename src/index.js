import React from "react"
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { render } from "react-dom"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { withRouter } from "react-router-dom"
import App from "./app"
import store, { history } from "./store.js"
const AppWithRouter = withRouter(App)
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppWithRouter />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
)
