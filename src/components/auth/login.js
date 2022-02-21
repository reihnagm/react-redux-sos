import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { Button, InputLabel, FormControl, TextField, MenuItem, Select, Typography } from "@material-ui/core"
import { connect } from "react-redux"
import { login } from "../../actions/auth"
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const { email, password } = formData
  const onChange = event => setFormData({ ...formData, [event.target.name]: event.target.value })
  const onSubmit = event => {
    event.preventDefault()
    login(email, password)
  }
  if (isAuthenticated) {
    return <Redirect to="/" />
  }
  return (
    <>
      <div className="columns justify-center min-h-screen">
        <div className="column marginless" id="cover-background-login">
          <div id="cover-login"></div>
          <h2 className="title mx-2 text-white">Hire expert freelancers for any job, online</h2>
          <h3 className="sub-title mx-2 text-white">Millions of small businesses use Frelancer to turn their ideas into reality.</h3>
        </div>
        <div className="column">
          <Typography variant="h5" component="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={event => onSubmit(event)}>
            <TextField onChange={event => onChange(event)} value={email ?? ""} name="email" margin="normal" variant="outlined" label="Email" fullWidth />
            <TextField onChange={event => onChange(event)} value={password ?? ""} name="password" margin="normal" variant="outlined" label="Password" fullWidth />
            <div className="margin-normal">
              <Button style={{ margin: 0 }} type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </div>
            <div className="margin-normal">
              <Button style={{ margin: 0 }} type="button" variant="contained" color="primary" component={Link} to="/" fullWidth>
                Back
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { login })(Login)
