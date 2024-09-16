import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const login = (username, password) => {
  return axios
    .post(API_URL + "/v1/auth/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.is_success) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }

      return response.data;
    }).catch((error) => {
      console.log(error);
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
