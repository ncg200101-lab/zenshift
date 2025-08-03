import { BlogPostTypes } from '../global/types';

export type InteriorsState = {
    isLoading: boolean;
    blogPosts: BlogPostTypes[];
    error?: string;
}