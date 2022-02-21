import { LOADING, LOADED, GET_ENGINEERS, GET_ENGINEERS_ERROR, GET_SKILLS, GET_SKILLS_ERROR, GET_CURRENT_PROFILE_ENGINEER, GET_CURRENT_PROFILE_ENGINEER_ERROR, GET_PROFILE_ENGINEER_BY_SLUG, GET_PROFILE_ENGINEER_BY_SLUG_ERROR, UPDATE_PROFILE_ENGINEER, UPDATE_PROFILE_ENGINEER_ERROR, DELETE_ENGINEER, DELETE_ENGINEER_ERROR } from "../actions/types"
const initialState = {
  engineers: [],
  engineer: {},
  skills: [],
  error: {},
  loading: true,
  search: "",
  sort: "DESC",
  sortBy: "updated_at",
  show: "10",
  page: "1"
}
export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case LOADED:
      return {
        ...state,
        loading: false
      }
    case GET_SKILLS:
      return {
        ...state,
        skills: payload
      }
    case GET_SKILLS_ERROR:
      return {
        ...state,
        error: payload
      }
    case GET_ENGINEERS:
      return {
        ...state,
        engineers: payload
      }
    case GET_ENGINEERS_ERROR:
      return {
        ...state,
        error: payload
      }
    case GET_CURRENT_PROFILE_ENGINEER:
      return {
        ...state,
        engineer: payload
      }
    case GET_CURRENT_PROFILE_ENGINEER_ERROR:
      return {
        ...state,
        error: payload
      }
    case GET_PROFILE_ENGINEER_BY_SLUG:
      return {
        ...state,
        engineer: payload
      }
    case GET_PROFILE_ENGINEER_BY_SLUG_ERROR:
      return {
        ...state,
        error: payload
      }
    case UPDATE_PROFILE_ENGINEER:
      return {
        ...state,
        engineers: [...payload, state.engineers]
      }
    case UPDATE_PROFILE_ENGINEER_ERROR:
      return {
        ...state,
        error: payload
      }
    case DELETE_ENGINEER:
      return {
        ...state,
        engineers: state.engineers.filter(engineer => engineer.id !== payload)
      }
    case DELETE_ENGINEER_ERROR:
      return {
        ...state,
        error: payload
      }
    default:
      return state
  }
}
