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

async function checkPermission () {

}

async function getSubmittedReports (auth) {
  const url = '/fga-list-all'
  const data = {
    user: `employee:${auth.user.value.sub}`,
    relation: "submitter",
    type: 'report'
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

async function getReportsToApprove (auth) {
  const url = '/fga-list-all'
  const data = {
    user: 'user:sam',
    relation: 'viewer',
    type: 'document'
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

async function getReports (auth) {
  const url = '/list-reports'
  const data = {
    user_id: auth.user.sub
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

async function approveReport (auth, report_id) {
  const url = '/approve-report'
  const data = {
    approver_id: auth.user.sub,
    report_id
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

export default {
  checkPermission,
  getSubmittedReports,
  getReportsToApprove,
  approveReport,
  getReports
}
