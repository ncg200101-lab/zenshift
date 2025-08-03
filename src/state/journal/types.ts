import { ShiftTypes } from "../product/types";

export type JournalTypes = {
    _id: string;
    title: string;
    author: {
        _id: string;
        name: string;
    };
    description: string;
    shift: ShiftTypes;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export type GetJournalsResponse = {
    page: number;
    journals: JournalTypes[];
    total: number;
    totalPages: number;
}

export type SortByTypes = 'alphabetical' | 'oldest' | 'newest';

export type JournalState = {
    isLoading: boolean;
    error?: string;
}