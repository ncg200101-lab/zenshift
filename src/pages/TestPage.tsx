import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MainTitle, SubTitle, Text } from '../components/ui/Text';
import ExplosionEffect from '../components/ui/ExplosionEffect';
import { BASE_URL } from '../state/global/api';

interface PrintifyProduct {
    id: string;
    printifyId: string;
    title: string;
    description: string;
    tags: string[];
    price: number;
    image: string;
    shift: string;
    category: string;
    isFreebie: boolean;
    visible: boolean;
}

interface PrintifyResponse {
    current_page: number;
    data: PrintifyProduct[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

const TestPage = () => {
    const [products, setProducts] = useState<PrintifyProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [paginationInfo, setPaginationInfo] = useState<PrintifyResponse | null>(null);
    const navigate = useNavigate();

    const fetchPrintifyProducts = async (page: number = 1, limit: number = 12) => {
        setIsLoading(true);
        setError('');
        
        try {
            const response = await fetch(`${BASE_URL}/api//printify/active?page=${page}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Local Printify Products Response:', data);
            setProducts(data.products || []);
            setCurrentPage(data.page || 1);
            setTotalPages(data.totalPages || 1);
            setTotalProducts(data.total || 0);
            // Create a mock pagination info for compatibility
            setPaginationInfo({
                current_page: data.page || 1,
                data: data.products || [],
                first_page_url: '',
                from: ((data.page || 1) - 1) * limit + 1,
                last_page: data.totalPages || 1,
                last_page_url: '',
                next_page_url: data.page < data.totalPages ? 'next' : null,
                path: '',
                per_page: limit,
                prev_page_url: data.page > 1 ? 'prev' : null,
                to: Math.min((data.page || 1) * limit, data.total || 0),
                total: data.total || 0
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
        } finally {
            setIsLoading(false);
        }
    };

    // Load products on page load
    useEffect(() => {
        fetchPrintifyProducts(1, 12);
    }, []); // Empty dependency array to run only once

    const handlePageChange = (page: number) => {
        if (page === currentPage) return; // Prevent unnecessary API calls
        setCurrentPage(page);
        fetchPrintifyProducts(page, 12);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchPrintifyProducts(nextPage, 12);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1;
            setCurrentPage(prevPage);
            fetchPrintifyProducts(prevPage, 12);
        }
    };

    const formatPrice = (price: number) => {
        return `$${price.toFixed(2)}`;
    };

    const handleProductClick = (productId: string) => {
        navigate(`/printify-product/${productId}`);
    };

    const handleAddToCart = (product: PrintifyProduct) => {
        // Navigate to checkout with product ID (variant will be selected on detail page)
        navigate(`/checkout/printify/${product.id}`);
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        return (
            <div className="flex items-center justify-center mt-8">
                <nav className="flex items-center space-x-1" aria-label="Pagination">
                    {/* Previous button */}
                    {currentPage > 1 && (
                        <button
                            onClick={handlePrevPage}
                            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
                        >
                            Previous
                        </button>
                    )}
                    
                    {/* Page info */}
                    <div className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300">
                        Page {currentPage} of {totalPages}
                    </div>
                    
                    {/* Next button */}
                    {currentPage < totalPages && (
                        <button
                            onClick={handleNextPage}
                            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
                        >
                            Next
                        </button>
                    )}
                </nav>
            </div>
        );
    };

    return (
        <div className='container pt-18 md:pt-36 pb-12 text-center'>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='mb-8'
            >
                <MainTitle>Printify Products</MainTitle>
                <Text className='mb-6'>Browse our collection of Printify products</Text>
            </motion.div>

            {/* Error Display */}
            {error && (
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6'>
                    {error}
                </div>
            )}

            {/* Products Display */}
            {products.length > 0 && (
                <div className='mb-8'>
                    <div className='flex justify-between items-center mb-6'>
                        <SubTitle>Products ({totalProducts} total)</SubTitle>
                        {paginationInfo && (
                            <div className='text-sm text-gray-600'>
                                Showing {paginationInfo.from}-{paginationInfo.to} of {paginationInfo.total} products
                            </div>
                        )}
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {products.map((product) => {
                            const price = formatPrice(product.price);
                            
                            return (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.6 }}
                                    className='relative bg-[#18051B] rounded-xl overflow-hidden shadow-lg w-full max-w-xs mx-auto hover:shadow-[0_0_20px_rgba(255,230,77,0.4)] group'
                                >
                                    <ExplosionEffect dotQuantity={60} explosionRadius={500} speed={0.8}>
                                        <div className='relative p-4'>
                                            <img 
                                                src={product.image || '/placeholder-image.jpg'} 
                                                alt={product.title} 
                                                className='bg-white w-full h-full object-cover rounded-lg' 
                                            />
                                            {product.visible && (
                                                <span className='absolute top-[15px] right-[15px] bg-black text-[#FFE600] text-xs font-bold px-2 py-1 rounded-full rounded-r-none rounded-t-none flex items-center'>
                                                    ⭐ Active
                                                </span>
                                            )}
                                        </div>
                                        <div className='p-4 pb-8 text-center'>
                                            <h3 className='text-white text-start text-lg font-bold mb-1'>{product.title}</h3>
                                            <p className='text-white text-start mb-1 line-clamp-2'>{product.description.replace(/<[^>]*>/g, '')}</p>
                                            <div className='flex items-center justify-between mb-3'>
                                                <h4 className='text-white text-start text-lg font-bold'>
                                                    {product.isFreebie ? 'FREE' : price}
                                                </h4>
                                            </div>
                                            <div className='flex items-center justify-between gap-2'>
                                                <button 
                                                    onClick={() => handleProductClick(product.id)}
                                                    className='bg-[#FFE600] text-black py-2 px-4 rounded-full font-bold transition-all duration-300 hover:bg-opacity-90 hover:shadow-[0_0_10px_rgba(255,230,77,0.5)] flex-1'
                                                >
                                                    View Details
                                                </button>
                                                <button 
                                                    onClick={() => handleAddToCart(product)}
                                                    className='bg-[#A823F9] text-white py-2 px-4 rounded-full font-bold transition-all duration-300 hover:bg-opacity-90 hover:shadow-[0_0_10px_rgba(255,230,77,0.5)] flex-1'
                                                >
                                                    Add To Cart
                                                </button>
                                            </div>
                                        </div>
                                    </ExplosionEffect>
                                </motion.div>
                            );
                        })}
                    </div>
                    
                    {/* Pagination */}
                    {renderPagination()}
                </div>
            )}

            {/* Loading State */}
            {isLoading && (
                <div className='flex items-center justify-center py-8'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
                    <span className='ml-2 text-gray-600'>Loading products...</span>
                </div>
            )}

            {/* No Products State */}
            {!isLoading && products.length === 0 && !error && (
                <div className='text-center py-12'>
                    <div className='text-gray-500 text-lg'>No products found</div>
                </div>
            )}
        </div>
    );
};

export default TestPage; 