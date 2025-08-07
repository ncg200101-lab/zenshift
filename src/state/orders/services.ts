import apiHandler from '../global/api';
import {
  ApiError,
  ActionResponse,
} from '../global/types';
import {
  GetOrdersSuccessResponse,
  CheckPurchaseResponse,
} from './types';

export const getAllOrdersService = async (
    queries?: { page?: string; limit?: string; }
): Promise<ActionResponse<GetOrdersSuccessResponse>> => {
    try {
        const response = await apiHandler.makeApiCall<GetOrdersSuccessResponse>(
            '/api/orders',
            'GET',
            { params: queries }
        );
        console.log('re', response)
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
};

export const checkExistingPurchaseService = async (
    email: string,
    productId: string
): Promise<ActionResponse<CheckPurchaseResponse>> => {
    try {
        const response = await apiHandler.makeApiCall<CheckPurchaseResponse>(
            '/api/orders/check-purchase',
            'GET',
            { params: { email, productId } }
        );
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
};
