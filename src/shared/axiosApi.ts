import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import config from './../../tailwind.config';

const responseBody = <T>(response: AxiosResponse<T>) => {
  const results: any = response.data;
  return results;
};

export const axiosRequest = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: any) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: any) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string, config: AxiosRequestConfig<any>) => axios.delete<T>(url, config).then(responseBody),
};
