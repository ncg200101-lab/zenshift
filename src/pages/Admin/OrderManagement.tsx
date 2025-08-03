import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch } from '../../state/hooks';
import { getAllOrdersAction } from '../../state/orders/actions';
import { Order } from '../../state/orders/types';
import { formatDate } from '../../utils/dateUtils';

const OrderManagement = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1); 

    const fetchAllOrders = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await dispatch(
                getAllOrdersAction({
                    page: currentPage.toString(),
                    limit: '10',
                })
            ).unwrap();
            setOrders(result.orders || []);
            setTotalPages(result.totalPages || 1);
        } catch(e) {
            console.error(e);
        }
        finally {
            setIsLoading(false);
        }
    }, [dispatch, currentPage]);

    useEffect(() => {
        fetchAllOrders();
    }, [fetchAllOrders]);

  return (
    <>
      <h1 className="text-3xl font-extrabold text-center mb-8 text-purple-700 tracking-tight drop-shadow">Order Management</h1>
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <svg className="animate-spin h-8 w-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gradient-to-r from-purple-100 to-blue-100">
                  <th className="px-4 py-3 border-b font-semibold text-gray-700">Id</th>
                  <th className="px-4 py-3 border-b font-semibold text-gray-700">User</th>
                  <th className="px-4 py-3 border-b font-semibold text-gray-700">Product</th>
                  <th className="px-4 py-3 border-b font-semibold text-gray-700">Total</th>
                  <th className="px-4 py-3 border-b font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 border-b font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="text-center transition hover:bg-purple-50"
                  >
                    <td className="px-4 py-2 border-b">
                        {order._id}
                    </td>
                    <td className="px-4 py-2 border-b font-medium text-gray-900">{order.user?.name || ''}</td>
                    <td className="px-4 py-2 border-b text-gray-700">{order.product?.name || ''}</td>
                    <td className="px-4 py-2 border-b text-gray-700">{order.total}</td>
                    <td className="px-4 py-2 border-b text-gray-700">{order.status}</td>
                    <td className="px-4 py-2 border-b text-gray-700 whitespace-nowrap">{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-6 space-x-2">
                <button
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 font-semibold"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <span className="mx-2 text-gray-700 font-medium">
                  {currentPage} / {totalPages}
                </span>
                <button
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 font-semibold"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
    </>
  );
};

export default OrderManagement;
