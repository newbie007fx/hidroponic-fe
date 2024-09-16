import axios from "axios";
import authHeader from "./auth-header";
import eventBus from "../common/EventBus";

class BaseApiService {
  constructor() {
    this.session = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });

    this.session.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        if (error.response.status === 401) {
          eventBus.dispatch("logout");
          return error;
        }

        return Promise.reject(error);
      }
    );
  }

  get = (url, params) => this.session.get(url, { params: params, headers: authHeader() });
  post = (url, data) => this.session.post(url, data, { headers: authHeader() });
  put = (url, data) => this.session.put(url, data, { headers: authHeader() });
  // patch = (...params) => this.session.patch(...params);
  delete = (url) => this.session.delete(url, { headers: authHeader() });
}

export default BaseApiService;
