import axios from 'axios'
const environ = import.meta.env

function http (accesstoken, timeout=0) {
  const request = {
    baseURL: environ.VITE_API_BASEURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  if (accesstoken) {
    request.headers['Authorization'] = `Bearer ${accesstoken}`
  }
  const http = axios.create(request)
  return http
}

function user (auth) {
  return auth.user._value
} 

async function post (auth, url, data) {
  try {
    const accesstoken = await auth.getAccessTokenSilently()
    const response = await http(accesstoken).post(url, data)
    return response.data
  } catch (error) {
    if (error.response.status == 401) {
      return error.response.data
    }
    return error
  }
}

export async function submitReport (auth, { amount, merchant, description }) {
  const url = '/submit-report'
  const data = {
    amount,
    merchant,
    description,
    submitter_id: user(auth).sub,
    submitter_email: user(auth).email
  }
  return await post(auth, url, data)
}

export async function getReports (auth) {
  const url = '/list-reports'
  const data = {}
  return await post(auth, url, data)
}

export async function approveReport (auth, report_id) {
  const url = '/approve-report'
  const data = { report_id }
  return await post(auth, url, data)
}

export async function disapproveReport (auth, report_id) {
  const url = '/disapprove-report'
  const data = { report_id }
  return await post(auth, url, data)
  
}

export async function deleteReport (auth, report_id) {
  const url = '/delete-report'
  const data = { report_id }
  return await post(auth, url, data)
}
