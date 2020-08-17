import axios from "axios";
import api from "./api";
import { STORAGE_TOKEN } from "../store.js";

export const fetcher = axios.create({
  baseURL: api.BASE_URL,
  // timeout: 5000,
  transformResponse: axios.defaults.transformResponse.concat((data) => {
    localStorage.removeItem("token");
    localStorage.token = JSON.stringify({
      token: data.token,
    });
    STORAGE_TOKEN.set(data.token);
    return data;
  }),
  validateStatus: function (status) {
    return status >= 200 && status < 400;
  },
});

fetcher.interceptors.request.use(
  function (config) {
    let localToken = JSON.parse(localStorage.token);
    let signedUser = JSON.parse(localStorage.currentUser);
    let selectedZone = localStorage.selectedZone
      ? JSON.parse(localStorage.selectedZone)
      : false;
    let selectedTerm = localStorage.selectedTerm
      ? JSON.parse(localStorage.selectedTerm)
      : false;
    let userType = signedUser.user.zone;

    config.headers = {
      ...config.headers,
    };
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
    config.headers.Authorization = `${localToken.token}`;
    // you can also do other modification in config
    let stringUrl = config.url;

    if (userType === "Central User" && selectedZone) {
      if (stringUrl.substr(-1) == "&") {
        config.url = `${config.url}&term_id=${selectedTerm.term_id}&zone_id=${selectedZone.zone.zone_id}`;
      } else {
        config.url = `${config.url}?term_id=${selectedTerm.term_id}&zone_id=${selectedZone.zone.zone_id}`;
      }
    } else if (userType === "Central User") {
      if (stringUrl.substr(-1) == "&") {
        config.url = `${config.url}&term_id=${selectedTerm.term_id}`;
      } else {
        config.url = `${config.url}?term_id=${selectedTerm.term_id}`;
      }
    } else {
      if (stringUrl.substr(-1) == "&") {
        config.url = `${config.url}&term_id=${selectedTerm.term_id}&zone_id=${userType}`;
      } else {
        config.url = `${config.url}?term_id=${selectedTerm.term_id}&zone_id=${userType}`;
      }
    }

    if (config.headers.Authorization === "null") {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      window.location = "/";
      return false;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

fetcher.interceptors.response.use(
  function (response) {
    if (response.status === 400) {
      console.log("wahala dey");
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
