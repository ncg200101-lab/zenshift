import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';

import { useAppDispatch } from '../../state/hooks';
import {
    createProductAction,
    deleteProductAction,
    getAllProductsAction,
    updateProductAction,
} from '../../state/product/actions';
import { ProductTypes } from '../../state/product/types';
import { CategoryOption, categoryOptions } from '../../components/ui/Select/CategorySelect';

import ProductModal from '../../components/Admin/ProductModal';

interface FrequencyInfo {
    color: string;
    size: string;
    style: string;
    fit: string;
}

interface AdditionalDetails {
    material: string;
    care: string;
    shippingFormat: string;
    returns: string;
}

interface FormData {
    name: string;
    summary: string;
    description: string;
    shift: string;
    category: string;
    price: number;
    isFreebie: boolean;
    frequencyInfo: FrequencyInfo;
    additionalDetails: AdditionalDetails;
}

const initialForm: FormData = {
    name: '',
    summary: '',
    description: '',
    shift: 'Abundance',
    category: 'abundance-field',
    price: 0,
    isFreebie: false,
    frequencyInfo: {
        color: 'Red',
        size: 'XS',
        style: 'Modern',
        fit: 'Slim',
    },
    additionalDetails: {
        material: '',
        care: '',
        shippingFormat: '',
        returns: '',
    },
};

