export type User = {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
};
  
export type UsersState = {
    isLoading: boolean;
    error?: string;
};
  
export type GetUsersSuccessResponse = {
    page: number;
    users: User[];
    total: number;
    totalPages: number;
};

export type UpdateUserParams = {
    id: string;
    name?: string;
    email?: string;
    role?: 'user' | 'admin';
};
  
export type DeleteUserParams = {
    id: string;
};
  