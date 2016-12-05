import axios from 'axios';

// Creating an instance
let http = axios.create({
  baseURL: process.env.API,
  headers: {
    'Accept': 'application/json',
  },
  responseType: 'json',
});

// Add a request interceptor
http.interceptors.request.use(config => {
  // Do something before request is sent
  return Promise.resolve(config);
}, error => {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
http.interceptors.response.use(response => {
  // Do something with response data
  return response;
}, error => {
  // Do something with response error
  if (error instanceof Error) {
    return Promise.reject({
      data: {
        status: false,
        message: error.message,
      },
      error: true,
      loading: false,
      message: error.message,
    });
  }
  return Promise.reject(error);
});

export default http;
