import axios from "axios"
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./types"
import Swal from "sweetalert2"
import setAuthToken from "../utils/token"
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
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const response = await axios.get(`${process.env.REACT_APP_LOCAL_AUTH}`)
    dispatch({
      type: USER_LOADED,
      payload: response.data.data
    })
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}
export const login = (email, password) => async dispatch => {
  let regexp = /[a-zA-z-0-9_]+@[a-zA-Z]+\.(com|net|org)$/
  let checkEmail = regexp.test(email)
  try {
    if (email.trim() === "") {
      throw new Error("Email Required")
    }
    if (password.trim() === "") {
      throw new Error("Password Required")
    }
    if (!checkEmail) {
      throw new Error("Invalid Email. e.g (johndoe@gmail.com)")
    }
    if (password.length < 6) {
      throw new Error("Password Minimum 6 Character")
    }
    const response = await axios.post(`${process.env.REACT_APP_LOCAL_LOGIN}`, {
      email,
      password
    })
    Toast.fire({
      icon: "success",
      title: "Successful Login"
    })
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    })
    dispatch(loadUser())
  } catch (error) {
    if (error.response && error.response.data.message.name === "UserNotExists") {
      Toast.fire({
        icon: "error",
        title: "User not exists"
      })
    } else if (error.response && error.response.data.message.name === "InvalidCredentials") {
      Toast.fire({
        icon: "error",
        title: "Invalid Credentials"
      })
    } else {
      Toast.fire({
        icon: "error",
        title: error.message
      })
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}
export const register = (fullname, nickname, email, password, role, history) => async dispatch => {
  let regexp = /[a-zA-z-0-9_]+@[a-zA-Z]+\.(com|net|org)$/
  let checkEmail = regexp.test(email)
  try {
    if (fullname.trim() === "") {
      throw new Error("Fullname Required")
    }
    if (nickname.trim() === "") {
      throw new Error("Nickname Required")
    }
    if (email.trim() === "") {
      throw new Error("Email Required")
    }
    if (!checkEmail) {
      throw new Error("Invalid Email. e.g : johndoe@gmail.com")
    }
    if (password.trim() === "") {
      throw new Error("Password Required")
    }
    if (password.length < 6) {
      throw new Error("Password Minimum 6 Character")
    }
    if (typeof role === "undefined") {
      throw new Error("Role Required")
    }
    const response = await axios.post(`${process.env.REACT_APP_LOCAL_REGISTER}`, {
      fullname,
      nickname,
      email,
      password,
      role_id: role
    })
    if (role === 1) {
      history.push("/engineers")
    }
    if (role === 2) {
      history.push("/companies")
    }
    Toast.fire({
      icon: "success",
      title: "Successful Register"
    })
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    })
    dispatch(loadUser())
  } catch (error) {
    console.log(error.response)
    if (error.response && error.response.data.message.name === "UserAlreadyExists") {
      Toast.fire({
        icon: "error",
        title: "User already exists"
      })
    } else {
      Toast.fire({
        icon: "error",
        title: error.message
      })
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}
export const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT
  })
}
