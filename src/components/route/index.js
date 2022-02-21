import React from "react"
import { Route, Switch } from "react-router-dom"
import Register from "../auth/register"
import Login from "../auth/login"
import NotFound from "../layouts/notfound"
import Engineer from "../engineer"
import EngineerProfile from "../engineer/engineerprofile"
import EngineerProfileShow from "../engineer/engineerprofile/profileshow"
import EngineerProfileEdit from "../engineer/engineerprofile/profileedit/index"
import Company from "../company"
import CompanyProfile from "../company/companyprofile"
import CompanyProfileShow from "../company/companyprofile/profileshow"
import CompanyProfileEdit from "../company/companyprofile/profileedit"
import Private from "./private/index"
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/companies" component={Company} />
      <Private exact path="/companies/profile" component={CompanyProfile} />
      <Route exact path="/companies/profile/:slug" component={CompanyProfileShow} />
      <Private exact path="/companies/profile/me/edit" component={CompanyProfileEdit} />
      <Route exact path="/engineers" component={Engineer} />
      <Private exact path="/engineers/profile" component={EngineerProfile} />
      <Route exact path="/engineers/profile/:slug" component={EngineerProfileShow} />
      <Private exact path="/engineers/profile/me/edit" component={EngineerProfileEdit} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default Routes
