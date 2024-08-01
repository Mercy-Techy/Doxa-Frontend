export const getToken = () => {
  const token = window.localStorage.getItem("token");
  return token;
};

export const addToken = (token) => {
  window.localStorage.setItem("token", token);
};

export const deleteToken = () => {
  window.localStorage.removeItem("token");
};
