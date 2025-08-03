import axios, { AxiosRequestConfig } from 'axios';
import {
    ApiResponse,
    ApiRequestConfig as ApiConfig,
    ApiError,
    ErrorResponse,
    ActionResponse,
    ApiEndpoint,
    ApiHandler
} from './types';

// export const BASE_URL = '';
export const BASE_URL = 'http://localhost:5000';

export const defaultConfig: Partial<ApiConfig> = {
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache',
    },
};

export const makeApiCall = async <T = any>(
    endpoint: ApiEndpoint,
    method: ApiConfig['method'],
    config?: Omit<ApiConfig, 'method'>
): Promise<ApiResponse<T>> => {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            ...defaultConfig.headers,
            ...(config?.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
        const requestConfig: AxiosRequestConfig = {
            ...defaultConfig,
            ...config,
            headers,
            method,
            url: `${BASE_URL}${endpoint}`,
        };

        const response = await axios(requestConfig);
        return {
            data: response.data,
            status: response.status,
            message: response.statusText,
        };
    } catch (error) {
        throw error;
    }
};

export const handleApiError = (error: ApiError): ErrorResponse => {
    if (error.response) {
        return {
            error: error.response.data.error,
            message: error.response.data.message,
            status: error.response.status,
            data: error.response.data.data,
        };
    }

    return {
        error: 'Network Error',
        message: error.message,
        status: error.status,
    };
};

export const handleActionResponse = <T = any>(response: ApiResponse<T>): ActionResponse<T> => {
    return {
        success: response.status >= 200 && response.status < 300,
        data: response.data,
    };
};

export const handleActionError = (error: ApiError): ActionResponse => {
    return {
        success: false,
        error: handleApiError(error),
    };
};

export const apiHandler: ApiHandler = {
    makeApiCall,
    handleApiError,
    handleActionResponse,
    handleActionError,
};

export default apiHandler; 