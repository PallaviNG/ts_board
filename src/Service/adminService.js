import { base_url, commonError, post } from "./httpService";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

export const getAdminLogin = async (url, sendData) => {
  try {
    let data = await post(base_url + url, sendData);
    toast.success("Login Successfully");
    return data;
  } catch (error) {
    commonError(error);
  }
};

export const saveAdminRegister = async (url, sendData) => {
  try {
    let data = await post(base_url + url, sendData);
      toast.success("Registered Successfully");
    return data;
  } catch (error) {
    commonError(error);
  }
};

export const saveAuthToken = (token) => {
  localStorage.setItem("token", token);
  window.location.assign("/");
};

export const isAdminValid = () => {
  return localStorage.getItem("token") === null ? false : true;
};

export const getUserDetails = () => {
  let token = localStorage.getItem("token");
  return token === null ? false : jwt_decode(token);
};

export const removeAuthToken = (token) => {
  localStorage.removeItem("token")
  window.location.assign("/");
}