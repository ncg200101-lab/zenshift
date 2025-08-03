import { BlogPostTypes } from '../global/types';

export type ApothecaryToolTypes = {
    src: string;
    title: string;
}

export type ApothecaryState = {
    isLoading: boolean;
    blogPosts: BlogPostTypes[];
    featuredTools: ApothecaryToolTypes[];
    error?: string;
}