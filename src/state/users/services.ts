import apiHandler from '../global/api';
import {
  ApiError,
  ActionResponse,
} from '../global/types';
import {
  GetUsersSuccessResponse,
  UpdateUserParams,
  DeleteUserParams,
  User
} from './types';

export const getAllUsersService = async (
    queries?: { page?: string; limit?: string; }
): Promise<ActionResponse<GetUsersSuccessResponse>> => {
    try {
        const response = await apiHandler.makeApiCall<GetUsersSuccessResponse>(
            '/api/users',
            'GET',
            { params: queries }
        );
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
};

export const updateUserService = async (params: UpdateUserParams): Promise<ActionResponse<User>> => {
    try {
        const response = await apiHandler.makeApiCall<User>(
            `/api/users/${params.id}`,
            'PUT',
            {
                data: params,
            }
        );
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
};

export const deleteUserService = async (params: DeleteUserParams): Promise<ActionResponse<{ success: boolean }>> => {
    try {
        const response = await apiHandler.makeApiCall<{ success: boolean }>(
            `/api/users/${params.id}`,
            'DELETE',
        );
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
}; 