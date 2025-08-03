import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useAppDispatch } from '../../state/hooks';
import {
    createJournalAction,
    deleteJournalAction,
    getAllJournalsAction,
    updateJournalAction
} from '../../state/journal/actions';
import { JournalTypes } from '../../state/journal/types';
import JournalModal from '../../components/Admin/JournalModal';
import { ShiftTypes } from '../../state/product/types';

export interface FormData {
    title: string;
    description: string;
    shift: ShiftTypes;
    image: string;
}

const initialForm: FormData = {
    title: '',
    description: '',
    shift: 'Abundance',
    image: '',
};

const limit = 10;

const JournalManagement = () => {
    const dispatch = useAppDispatch();
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [journals, setJournals] = useState<JournalTypes[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editJournal, setEditJournal] = useState<JournalTypes | null>(null);
    const [deleteJournal, setDeleteJournal] = useState<JournalTypes | null>(null);
    const [form, setForm] = useState<FormData>(initialForm);
    const [showJournalImage, setShowJournalImage] = useState<string>('');
    const [journalFile, setJournalFile] = useState<File | undefined>(undefined);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showNewModal, setShowNewModal] = useState<boolean>(false);
    const [actionLoading, setActionLoading] = useState<boolean>(false);
    const [imageError, setImageError] = useState<string | null>(null);

    const fetchAllJournals = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        try {
            const result = await dispatch(
                getAllJournalsAction({ 
                    page: currentPage.toString(), 
                    limit: limit.toString()
                })
            ).unwrap();
            setJournals(result.journals);
            setTotalPages(result.totalPages);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, currentPage]);

    useEffect(() => {
        fetchAllJournals();
    }, [fetchAllJournals]);

    const handleChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleFileChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const file = e.target.files?.[0];
        if (file) {
            console.log('file', file)
            setShowJournalImage(URL.createObjectURL(file));
            setJournalFile(file);
            setImageError(null);
        }
    }, []);

    const handleSelectChange = useCallback((section: string, value: string): void => {
        setForm((prev) => ({
            ...prev,
            [section]: value,
        }));
    }, []);

    const handleEdit = useCallback((journal: JournalTypes): void => {
        setEditJournal(journal);
        setShowJournalImage(journal.image);
        setForm({
            title: journal.title,
            description: journal.description,
            shift: journal.shift,
            image: journal.image,
        });
        setShowEditModal(true);
        setImageError(null);
    }, []);

    const handleDelete = useCallback((journal: JournalTypes): void => {
        setDeleteJournal(journal);
        setShowDeleteModal(true);
    }, []);

    const handleNew = useCallback((): void => {
        setForm(initialForm);
        setShowJournalImage('');
        setJournalFile(undefined);
        setShowNewModal(true);
        setImageError(null);
    }, []);

    const handleEditSubmit = useCallback(async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (editJournal) {
            setActionLoading(true);
            try {
                const formData = new FormData();
                if (journalFile) {
                    formData.append('file', journalFile);
                }
                formData.append('title', form.title);
                formData.append('description', form.description);
                formData.append('shift', form.shift);
                await dispatch(
                    updateJournalAction({
                        id: editJournal._id,
                        data: formData,
                    })
                ).unwrap();
                setShowEditModal(false);
                fetchAllJournals();
            } catch (e) {
                console.error(e);
            } finally {
                setActionLoading(false);
            }
        }
    }, [dispatch, editJournal, form, journalFile, fetchAllJournals]);

    const handleNewSubmit = useCallback(async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (!showJournalImage || !journalFile) {
            setImageError('Please upload an image.');
            return;
        }
        setActionLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', journalFile);
            formData.append('title', form.title);
            formData.append('description', form.description);
            formData.append('shift', form.shift);
            await dispatch(createJournalAction(formData)).unwrap();
            setShowNewModal(false);
            fetchAllJournals();
        } catch (e) {
            console.error(e);
        } finally {
            setActionLoading(false);
        }
    }, [dispatch, form, journalFile, fetchAllJournals, showJournalImage]);

    const handleDeleteConfirm = useCallback(async (): Promise<void> => {
        if (deleteJournal) {
            setActionLoading(true);
            try {
                await dispatch(deleteJournalAction(deleteJournal._id)).unwrap();
                setShowDeleteModal(false);
                fetchAllJournals();
            } catch {
                // Handle error silently
            } finally {
                setActionLoading(false);
            }
        }
    }, [dispatch, deleteJournal, fetchAllJournals]);

    const handleCloseEditModal = useCallback((): void => {
        setShowEditModal(false);
        setImageError(null);
    }, []);

    const handleCloseNewModal = useCallback((): void => {
        setShowNewModal(false);
        setImageError(null);
    }, []);

    const handleCloseDeleteModal = useCallback((): void => {
        setShowDeleteModal(false);
    }, []);

    const handlePrevPage = useCallback((): void => {
        setCurrentPage((p) => Math.max(1, p - 1));
    }, []);

    const handleNextPage = useCallback((): void => {
        setCurrentPage((p) => Math.min(totalPages, p + 1));
    }, [totalPages]);

    return (
        <>
            <h1 className="text-3xl font-extrabold text-center mb-8 text-purple-700 tracking-tight drop-shadow">
                Journal Management
            </h1>
            <div className="flex justify-end mb-4">
                <button
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded font-semibold shadow hover:from-green-600 hover:to-blue-600 transition"
                    onClick={handleNew}
                >
                    + New Journal
                </button>
            </div>
            {isLoading ? (
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
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                        <thead>
                            <tr className="bg-gradient-to-r from-purple-100 to-blue-100">
                                <th className="px-4 py-3 border-b font-semibold text-gray-700">
                                    Image
                                </th>
                                <th className="px-4 py-3 border-b font-semibold text-gray-700">
                                    Title
                                </th>
                                <th className="px-4 py-3 border-b font-semibold text-gray-700">
                                    Description
                                </th>
                                <th className="px-4 py-3 border-b font-semibold text-gray-700">
                                    Shift
                                </th>
                                <th className="px-4 py-3 border-b font-semibold text-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {journals.map((journal) => (
                                <tr
                                    key={journal._id}
                                    className="text-center transition hover:bg-purple-50"
                                >
                                    <td className="px-4 py-2 border-b">
                                        {journal.image && (
                                            <img 
                                                src={journal.image} 
                                                alt={journal.title} 
                                                className="w-12 h-12 object-cover rounded mx-auto" 
                                            />
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border-b font-medium text-gray-900">
                                        {journal.title}
                                    </td>
                                    <td className="px-4 py-2 border-b text-gray-700">
                                        {journal.description}
                                    </td>
                                    <td className="px-4 py-2 border-b text-gray-700">
                                        {journal.shift}
                                    </td>
                                    <td className="px-4 py-2 border-b space-x-2">
                                        <div className='flex justify-center space-x-2'>
                                            <button
                                                className="px-3 py-1 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:scale-105 hover:from-blue-600 hover:to-purple-600 transition disabled:opacity-50"
                                                onClick={() => handleEdit(journal)}
                                                disabled={actionLoading}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="px-3 py-1 rounded bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow hover:scale-105 hover:from-red-600 hover:to-pink-600 transition disabled:opacity-50"
                                                onClick={() => handleDelete(journal)}
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
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>
                            <span className="mx-2 text-gray-700 font-medium">
                                {currentPage} / {totalPages}
                            </span>
                            <button
                                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 font-semibold"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}
            {/* Edit Journal Modal */}
            <JournalModal
                open={showEditModal}
                form={form}
                isLoading={actionLoading}
                onClose={handleCloseEditModal}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                handleSubmit={handleEditSubmit}
                modalTitle="Edit Journal"
                submitLabel="Save"
                imageSrc={showJournalImage}
                imageError={imageError}
                handleSelectChange={handleSelectChange}
            />
            {/* New Journal Modal */}
            <JournalModal
                open={showNewModal}
                form={form}
                isLoading={actionLoading}
                onClose={handleCloseNewModal}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                handleSubmit={handleNewSubmit}
                modalTitle="New Journal"
                submitLabel="Create"
                imageSrc={showJournalImage}
                imageError={imageError}
                handleSelectChange={handleSelectChange}
            />
            {/* Delete Modal */}
            {showDeleteModal && deleteJournal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-slide-up">
                        <h2 className="text-2xl font-bold mb-4 text-red-600">
                            Confirm Delete
                        </h2>
                        <p className="mb-6 text-gray-700">
                            Are you sure you want to delete{' '}
                            <span className="font-bold">{deleteJournal.title}</span>?
                        </p>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
                                onClick={handleCloseDeleteModal}
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
            )}
        </>
    );
};

export default JournalManagement; 