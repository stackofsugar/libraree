import { redirect } from 'react-router';
import axios from 'axios';

type ApiResult = {
  success: boolean;
  status: number;
  data: any;
  error: any;
};

export async function apiCall(method: string, route: string, data: object = {}) {
  const token = localStorage.getItem('user');
  const result: ApiResult = {
    success: false,
    data: {},
    error: {},
    status: 200,
  };

  if (!token) {
    throw redirect('/login');
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const config = {
    method: method,
    url: import.meta.env.VITE_API_ROOT + route,
    data: data,
  };

  return await axios(config)
    .then(function (response) {
      result.success = true;
      result.data = response.data;
      result.status = response.status;
      return result;
    })
    .catch(function (error) {
      console.log(error);
      if (error.status == 403) {
        throw redirect('/login');
      }
      result.success = false;
      result.error = error;
      return result;
    });
}