const ProductManagement = () => {
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductTypes[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editProduct, setEditProduct] = useState<ProductTypes | null>(null);
    const [deleteProduct, setDeleteProduct] = useState<ProductTypes | null>(null);
    const [form, setForm] = useState<FormData>(initialForm);
    const [showProductImage, setShowProductImage] = useState<string>('');
    const [productFile, setProductFile] = useState<File | undefined>(undefined);
    const [freebieFile, setFreebieFile] = useState<File | undefined>();   // <-- NEW
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showNewModal, setShowNewModal] = useState<boolean>(false);
    const [actionLoading, setActionLoading] = useState<boolean>(false);
    const [imageError, setImageError] = useState<string | null>(null);

    const fetchAllProducts = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        try {
            const result = await dispatch(
                getAllProductsAction({
                    page: currentPage.toString(),
                    limit: '10',
                    includePrintify: 'true'
                })
            ).unwrap();
            setProducts(result.products || []);
            setTotalPages(result.totalPages || 1);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, currentPage]);

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    const handleChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = e.target;
        if (name.startsWith('frequencyInfo.')) {
            const key = name.split('.')[1];
            setForm((prev) => ({
                ...prev,
                frequencyInfo: {
                    ...prev.frequencyInfo,
                    [key]: value,
                },
            }));
        } else if (name.startsWith('additionalDetails.')) {
            const key = name.split('.')[1];
            setForm((prev) => ({
                ...prev,
                additionalDetails: {
                    ...prev.additionalDetails,
                    [key]: value,
                },
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    }, []);

    const handleFileChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const file = e.target.files?.[0];
        if (file) {
            setShowProductImage(URL.createObjectURL(file));
            setProductFile(file);
            setImageError(null);
        }
    }, []);

    const handleFreebieFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file);
        if (file) setFreebieFile(file);
    }, []); // <-- NEW

    const handleSelectChange = useCallback((section: string, value: string): void => {
        if (section.startsWith('frequencyInfo.')) {
            const key = section.split('.')[1];
            setForm((prev) => ({
                ...prev,
                frequencyInfo: {
                    ...prev.frequencyInfo,
                    [key]: value,
                },
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [section]: value,
            }));
            if (section === 'shift') {
                const defaultCategory = categoryOptions
                    .filter((item: CategoryOption) => item.shift === value)[0]?.value ||
                    'abundance-field';
                setForm((prev) => ({
                    ...prev,
                    category: defaultCategory,
                }));
            }
        }
    }, []);

    const handleEdit = useCallback((product: ProductTypes): void => {
        setEditProduct(product);
        setShowProductImage(product.image);
        setForm({
            name: product.name,
            summary: product.summary,
            description: product.description,
            shift: product.shift,
            category: product.category,
            price: product.price || 0,
            isFreebie: product.isFreebie || false,
            frequencyInfo: {
                color: product.frequencyInfo?.color || 'Red',
                size: product.frequencyInfo?.size || 'XS',
                style: product.frequencyInfo?.style || 'Modern',
                fit: product.frequencyInfo?.fit || 'Slim',
            },
            additionalDetails: {
                material: product.additionalDetails?.material || '',
                care: product.additionalDetails?.care || '',
                shippingFormat: product.additionalDetails?.shippingFormat || '',
                returns: product.additionalDetails?.returns || '',
            },
        });
        setShowEditModal(true);
        setImageError(null);
    }, []);

    const handleDelete = useCallback((product: ProductTypes): void => {
        setDeleteProduct(product);
        setShowDeleteModal(true);
    }, []);

    const handleNew = useCallback((): void => {
        setForm(initialForm);
        setShowProductImage('');
        setProductFile(undefined);
        setShowNewModal(true);
        setImageError(null);
    }, []);

    const buildFormData = () => {
        const fd = new FormData();
        if (productFile) fd.append('file', productFile);
        if (form.additionalDetails.shippingFormat === "Digital Product" && freebieFile) fd.append('freebieFile', freebieFile); // <-- NEW
        fd.append('name', form.name);
        fd.append('summary', form.summary);
        fd.append('description', form.description);
        fd.append('shift', form.shift);
        fd.append('category', form.category);
        fd.append('price', form.price.toString());
        fd.append('isFreebie', form.isFreebie.toString());
        fd.append('frequencyInfo', JSON.stringify(form.frequencyInfo));
        fd.append('additionalDetails', JSON.stringify(form.additionalDetails));
        return fd;
    };

    const handleNewSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!showProductImage || !productFile) {
            setImageError('Please upload a product image.');
            return;
        }
        setActionLoading(true);
        try {
            await dispatch(createProductAction(buildFormData())).unwrap();
            setShowNewModal(false);
            fetchAllProducts();
        } finally {
            setActionLoading(false);
        }
    }, [dispatch, buildFormData, fetchAllProducts, showProductImage, productFile]);

    const handleEditSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editProduct) return;
        setActionLoading(true);
        try {
            await dispatch(updateProductAction({ id: editProduct._id, data: buildFormData() })).unwrap();
            setShowEditModal(false);
            fetchAllProducts();
        } finally {
            setActionLoading(false);
        }
    }, [dispatch, editProduct, buildFormData, fetchAllProducts]);

    const handleDeleteConfirm = useCallback(async (): Promise<void> => {
        if (deleteProduct) {
            setActionLoading(true);
            try {
                await dispatch(deleteProductAction({ id: deleteProduct._id })).unwrap();
                setShowDeleteModal(false);
                fetchAllProducts();
            } catch {
                // Handle error silently
            } finally {
                setActionLoading(false);
            }
        }
    }, [dispatch, deleteProduct, fetchAllProducts]);

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
                Product Management
            </h1>
            <div className="flex justify-end mb-4">
                <button
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded font-semibold shadow hover:from-green-600 hover:to-blue-600 transition"
                    onClick={handleNew}
                >
                    + New Product
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
                                    Name
                                </th>
                                <th className="px-4 py-3 border-b font-semibold text-gray-700">
                                    Summary
                                </th>
                                <th className="px-4 py-3 border-b font-semibold text-gray-700">
                                    Shift
                                </th>
                                <th className="px-4 py-3 border-b font-semibold text-gray-700">
                                    Category
                                </th>
                                <th className="px-4 py-3 border-b font-semibold text-gray-700">
                                    Price
                                </th>
                                <th className="px-4 py-3 border-b font-semibold text-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr
                                    key={product._id}
                                    className="text-center transition hover:bg-purple-50"
                                >
                                    <td className="px-4 py-2 border-b">
                                        {product.image && (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-12 h-12 object-cover rounded mx-auto"
                                            />
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border-b font-medium text-gray-900">
                                        {product.name}
                                    </td>
                                    <td className="px-4 py-2 border-b text-gray-700">
                                        {product.summary}
                                    </td>
                                    <td className="px-4 py-2 border-b text-gray-700">
                                        {product.shift}
                                    </td>
                                    <td className="px-4 py-2 border-b text-gray-700">
                                        {product.category}
                                    </td>
                                    <td className="px-4 py-2 border-b text-gray-700">
                                        {product.isFreebie ? (
                                            <span className="font-semibold text-green-600">FREE</span>
                                        ) : (
                                            `$${product.price.toFixed(2)}`
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border-b space-x-2">
                                        <div className='flex justify-center space-x-2'>
                                            <button
                                                className="px-3 py-1 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:scale-105 hover:from-blue-600 hover:to-purple-600 transition disabled:opacity-50"
                                                onClick={() => handleEdit(product)}
                                                disabled={actionLoading}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="px-3 py-1 rounded bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow hover:scale-105 hover:from-red-600 hover:to-pink-600 transition disabled:opacity-50"
                                                onClick={() => handleDelete(product)}
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
            {/* Edit Modal */}
            <ProductModal
                open={showEditModal}
                form={form}
                isLoading={actionLoading}
                onClose={() => setShowEditModal(false)}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                handleFreebieFileChange={handleFreebieFileChange}  // <-- NEW
                freebieFile={freebieFile}                          // <-- NEW
                handleSubmit={handleEditSubmit}
                modalTitle="Edit Product"
                submitLabel="Save"
                imageSrc={showProductImage}
                imageError={imageError}
                handleSelectChange={(section, value) =>
                    setForm(prev => section.startsWith('frequencyInfo.')
                        ? { ...prev, frequencyInfo: { ...prev.frequencyInfo, [section.split('.')[1]]: value } }
                        : { ...prev, [section]: value })
                }
            />

            <ProductModal
                open={showNewModal}
                form={form}
                isLoading={actionLoading}
                onClose={() => setShowNewModal(false)}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                handleFreebieFileChange={handleFreebieFileChange}   // <-- NEW
                freebieFile={freebieFile}                           // <-- NEW
                handleSubmit={handleNewSubmit}
                modalTitle="New Product"
                submitLabel="Create"
                imageSrc={showProductImage}
                imageError={imageError}
                handleSelectChange={(section, value) =>
                    setForm(prev => section.startsWith('frequencyInfo.')
                        ? { ...prev, frequencyInfo: { ...prev.frequencyInfo, [section.split('.')[1]]: value } }
                        : { ...prev, [section]: value })
                }
            />
            {/* Delete Modal */}
            {showDeleteModal && deleteProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-slide-up">
                        <h2 className="text-2xl font-bold mb-4 text-red-600">
                            Confirm Delete
                        </h2>
                        <p className="mb-6 text-gray-700">
                            Are you sure you want to delete{' '}
                            <span className="font-bold">{deleteProduct.name}</span>?
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

export default ProductManagement; 