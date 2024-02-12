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

export async function getReports (auth) {
  const url = '/list-reports'
  const data = {
    user_id: user(auth).sub
  }

  try {
    const accesstoken = await auth.getAccessTokenSilently()
    const response = await http(accesstoken).post(url, data)
    return response.data
  } catch (error) {
    console.log(error)
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
  
  try {
    const accesstoken = await auth.getAccessTokenSilently()
    const response = await http(accesstoken).post(url, data)
    return response.data
  } catch (error) {
    return error
  }
}

export async function approveReport (auth, report_id) {
  const url = '/approve-report'
  const data = {
    approver_id: user(auth).sub,
    approver_email: user(auth).email,
    report_id
  }

  try {
    const accesstoken = await auth.getAccessTokenSilently()
    const response = await http(accesstoken).post(url, data)
    return response.data
  } catch (error) {

    if (error.response.status === 401) {
      console.log(`The user ${user(auth).email} is not authorized to approve the expense report report_id:${report_id}.`)
      return error.response.data
    }
    return error
  }
}

export async function disapproveReport (auth, report_id) {
  const url = '/disapprove-report'
  const data = {
    report_id,
    approver_id: user(auth).sub,
    approver_email: user(auth).email
  }

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