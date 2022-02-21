import axios from "axios"

import { LOADING, LOADED, GET_SOS, GET_SOS_ERROR } from "./types"

export const getSos = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADING
    })
    const response = await axios.get(`http://cxid.xyz:3000/fetch-sos`)
    let data = response.data.data
    let arrays = []
    for (let i = 0; i < data.length; i++) {
      arrays.push({
        "id": i + 1,
        "category": data[i].category,
        "file": data[i].thumbnail,
        "video": data[i].media_url,
        "content": data[i].content,
        "address": data[i].address,
        "fullname": data[i].fullname
      })
    }
    dispatch({
      type: GET_SOS,
      payload: arrays
    })
  } catch (e) {
    dispatch({
      type: GET_SOS_ERROR,
      payload: e
    })
  } finally {
    dispatch({
      type: LOADED
    })
  }
}