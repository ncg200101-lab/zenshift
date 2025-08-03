import apiHandler from '../global/api';
import {
    ApiError,
    BlogPostTypes,
    GetAllBlogPostsServiceResponse,
} from '../global/types';

export const getAllAbundanceBlogPostsService = async (): Promise<GetAllBlogPostsServiceResponse> => {
    try {
        const response = await apiHandler.makeApiCall<BlogPostTypes[]>(
            '/api/blogposts/vertical/abundance',
            'GET',
        );
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
};