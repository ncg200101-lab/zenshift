import React, { useCallback, useEffect, useState } from 'react';

import { useAppDispatch } from '../../state/hooks';
import {
    deleteUserAction,
    getAllUsersAction,
    updateUserAction,
} from '../../state/users/actions';
import { User } from '../../state/users/types';

interface FormData {
    name: string;
    email: string;
    role: 'user' | 'admin';
}

const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
};

const UserManagement: React.FC = () => {
    const dispatch = useAppDispatch();
    
    // State management
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [deleteUser, setDeleteUser] = useState<User | null>(null);
    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        role: 'user',
    });
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [actionLoading, setActionLoading] = useState<boolean>(false);

    const fetchAllUsers = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        try {
            const result = await dispatch(
                getAllUsersAction({
                    page: currentPage.toString(),
                    limit: '10',
                })
            ).unwrap();
            setUsers(result.users || []);
            setTotalPages(result.totalPages || 1);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, currentPage]);

    const handleEdit = useCallback((user: User): void => {
        setEditUser(user);
        setForm({
            name: user.name,
            email: user.email,
            role: user.role,
        });
        setShowEditModal(true);
    }, []);

    const handleDelete = useCallback((user: User): void => {
        setDeleteUser(user);
        setShowDeleteModal(true);
    }, []);

    const handleChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ): void => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }, [form]);

    const handleEditSubmit = useCallback(async (
        e: React.FormEvent
    ): Promise<void> => {
        e.preventDefault();
        if (!editUser) return;

        setActionLoading(true);
        try {
            await dispatch(
                updateUserAction({
                    id: editUser._id,
                    name: form.name,
                    email: form.email,
                    role: form.role,
                })
            ).unwrap();
            setShowEditModal(false);
            await fetchAllUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            setActionLoading(false);
        }
    }, [dispatch, editUser, form, fetchAllUsers]);

    const handleDeleteConfirm = useCallback(async (): Promise<void> => {
        if (!deleteUser) return;

        setActionLoading(true);
        try {
            await dispatch(deleteUserAction({ id: deleteUser._id })).unwrap();
            setShowDeleteModal(false);
            await fetchAllUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            setActionLoading(false);
        }
    }, [dispatch, deleteUser, fetchAllUsers]);

    const handlePageChange = useCallback((newPage: number): void => {
        setCurrentPage(newPage);
    }, []);

    const handleCancelEdit = useCallback((): void => {
        setShowEditModal(false);
    }, []);

    const handleCancelDelete = useCallback((): void => {
        setShowDeleteModal(false);
    }, []);

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    const renderLoadingSpinner = () => (
        <div className="flex justify-center items-center py-16">
            <svg
                className="animate-spin h-8 w-8 text-purple-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                />
            </svg>
        </div>
    );

    const renderUserTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead>
                    <tr className="bg-gradient-to-r from-purple-100 to-blue-100">
                        <th className="px-4 py-3 border-b font-semibold text-gray-700">
                            Avatar
                        </th>
                        <th className="px-4 py-3 border-b font-semibold text-gray-700">
                            Name
                        </th>
                        <th className="px-4 py-3 border-b font-semibold text-gray-700">
                            Email
                        </th>
                        <th className="px-4 py-3 border-b font-semibold text-gray-700">
                            Role
                        </th>
                        <th className="px-4 py-3 border-b font-semibold text-gray-700">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user._id}
                            className="text-center transition hover:bg-purple-50"
                        >
                            <td className="px-4 py-2 border-b">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-200 text-purple-700 font-bold text-lg mx-auto shadow">
                                    {getInitials(user.name)}
                                </span>
                            </td>
                            <td className="px-4 py-2 border-b font-medium text-gray-900">
                                {user.name}
                            </td>
                            <td className="px-4 py-2 border-b text-gray-700">
                                {user.email}
                            </td>
                            <td className="px-4 py-2 border-b capitalize">
                                <span
                                    className={`px-2 py-1 rounded text-xs font-semibold ${
                                        user.role === 'admin'
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'bg-blue-100 text-blue-700'
                                    }`}
                                >
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-4 py-2 border-b">
                                <div className="flex justify-center space-x-2">
                                    <button
                                        className={`px-3 py-1 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:scale-105 hover:from-blue-600 hover:to-purple-600 transition disabled:opacity-50`}
                                        onClick={() => handleEdit(user)}
                                        disabled={actionLoading}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className={`px-3 py-1 rounded bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow hover:scale-105 hover:from-red-600 hover:to-pink-600 transition disabled:opacity-50`}
                                        onClick={() => handleDelete(user)}
                                        disabled={actionLoading}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 space-x-2">
                    <button
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 font-semibold"
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <span className="mx-2 text-gray-700 font-medium">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 font-semibold"
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );

    const renderEditModal = () => {
        if (!showEditModal || !editUser) return null;

        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 animate-fade-in">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-slide-up">
                    <h2 className="text-2xl font-bold mb-4 text-purple-700">
                        Edit User
                    </h2>
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-purple-300"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                disabled
                                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-purple-300"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Role</label>
                            <select
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-purple-300"
                                required
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
                                onClick={handleCancelEdit}
                                disabled={actionLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded font-semibold hover:from-blue-600 hover:to-purple-600"
                                disabled={actionLoading}
                            >
                                {actionLoading ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const renderDeleteModal = () => {
        if (!showDeleteModal || !deleteUser) return null;

        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 animate-fade-in">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-slide-up">
                    <h2 className="text-2xl font-bold mb-4 text-red-600">
                        Confirm Delete
                    </h2>
                    <p className="mb-6 text-gray-700">
                        Are you sure you want to delete{' '}
                        <span className="font-bold">{deleteUser.name}</span>?
                    </p>
                    <div className="flex justify-end space-x-2">
                        <button
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
                            onClick={handleCancelDelete}
                            disabled={actionLoading}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded font-semibold hover:from-red-600 hover:to-pink-600"
                            onClick={handleDeleteConfirm}
                            disabled={actionLoading}
                        >
                            {actionLoading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <h1 className="text-3xl font-extrabold text-center mb-8 text-purple-700 tracking-tight drop-shadow">
                User Management
            </h1>
            {isLoading ? renderLoadingSpinner() : renderUserTable()}
            {renderEditModal()}
            {renderDeleteModal()}
        </>
    );
};

export default UserManagement;
