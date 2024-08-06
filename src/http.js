import axios from "axios";
import { getToken } from "./util/auth";

const baseurl = import.meta.env.VITE_BASE_URL;

export const signup = async (data) => {
  const response = await axios.post(`${baseurl}/auth/signup`, data);
  return response.data;
};

export const login = async (data) => {
  const response = await axios.post(`${baseurl}/auth/login`, data);
  return response.data;
};

export const verifyEmail = async (data) => {
  const response = await axios.post(`${baseurl}/auth/verify-Email`, data);
  return response.data;
};

export const requestresend = async (data) => {
  const response = await axios.post(
    `${baseurl}/auth/request-resend-password`,
    data
  );
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await axios.post(`${baseurl}/auth/reset-password`, data);
  return response.data;
};

export const changePassword = async (data) => {
  const token = getToken();
  const response = await axios.post(`${baseurl}/auth/change-password`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchDatabase = async () => {
  const token = getToken();
  const response = await axios(`${baseurl}/database`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};

export const addDatabase = async (data) => {
  const token = getToken();
  const response = await axios.post(`${baseurl}/database`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const editDatabase = async (data) => {
  const token = getToken();
  const response = await axios.patch(`${baseurl}/database`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteDatabase = async (id) => {
  const token = getToken();
  const response = await axios.delete(`${baseurl}/database/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchUserDetails = async () => {
  const token = getToken();
  const response = await axios(`${baseurl}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};

export const editUserDetails = async (data) => {
  const token = getToken();
  const response = await axios.put(`${baseurl}/user`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const uploadAvatar = async (data) => {
  const token = getToken();
  const response = await axios.post(`${baseurl}/user/upload`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const addCollection = async (data) => {
  const token = getToken();
  const response = await axios.post(`${baseurl}/collection`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchCollection = async (id) => {
  const token = getToken();
  const response = await axios(`${baseurl}/database/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};

export const deleteCollection = async (id) => {
  const token = getToken();
  const response = await axios.delete(`${baseurl}/collection/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
