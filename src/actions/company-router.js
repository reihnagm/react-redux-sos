import { push } from 'connected-react-router';
import { parse, stringify } from '../lib/query-string';
export const clearQueryParams = () => async (dispatch, getState) => {
  const { location } = getState().router
  dispatch(push(`${location.pathname}`))
}
export const changeQueryParam = (name, value) => async (dispatch, getState) => {
  const { location } = getState().router;
  const query = parse(location.search);
  if (query[name] &&
    name !== 'page' &&
    name !== 'sort' &&
    name !== 'search' &&
    name !== 'sortBy' &&
    name !== 'limit'
  ) {
    delete query[name]
  } else {
    query[name] = value
  }
  dispatch(push(`companies?${stringify(query)}`))
}
