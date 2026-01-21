import axios from 'axios'
import { API_BASE_URL } from './env'

const request = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
})

// 请求拦截器
request.interceptors.request.use(
	(config) => {
		// TODO: 添加 token
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// 响应拦截器
request.interceptors.response.use(
	(response) => {
		return response.data
	},
	(error) => {
		console.error('Request error:', error)
		return Promise.reject(error)
	}
)

export default request
