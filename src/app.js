import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ThemeProvider, CssBaseline } from "@material-ui/core"
import { theme } from "./configs/theme"
import Sos from "./components/sos/sos"
import Routes from "./components/route"

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={Sos} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}
export default App
