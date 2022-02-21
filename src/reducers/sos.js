import { LOADING, LOADED, GET_SOS, GET_SOS_ERROR } from "../actions/types"

const initialState = {
  sos: [],
  loading: true,
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
      case GET_SOS:
        return {
          ...state,
          sos: payload
        }
      case GET_SOS_ERROR:
        return {
          ...state,
          error: payload
        }
      default:
        return state
    }
  }

