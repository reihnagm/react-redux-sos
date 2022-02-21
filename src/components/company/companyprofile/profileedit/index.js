import React, { useState, useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import Swal from "sweetalert2"
import { Container, Grid, Button, TextField, Avatar, Badge, makeStyles } from "@material-ui/core"
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import "date-fns"
import MaskedInput from "react-text-mask"
import NumberFormat from "react-number-format"
import DateFnsUtils from "@date-io/date-fns"
import * as moment from "moment"
import { connect } from "react-redux"
import { getCurrentProfileCompany, updateProfileCompany } from "../../../../actions/company"
import Spinner from "../../../spinner"
const ProfileEdit = ({ getCurrentProfileCompany, updateProfileCompany, company: { company, loading }, auth: { user }, history }) => {
  const Toast = Swal.mixin({
    position: "top-end",
    toast: true,
    timer: 3000,
    showConfirmButton: false,
    timerProgressBar: false,
    onOpen: toast => {
      toast.addEventListener("mouseenter", Swal.stopTimer)
      toast.addEventListener("mouseleave", Swal.resumeTimer)
    }
  })
  let idProps = company.data && company.data.id
  let logoProps = company.data && company.data.logo
  let nameProps = company.data && company.data.name
  let emailProps = company.data && company.data.email
  let locationProps = company.data && company.data.location
  let descriptionProps = company.data && company.data.description
  let telephoneProps = company.data && company.data.telephone
  let user_id = user.data && user.data.id
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    description: "",
    telephone: "",
    location: ""
  })
  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(1)
      }
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3)
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10)
    }
  }))
  const classes = useStyles()
  const [logoNotEdited, setLogoNotEdited] = useState("")
  const [logoDefault, setDefaultLogo] = useState("")
  const [logoFile, setLogoFile] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      await getCurrentProfileCompany()
    }
    fetchData()
    setFormData({
      id: idProps,
      name: nameProps,
      email: emailProps,
      description: descriptionProps,
      telephone: telephoneProps,
      location: locationProps
    })
    setDefaultLogo(`http://localhost:5000/images/company/${logoProps}`)
    setLogoNotEdited(`${logoProps}`)
  }, [getCurrentProfileCompany, idProps, logoProps, nameProps, emailProps, descriptionProps, telephoneProps, locationProps])
  const { id, name, email, description, telephone, location } = formData
  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  let getFile
  const handleFile = event => {
    getFile.click()
  }
  const handleLogo = event => {
    if (event.target.files && event.target.files[0]) {
      let error = false
      let size = event.target.files[0].size
      let extension = event.target.files[0].name.split(".")[1]
      let reader = new FileReader()
      try {
        if (size > 1024000) {
          error = true
          throw new Error("File size cannot larger than 1MB.")
        }
        if (!isImage(extension)) {
          error = true
          throw new Error("File type allowed: PNG, JPG, JPEG, GIF, SVG, BMP.")
        }
        if (error === false) {
          setLogoFile(event.target.files[0])
          reader.onload = e => {
            setDefaultLogo(e.target.result)
          }
          reader.readAsDataURL(event.target.files[0])
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error.message
        })
      }
    }
  }
  const isImage = extension => {
    switch (extension) {
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "svg":
      case "bmp":
        return true
      default:
    }
    return false
  }
  const onSubmit = event => {
    event.preventDefault()
    let logo
    if (logoFile === "") {
      logo = logoNotEdited
    } else {
      logo = logoFile
    }
    try {
      if (name.length < 3) {
        throw new Error("Name Minimum 3 Character.")
      }
      if (description.length < 200) {
        throw new Error("Description Minimum 200 Character.")
      }
      let data = new FormData()
      data.set("user_id", user_id)
      data.set("logo", logo)
      data.set("name", name ? name : "")
      data.set("email", email ? email : "")
      data.set("description", description ? description : "")
      data.set("telephone", telephone ? telephone : "")
      data.set("location", location ? location : "")
      const company_id = id
      updateProfileCompany(company_id, data)
      setTimeout(() => {
        history.push("/companies")
        Toast.fire({
          icon: "success",
          title: "Yay ! Profile Updated."
        })
      }, 1000)
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message
      })
    }
  }
  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className="backdrop-bottom"></div>
      <Container fixed>
        <Grid container className="my-5" direction="row" justify="center" alignItems="center">
          <Grid className="p-5 white rounded" item md={8} xs={12}>
            <form onSubmit={event => onSubmit(event)}>
              <div className={classes.root}>
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  badgeContent={
                    <Grid
                      item
                      className="p-1 rounded"
                      style={{
                        backgroundColor: "#ea80fc"
                      }}
                    >
                      <CreateOutlinedIcon
                        onClick={handleFile}
                        className="text-white"
                        style={{
                          cursor: "pointer"
                        }}
                      />
                      <input ref={input => (getFile = input)} onChange={handleLogo} style={{ display: "none" }} type="file" />
                    </Grid>
                  }
                >
                  <Avatar className={classes.large} alt={name} src={`${logoDefault}`} />
                </Badge>
              </div>
              <TextField onChange={onChange} value={name} name="name" margin="normal" variant="outlined" label="Name" fullWidth />
              <TextField onChange={onChange} value={email} name="email" margin="normal" variant="outlined" label="E-mail Address" fullWidth disabled />
              <TextField onChange={onChange} value={description} rows="4" name="description" margin="normal" variant="outlined" label="Description" fullWidth multiline />
              <TextField onChange={e => onChange(e)} value={location} name="location" margin="normal" variant="outlined" label="Location" fullWidth />
              <MaskedInput
                mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
                placeholderChar={"_"}
                onChange={e => onChange(e)}
                render={(ref, props) => {
                  return <TextField value={telephone} name="telephone" margin="normal" variant="outlined" fullWidth inputRef={ref} {...props} />
                }}
                showMask
              />
              <Grid container direction="row" justify="center" alignItems="center">
                <Button type="button" variant="contained" color="primary" component={Link} to="/companies">
                  Back
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Update Profile
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
const mapStateToProps = state => ({
  company: state.company,
  auth: state.auth
})
export default connect(mapStateToProps, { getCurrentProfileCompany, updateProfileCompany })(withRouter(ProfileEdit))
