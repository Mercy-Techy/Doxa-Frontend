import { redirect } from "react-router-dom";

export const getToken = () => {
  const token = window.localStorage.getItem("token");
  return token;
};

export const getAuthToken = () => localStorage.getItem("token");

export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
};

export const tokenLoader = () => {
  const token = getAuthToken();
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  return token;
};

export const isLoggedIn = () => {
  const token = getAuthToken();
  if (!token) {
    return redirect("/logout");
  }

  return null;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  return redirect("/");
};
