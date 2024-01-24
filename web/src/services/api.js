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
    user: `user:${auth.user.value.sub}`,
    relation: "submitter",
    type: 'report'
  }
  try {
    const accesstoken = await auth.getAccessTokenSilently()
    const response = await http(accesstoken, 1000).post(url, data)
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

async function getReportsToApprove (auth) {
  const url = '/fga-list-all'
  const data = {
    user: `user:${auth.user.value.sub}`,
    relation: 'approver',
    type: 'report'
  }
  try {
    const accesstoken = await auth.getAccessTokenSilently()
    const response = await http(accesstoken, 1000).post(url, data)
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

async function approveReport () {

}

export default {
  checkPermission,
  getSubmittedReports,
  getReportsToApprove,
  approveReport
}


