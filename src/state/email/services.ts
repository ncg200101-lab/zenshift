import apiHandler from '../global/api';
import { ApiError } from '../global/types';
import { 
    SendEmailSuccessResponse,
    SendEmailServiceResponse,
    SendEmailParams,
} from './types';

export const sendEmailService = async (params: SendEmailParams): Promise<SendEmailServiceResponse> => {
    try {
        const response = await apiHandler.makeApiCall<SendEmailSuccessResponse>(
            '/api/email/send',
            'POST',
            { data: params }
        );
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
};
