/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { Toast } from 'antd-mobile';

// 定义通用响应结构，与 types/index.ts 保持兼容
export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

class Http {
  private instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 可以在这里添加 token，例如：
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse<any>>) => {
        const { code, msg } = response.data;
        // 这里可以根据后端约定的 code 进行统一处理，比如未登录跳转等
        if (code !== 0 && code !== 200) { // 假设 0 或 200 是成功，具体看接口
            console.warn(`API Error: ${msg} (code: ${code})`);
            // 可以选择在这里抛出错误，或者让业务层处理
            // return Promise.reject(new Error(msg || 'Error'));
            Toast.show({
                content: msg || 'Error',
                duration: 2000,
            });
        }
        return response;
      },
      (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
      }
    );
  }

  // 封装 GET 请求
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const res = await this.instance.get<ApiResponse<T>>(url, config);
    return res.data;
  }

  // 封装 POST 请求
  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const res = await this.instance.post<ApiResponse<T>>(url, data, config);
    return res.data;
  }

  // 封装 PUT 请求
  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
      const res = await this.instance.put<ApiResponse<T>>(url, data, config);
    return res.data;
  }

  // 封装 DELETE 请求
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
      const res = await this.instance.delete<ApiResponse<T>>(url, config);
    return res.data;
  }
}

const http = new Http({
  baseURL: 'https://api.xiaobeiyangji.com/yangji-api/api',
  headers: {
    'Content-Type': 'application/json',
    'xweb_xhr': '1',
  },
  timeout: 10000,
});

export default http;
