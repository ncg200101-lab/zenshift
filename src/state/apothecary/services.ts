import apiHandler from '../global/api';
import {
    ApiError,
    BlogPostTypes,
    GetAllBlogPostsServiceResponse,
} from '../global/types';

export const getAllApothecaryBlogPostsService = async (): Promise<GetAllBlogPostsServiceResponse> => {
    try {
        const response = await apiHandler.makeApiCall<BlogPostTypes[]>(
            '/api/blogposts/vertical/apothecary',
            'GET',
        );
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
};