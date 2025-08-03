import { BlogPostTypes } from '../global/types';

export type RecommendedResourceTypes = {
    src: string;
    title: string;
}

export type AbundanceState = {
    isLoading: boolean;
    blogPosts: BlogPostTypes[];
    recommendedResources: RecommendedResourceTypes[];
    error?: string;
}