import apiHandler from '../global/api';
import { ApiError, ActionResponse } from '../global/types';
import {
    ProductTypes,
    SortByTypes,
    GetProductsResponse,
    GetReviewsResponse,
    ShiftTypes,
    CategoryTypes,
    FrequencyColorTypes,
    FrequencyFitTypes,
    FrequencySizeTypes,
    FrequencyStyleTypes,
} from './types';

export const getProductByIdService = async (
    id: string
): Promise<ActionResponse<ProductTypes>> => {
    try {
        const response = await apiHandler.makeApiCall<ProductTypes>(
            `/api/products/${id}`,
            'GET'
        );
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
};

export const getAllProductsService = async (
    queries?: {
        shift?: ShiftTypes;
        category?: CategoryTypes;
        color?: FrequencyColorTypes;
        size?: FrequencySizeTypes;
        style?: FrequencyStyleTypes;
        fit?: FrequencyFitTypes;
        searchText?: string;
        page?: string;
        limit?: string;
        sortBy?: SortByTypes;
    }
): Promise<ActionResponse<GetProductsResponse>> => {
    try {
        const response = await apiHandler.makeApiCall<GetProductsResponse>(
            '/api/products',
            'GET',
            queries ? { params: queries } : undefined
        );
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
};

export const getReviewsByProductService = async (
    id: string
): Promise<ActionResponse<GetReviewsResponse>> => {
    try {
        const response = await apiHandler.makeApiCall<GetReviewsResponse>(
            `/api/reviews/product/${id}`,
            'GET'
        );
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
};

export const createProductService = async (
    data: FormData
): Promise<ActionResponse<ProductTypes>> => {
    try {
        const response = await apiHandler.makeApiCall<ProductTypes>(
            '/api/products',
            'POST',
            {
                data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
};

export const updateProductService = async (
    id: string,
    data: FormData
): Promise<ActionResponse<ProductTypes>> => {
    try {
        const response = await apiHandler.makeApiCall<ProductTypes>(
            `/api/products/${id}`,
            'PUT',
            {
                data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
};

export const deleteProductService = async (
    id: string
): Promise<ActionResponse<{ id: string }>> => {
    try {
        const response = await apiHandler.makeApiCall<{ id: string }>(
            `/api/products/${id}`,
            'DELETE'
        );
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
};