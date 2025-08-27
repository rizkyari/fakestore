import axios from 'axios';

/**
 * Axios instance for all HTTP requests
 * Base URL is configured via vite env: VITE_API_BASE_URL
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export default api