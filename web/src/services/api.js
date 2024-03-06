import axios from "axios";
const environ = import.meta.env;

function http(accesstoken, timeout = 0) {
  const request = {
    baseURL: environ.VITE_API_BASEURL,
    timeout,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  if (accesstoken) {
    request.headers["Authorization"] = `Bearer ${accesstoken}`;
  }
  const http = axios.create(request);
  return http;
}

function user(auth) {
  return auth.user._value;
}

async function post(auth, url, data) {
  try {
    const accesstoken = await auth.getAccessTokenSilently();
    const response = await http(accesstoken).post(url, data);
    return response.data;
  } catch (error) {
    return httpErrorHandler(error)
  }
}

async function get(url) {
  try {
    const response = await http().get(url);
    return response.data;
  } catch (error) {
    return httpErrorHandler(error)
  }
}

function httpErrorHandler (err) {
  if (err.response.status == 401) {
    return err.response.data;
  } else if (err.response.status == 429) {
    return err.response.data
  }
  return err
}

export async function submitReport(auth, { amount, merchant, description }) {
  const url = "/submit-report";
  const data = {
    amount,
    merchant,
    description,
  };
  return await post(auth, url, data);
}

export async function getReports(auth) {
  const url = "/list-reports";
  const data = {};
  return await post(auth, url, data);
}

export async function approveReport(auth, report_id) {
  const url = "/approve-report";
  const data = { report_id };
  return await post(auth, url, data);
}

export async function deleteReport(auth, report_id) {
  const url = "/delete-report";
  const data = { report_id };
  return await post(auth, url, data);
}

export async function resetReport(auth, report_id) {
  const url = "/reset-report";
  const data = { report_id };
  return await post(auth, url, data);
}

export async function rejectReport(auth, report_id) {
  const url = "/reject-report";
  const data = { report_id };
  return await post(auth, url, data);
}

export async function getAPIStatus() {
  const url = "/ping";
  return await get(url);
}
