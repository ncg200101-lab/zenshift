import { createReducer } from '@reduxjs/toolkit';
import { getAllAbundanceBlogPostsAction } from './actions';
import { AbundanceState, RecommendedResourceTypes } from './types';

const initialRecommendedResources: RecommendedResourceTypes[] = [
    {
        src: '/assets/chakra/orange.svg',
        title: 'Money Tuning forks'
    },
    {
        src: '/assets/chakra/pink.svg',
        title: 'Affirmation Journals'
    },
    {
        src: '/assets/chakra/green.svg',
        title: 'Wealth altar tools'
    }
];

export const initialState: AbundanceState = {
    isLoading: false,
    blogPosts: [],
    recommendedResources: initialRecommendedResources,
};

export default createReducer(initialState, (builder) =>
    builder
        .addCase(getAllAbundanceBlogPostsAction.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getAllAbundanceBlogPostsAction.fulfilled, (state, { payload }) => {
            state.blogPosts = payload;
            state.isLoading = false;
        })
        .addCase(getAllAbundanceBlogPostsAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload || 'Failed to retrieve blog posts';
        })
);