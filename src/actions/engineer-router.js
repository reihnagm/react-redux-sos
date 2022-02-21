import { push } from "connected-react-router"
import { parse, stringify } from "../lib/query-string"
export const clearQueryParams = () => async (dispatch, getState) => {
  const { location } = getState().router
  dispatch(push(`${location.pathname}`))
}
export const changeQueryParam = (name, value) => async (dispatch, getState) => {
  const { location } = getState().router
  const query = parse(location.search)
  if (query[name] && name !== "page" && name !== "sort" && name !== "search" && name !== "sortby" && name !== "show") {
    delete query[name]
  } else {
    query[name] = value
  }
  dispatch(push(`engineers?${stringify(query)}`))
}
