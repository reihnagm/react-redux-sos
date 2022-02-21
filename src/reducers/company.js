import { LOADING, LOADED, GET_COMPANIES, GET_COMPANIES_ERROR, GET_CURRENT_PROFILE_COMPANY, GET_CURRENT_PROFILE_COMPANY_ERROR, GET_PROFILE_COMPANY_BY_SLUG, GET_PROFILE_COMPANY_BY_SLUG_ERROR, UPDATE_PROFILE_COMPANY, UPDATE_PROFILE_COMPANY_ERROR, DELETE_COMPANY, DELETE_COMPANY_ERROR } from "../actions/types"
const initialState = {
  companies: [],
  company: {},
  error: {},
  loading: true,
  search: "",
  sort: "DESC",
  sortBy: "updated_at",
  limit: "10",
  page: "1"
}
export default function (state = initialState, action) {
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
    case GET_COMPANIES:
      return {
        ...state,
        companies: payload
      }
    case GET_COMPANIES_ERROR:
      return {
        ...state,
        error: payload
      }
    case GET_CURRENT_PROFILE_COMPANY:
      return {
        ...state,
        company: payload
      }
    case GET_CURRENT_PROFILE_COMPANY_ERROR:
      return {
        ...state,
        error: payload
      }
    case GET_PROFILE_COMPANY_BY_SLUG:
      return {
        ...state,
        company: payload
      }
    case GET_PROFILE_COMPANY_BY_SLUG_ERROR:
      return {
        ...state,
        error: payload
      }
    case UPDATE_PROFILE_COMPANY:
      return {
        ...state,
        companies: state.companies.concat(payload)
      }
    case UPDATE_PROFILE_COMPANY_ERROR:
      return {
        ...state,
        error: payload
      }
    case DELETE_COMPANY:
      return {
        ...state,
        companies: state.companies.filter(company => company.id !== payload)
      }
    case DELETE_COMPANY_ERROR:
      return {
        ...state,
        error: payload
      }
    default:
      return state
  }
}
