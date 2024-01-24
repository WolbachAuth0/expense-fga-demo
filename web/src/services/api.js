import axios from 'axios'

async function getAccessToken (auth) {
  const token = await auth.getTokenSilently()
  return token
}

function http (accesstoken, timeout=0) {
  const request = {
    baseURL: process.env.VITE_API_BASEURL,
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

async function listMyReports (auth) {
  url = '/fga-list-all'
  body = {

  }
}

async function approveReport () {

}

export default {
  checkPermission,
  listObjects,

}


