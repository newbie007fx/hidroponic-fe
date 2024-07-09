import axios from "axios";
import authHeader from "./auth-header";
import eventBus from "../common/EventBus";

class BaseApiService {
  constructor() {
    this.session = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: authHeader(),
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

  get = (url) => this.session.get(url);
  // post = (...params) => this.session.post(...params);
  // put = (...params) => this.session.put(...params);
  // patch = (...params) => this.session.patch(...params);
  // remove = (...params) => this.session.delete(...params);
}

export default BaseApiService;
