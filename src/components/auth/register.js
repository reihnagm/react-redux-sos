import React, { Fragment, useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { Button, InputLabel, FormControl, TextField, MenuItem, Select, Typography } from "@material-ui/core"
import { connect } from "react-redux"
import { register } from "../../actions/auth"
import "react-dropdown/style.css"
import Dropdown from "react-dropdown"

const Register = ({ register, isAuthenticated, history }) => {
  const useStyles = makeStyles(theme =>
    createStyles({
      selectEmpty: {
        marginTop: theme.spacing(2)
      }
    })
  )
  const classes = useStyles()
  const [formData, setFormData] = useState({
    fullname: "",
    nickname: "",
    email: "",
    password: ""
  })
  const [role, setRole] = useState()
  const { fullname, nickname, email, password } = formData
  const onChange = event => setFormData({ ...formData, [event.target.name]: event.target.value })
  const onChangeRole = element => {
    setRole(element.target.value)
    // setRole({ value: element.value, label: element.label }, { role: element.value })
  }
  const onSubmit = event => {
    event.preventDefault()
    register(fullname, nickname, email, password, role, history)
  }
  const optionsRole = [
    { value: 1, label: "Engineer" },
    { value: 2, label: "Company" }
  ]
  if (isAuthenticated) {
    return <Redirect to="/" />
  }
  return (
    <Fragment>
      <div className="columns justify-center min-h-screen">
        <div className="column marginless" id="cover-background-register">
          <div id="cover-register"></div>
          <h2 className="title mx-3 text-white">Hire expert freelancers for any job, online</h2>
          <h3 className="sub-title mx-3 text-white">Millions of small businesses use Frelancer to turn their ideas into reality.</h3>
        </div>
        <div className="column">
          <Typography variant="h5" component="h5" gutterBottom>
            Register
          </Typography>
          <form onSubmit={event => onSubmit(event)}>
            <TextField onChange={onChange} value={fullname ?? ""} name="fullname" margin="normal" variant="outlined" label="Fullname" fullWidth />
            <TextField onChange={onChange} value={nickname ?? ""} name="nickname" margin="normal" variant="outlined" label="Nickname" fullWidth />
            <TextField onChange={onChange} value={email ?? ""} name="email" margin="normal" variant="outlined" label="Email" fullWidth />
            <TextField onChange={onChange} value={password ?? ""} name="password" margin="normal" variant="outlined" label="Password" fullWidth />
            <FormControl margin="normal" variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-role">Select your Role</InputLabel>
              <Select
                inputProps={{
                  name: "role",
                  id: "outlined-role"
                }}
                value={role}
                label="Select your Role"
                onChange={event => onChangeRole(event)}
              >
                <MenuItem value={1}>Engineer</MenuItem>
                <MenuItem value={2}>Company</MenuItem>
              </Select>
            </FormControl>
            {/* <Dropdown options={optionsRole} value={role} placeholder="Select your Role" onChange={event => onChangeRole(event)} /> */}
            <div className="margin-normal">
              <Button style={{ margin: 0 }} type="submit" variant="contained" color="primary" fullWidth>
                Register
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
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { register })(Register)
