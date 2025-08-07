import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CategorySelect,
  CategoryOption,
  categoryOptions,
} from "../../components/ui/Select/CategorySelect";
import { ShiftTypes, CategoryTypes } from "../../state/product/types";
import RichTextDisplay from "../../components/ui/RichTextDisplay";
import RichTextEditor from "../../components/ui/RichTextEditor";
import { BASE_URL } from "../../state/global/api";

interface PrintifyProduct {
  _id: string;
  printifyId: string;
  title: string;
  description: string;
  tags: string[];
  firstCost: number;
  firstPrice: number;
  firstImage: string | null;
  blueprint_id: number;
  shop_id: number;
  visible: boolean;
  name: string;
  summary: string;
  price: number;
  image: string;
  shift: string;
  category: string;
  isFreebie: boolean;
  isActive: boolean;
  customPrice?: number;
  customDescription?: string;
  customImage?: string;
  createdAt: string;
  updatedAt: string;
}

interface SyncStats {
  total: number;
  created: number;
  updated: number;
  errors: number;
}

interface EditProductFormProps {
  product: PrintifyProduct;
  onUpdate: (updatedProduct: Partial<PrintifyProduct>) => void;
  onCancel: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  onUpdate,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: product.name,
    summary: product.summary,
    description: product.description,
    price: product.price,
    customPrice: product.customPrice || "",
    customDescription: product.customDescription || "",
    customImage: product.customImage || "",
    shift: product.shift,
    category: product.category,
    isActive: product.isActive,
    isFreebie: product.isFreebie,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      customPrice: formData.customPrice
        ? parseFloat(formData.customPrice.toString())
        : undefined,
    };
    onUpdate(updatedData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      };

      // Auto-update category when shift changes
      if (name === "shift") {
        const defaultCategory =
          categoryOptions.filter(
            (item: CategoryOption) => item.shift === value
          )[0]?.value || "abundance-field";
        newData.category = defaultCategory;
      }

      return newData;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Price (Override)
          </label>
          <input
            type="number"
            step="0.01"
            name="customPrice"
            value={formData.customPrice}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Leave empty to use default price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shift
          </label>
          <select
            name="shift"
            value={formData.shift}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Abundance">Abundance</option>
            <option value="Apothecary">Apothecary</option>
            <option value="Interior">Interior</option>
            <option value="Health">Health</option>
            <option value="Kids">Kids</option>
            <option value="Masters">Masters</option>
            <option value="Travels">Travels</option>
            <option value="Academy">Academy</option>
            <option value="Collectives">Collectives</option>
            <option value="Golf">Golf</option>
            <option value="ZenShift">ZenShift</option>
            <option value="ZenAI">ZenAI</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <CategorySelect
            selectedShift={formData.shift as ShiftTypes}
            selectedValue={formData.category as CategoryTypes}
            onChange={(value: string) => {
              setFormData((prev) => ({
                ...prev,
                category: value,
              }));
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Image URL
          </label>
          <input
            type="url"
            name="customImage"
            value={formData.customImage}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Override default image"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Summary
        </label>
        <div></div>
        <RichTextDisplay content={formData.summary} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <RichTextDisplay content={formData.description} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Custom Description (Override)
        </label>
        <RichTextDisplay content={formData.customDescription} />
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-sm font-medium text-gray-700">Active</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            name="isFreebie"
            checked={formData.isFreebie}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-sm font-medium text-gray-700">
            Free Product
          </span>
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Update Product
        </button>
      </div>
    </form>
  );
};

const PrintifyManagement = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [products, setProducts] = useState<PrintifyProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [syncStats, setSyncStats] = useState<SyncStats | null>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<PrintifyProduct | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const fetchPrintifyProducts = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/api//printify?page=${currentPage}&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
      setTotalProducts(data.total || 0);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch Printify products"
      );
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchPrintifyProducts();
  }, [fetchPrintifyProducts]);

  const handleSyncProducts = async () => {
    setIsSyncing(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/printify/sync", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      setSyncStats(data.stats);
      setSuccess(data.message);
      // Refresh the products list
      await fetchPrintifyProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sync products");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleToggleActive = async (productId: string, isActive: boolean) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api//printify/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product");
      }

      // Update local state
      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? { ...p, isActive } : p))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update product");
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api//printify/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product");
      }

      // Remove from local state
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      setTotalProducts((prev) => prev - 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
    }
  };

  const handleEditProduct = (product: PrintifyProduct) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditingProduct(null);
    setIsEditModalOpen(false);
  };

  const handleUpdateProduct = async (
    updatedProduct: Partial<PrintifyProduct>
  ) => {
    if (!editingProduct) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/api//printify/${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product");
      }

      setSuccess("Product updated successfully");
      setError("");
      handleCloseEditModal();
      fetchPrintifyProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update product");
      setSuccess("");
    }
  };

  const handlePrevPage = useCallback((): void => {
    setCurrentPage((p) => Math.max(1, p - 1));
  }, []);

  const handleNextPage = useCallback((): void => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  }, [totalPages]);

  const formatPrice = (cost: number) => {
    return `$${cost.toFixed(2)}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-extrabold text-center mb-8 text-purple-700 tracking-tight drop-shadow">
          Printify Product Management
        </h1>

        {/* Sync Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Sync Products
            </h2>
            <button
              onClick={handleSyncProducts}
              disabled={isSyncing}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSyncing ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Syncing...
                </div>
              ) : (
                "🔄 Sync from Printify"
              )}
            </button>
          </div>

          {syncStats && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-green-800 mb-2">
                Sync Results:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium">Total Processed:</span>
                  <span className="ml-2 text-green-600">{syncStats.total}</span>
                </div>
                <div>
                  <span className="font-medium">Created:</span>
                  <span className="ml-2 text-green-600">
                    {syncStats.created}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Updated:</span>
                  <span className="ml-2 text-blue-600">
                    {syncStats.updated}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Errors:</span>
                  <span className="ml-2 text-red-600">{syncStats.errors}</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-purple-100 to-blue-100 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Products ({totalProducts} total)
              </h2>
            </div>
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
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.summary}
                        </div>
                        <div className="text-xs text-gray-400">
                          Printify ID: {product.printifyId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatPrice(product.price)}
                        </div>
                        {product.customPrice && (
                          <div className="text-xs text-blue-600">
                            Custom: {formatPrice(product.customPrice)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              product.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {product.isActive ? "Active" : "Inactive"}
                          </span>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              product.visible
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.visible
                              ? "Visible on Printify"
                              : "Hidden on Printify"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="px-3 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs font-semibold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleToggleActive(product._id, !product.isActive)
                            }
                            className={`px-3 py-1 rounded text-xs font-semibold ${
                              product.isActive
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                : "bg-green-100 text-green-800 hover:bg-green-200"
                            }`}
                          >
                            {product.isActive ? "Deactivate" : "Activate"}
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="px-3 py-1 rounded bg-red-100 text-red-800 hover:bg-red-200 text-xs font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center py-4 bg-gray-50">
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 font-semibold disabled:opacity-50"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="mx-4 text-gray-700 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 font-semibold disabled:opacity-50"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Edit Modal */}
      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Product</h3>
              <button
                onClick={handleCloseEditModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <EditProductForm
              product={editingProduct}
              onUpdate={handleUpdateProduct}
              onCancel={handleCloseEditModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintifyManagement;
