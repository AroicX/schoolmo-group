import api from "./api";
import { STORAGE_TOKEN } from "../store.js";


const BASE_URL = api.BASE_URL;

export function JWT_EXPIRED(err) {
  if (err.message === "jwt expired") {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location = "/";
    return false;
  }
  if (err.message === "invalid token") {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location = "/";
    return false;
  }
}

export async function TEST_RUNNUER() {
  // let test = await fetch.get("/term");
  // .then((res) => console.log(res))
  // .catch((err) => console.log(err));

  try {
    let test = await fetch.get("/term");
    let { data } = test.data;
    let status = test.data.status;

    console.log(status);
    console.log(data);
  } catch (err) {
    let { error } = err.response.data;
    console.log(error);
    console.log(err.response.data);
  }
}

export async function LOG_USER_IN(email, password, callback, onError) {
  try {
    let user = await fetch(`${BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    user = await user.json();

    user.status === "success" && callback && callback(user);

    if (user.status === "error") throw user;

    return user;
  } catch (err) {
    JWT_EXPIRED(err);
    onError && onError(err);
    return false;
  }
}

export async function TERMS(toocallback, onError) {
  try {
    // let term = await fetch(`/term`,, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `${token}`,
    //     "Content-Type": "application/json",
    //   };
    // let { data } = term.data;
    // let status = term.data.status;

    // status === "success" && callback && callback(data);
    // if (status === "error") throw term;

    // return term;
  } catch (err) {
    JWT_EXPIRED(err);
    onError && onError(err);
    return false;
  }
}
export async function ZONES(callback, onError) {
  try {
    let zones = await fetch.get(`/zones`);
    let { data } = zones.data;
    let status = zones.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw zones;

    return zones;
  } catch (err) {
    JWT_EXPIRED(err);
    onError && onError(err);
    return false;
  }
}

export async function DASHBOARD(term_id, callback, onError) {
  try {
    let dashboard = await fetch.get(`/dashboard/all`);
    let { data } = dashboard.data;
    let status = dashboard.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw dashboard;

    return dashboard;
  } catch (err) {
    JWT_EXPIRED(err);
    onError && onError(err);
    return false;
  }
}

export async function GET_ZONAL_DASHBOARD_BY_ID(id, callback, onError) {
  try {
    let dashboard = await fetch.get(`/zones/${id}/dashboard`);
    let { data } = dashboard.data;
    let status = dashboard.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw dashboard;

    return dashboard;
  } catch (err) {
    JWT_EXPIRED(err);
    onError && onError(err);
    return false;
  }
}

export async function GET_SCHOOLS(term_id, callback, onError) {
  try {
    let schools = await fetch.get(`/schools`);
    let { data } = schools.data;
    let status = schools.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw schools;

    return schools;
  } catch (err) {
    JWT_EXPIRED(err);
    onError && onError(err);
    return false;
  }
}

export async function GET_SCHOOLS_DASHBOARD(term_id, callback, onError) {
  try {
    let schools = await fetch.get(`/dashboard/list`);
    let { data } = schools.data;
    let status = schools.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw schools;

    return schools;
  } catch (err) {
    JWT_EXPIRED(err);
    onError && onError(err);
    return false;
  }
}

export async function GET_SCHOOL_BY_ID(id, callback, onError) {
  try {
    let schools = await fetch.get(`/schools/${id}`);
    let { data } = schools.data;
    let status = schools.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw schools;

    return schools;
  } catch (err) {
    JWT_EXPIRED(err);
    onError && onError(err);
    return false;
  }
}
export async function GET_SCHOOL_FEE_INFORMATION(
  school_id,
  term_id,
  callback,
  onError
) {
  try {
    let fees = await fetch.get(`/payment/status?school_id=${school_id}&`);
    let { data } = fees.data;
    let status = fees.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw fees;

    return fees;
  } catch (err) {
    JWT_EXPIRED(err);
    onError && onError(err);
    return false;
  }
}

export async function SINGLE_SCHOOL_PAYMENT_DASHBOARD(id, callback, onError) {
  try {
    let schools = await fetch.get(`/dashboard/school/${id}`);
    let { data } = schools.data;
    let status = schools.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw schools;

    return schools;
  } catch (err) {
    JWT_EXPIRED(err);
    onError && onError(err);
    return false;
  }
}

export async function SINGLE_SCHOOL_PAYMENT_IN_A_TERM(
  school_id,
  term_id,
  callback,
  onError
) {
  try {
    let schools = await fetch.get(`/payment/school/${school_id}`);
    let { data } = schools.data;
    let status = schools.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw schools;

    return schools;
  } catch (err) {
    JWT_EXPIRED(err);
    onError && onError(err);
    return false;
  }
}

export async function PAYMENT_ALL_SCHOOLS(query, callback, onError) {
  // console.log(query);
  // return false;
  try {
    let schools = await fetch.get(`payment/all?time=${query}&`);
    let { data } = schools.data;
    let status = schools.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw schools;

    return schools;
  } catch (err) {
    JWT_EXPIRED(err);
    onError && onError(err);
    return false;
  }
}

export async function PAYMENT_RANGE(token, query, callback, onError) {
  try {
    // /payment/range?from=03/29/2018&to=09/29/2018

    let payment = await fetch(`${BASE_URL}/payment/range?from=${query}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    payment = await payment.json();

    payment.status === "success" && callback && callback(payment);

    if (payment.status === "error") throw payment;

    return payment;
  } catch (err) {
    JWT_EXPIRED(err);
    onError && onError(err);
    return false;
  }
}
export async function PAYMENT_RANGE_FROM_TO(
  token,
  from,
  to,
  callback,
  onError
) {
  // console.log(query);
  // return false;
  try {
    // /payment/range?from=03/29/2018&to=09/29/2018

    let payment = await fetch(
      `${BASE_URL}/payment/range?from=${from}&to=${to}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    payment = await payment.json();

    payment.status === "success" && callback && callback(payment);

    if (payment.status === "error") throw payment;

    return payment;
  } catch (err) {
    JWT_EXPIRED(err);
    onError && onError(err);
    return false;
  }
}
