import axios from 'axios';
import { decodeJWT } from '../configs/helper';
import {
  LOADING,
  LOADED,
  GET_COMPANIES,
  GET_COMPANIES_ERROR,
  GET_CURRENT_PROFILE_COMPANY,
  GET_CURRENT_PROFILE_COMPANY_ERROR,
  GET_PROFILE_COMPANY_BY_SLUG,
  GET_PROFILE_COMPANY_BY_SLUG_ERROR,
  UPDATE_PROFILE_COMPANY,
  UPDATE_PROFILE_COMPANY_ERROR,
  DELETE_COMPANY,
  DELETE_COMPANY_ERROR
} from './types'
export const getCompanies = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING
    });
    const response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_COMPANIES}/${getState().router.location.search}`)
    dispatch({
      type: GET_COMPANIES,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: GET_COMPANIES_ERROR,
      payload: error
    });
  } finally {
    dispatch({
      type: LOADED
    });
  }
}
export const getCurrentProfileCompany = () => async dispatch => {
  const token = localStorage.token;
  let user_id;
  let data;
  if(token) {
    data = decodeJWT(token);
    user_id = data.user.id;
  }
  try {
    dispatch({
      type: LOADING
    });
    const response = await axios.post(`http://localhost:5000/api/v1/companies/profile`,{
      user_id
    });
    dispatch({
      type: GET_CURRENT_PROFILE_COMPANY,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: GET_CURRENT_PROFILE_COMPANY_ERROR,
      payload: error
    });
  } finally {
    dispatch({
      type: LOADED
    });
  }
}
export const getProfileCompanyBySlug = (slug) => async dispatch => {
  try {
    dispatch({
      type: LOADING
    });
    const response = await axios.get(`http://localhost:5000/api/v1/companies/profile/${slug}`)
    dispatch({
      type: GET_PROFILE_COMPANY_BY_SLUG,
      payload: response.data.data
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_COMPANY_BY_SLUG_ERROR,
      payload: error
    });
  } finally {
    dispatch({
      type: LOADED
    });
  }
}
export const updateProfileCompany = (id, payload) => async dispatch => {
  let company_id = id;
  try {
    dispatch({
      type: LOADING
    });
    await axios.patch(`http://localhost:5000/api/v1/companies/${company_id}`, payload);
    dispatch({
      type: UPDATE_PROFILE_COMPANY,
      payload: payload
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_COMPANY_ERROR,
      payload: error
    });
  } finally {
    dispatch({
      type: LOADED
    });
  }
}
export const deleteProfileCompany = (id) => async dispatch => {
  const company_id = id;
  try {
    await axios.delete(`http://localhost:5000/api/v1/engineers/${company_id}`)
    dispatch({
      type: DELETE_COMPANY,
      payload: company_id
    });
  }
  catch (error) {
    dispatch({
      type: DELETE_COMPANY_ERROR,
      payload: error
    });
  }
}
