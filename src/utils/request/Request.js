import axios from 'axios'
import qs from 'qs'
import Conf from '../../config.json'

const _axios = axios.create()

_axios.interceptors.request.use(
  (request) => {
    request.data = qs.stringify(request.data)
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  (response) => {
    console.log(`request:${response.config.url}, data:${JSON.stringify(response.data)}`)
    return response.data;
  },
  (error) => {
    console.log(`request:${error.response.config.url}, data:${JSON.stringify(error.response.data)}`)
    return Promise.reject(error.response);
  }
)

function $ajax(options) {
  if(!options.headers || typeof options.headers !== "object") {
    options.headers = {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }

  if(!options.baseURL || typeof options.baseURL !== "string") {
    options.baseURL = Conf.baseURL
  }

  if(!options.method || typeof options.method !== "string") {
    options.method = "POST"
  }

  return _axios.request({
    headers: options.headers,
    baseURL: options.baseURL,
    method: options.method,
    url: options.url,
    data: options.data
  })
}

$ajax.GET = function (options) {
  return $ajax({...options, method: "GET"})
}

$ajax.HEAD = function (options) {
  return $ajax({...options, method: "HEAD"})
}

$ajax.POST = function (options) {
  return $ajax({...options, method: "POST"})
}

$ajax.PUT = function (options) {
  return $ajax({...options, method: "PUT"})
}

$ajax.PATCH = function (options) {
  return $ajax({...options, method: "PATCH"})
}

$ajax.DELETE = function (options) {
  return $ajax({...options, method: "DELETE"})
}

export default $ajax
