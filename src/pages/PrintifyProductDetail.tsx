import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MainTitle, SubTitle, Text, Typography } from '../components/ui/Text';
import { LargeFilledButton } from '../components/ui/Buttons';
import { BASE_URL } from '../state/global/api';

interface PrintifyProduct {
    id: string;
    title: string;
    description: string;
    tags: string[];
    variants: Array<{
        id: number;
        sku: string;
        cost: number;
        price: number;
        title: string;
        grams: number;
        is_enabled: boolean;
        is_default: boolean;
        is_available: boolean;
        quantity: number;
    }>;
    images: Array<{
        src: string;
        variant_ids: number[];
        position: string;
        is_default: boolean;
    }>;
    created_at: string;
    updated_at: string;
    visible: boolean;
    blueprint_id: number;
    shop_id: number;
}

const PrintifyProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<PrintifyProduct | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [selectedVariant, setSelectedVariant] = useState<any>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            
            setIsLoading(true);
            setError('');
            
            try {
                const response = await fetch(`${BASE_URL}/api//test/printify/products/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                if (data.data) {
                    setProduct(data.data);
                    // Set default variant
                    // const defaultVariant = data.data.variants.find((v: any) => v.is_default) || data.data.variants[0];
                    const defaultVariant = data.data.variants[0];
                    setSelectedVariant(defaultVariant);
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch product');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const formatPrice = (price: number) => {
        return `$${(price * 2.5 / 100).toFixed(2)}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const handleAddToCart = () => {
        if (selectedVariant) {
            navigate(`/checkout/printify/${id}?variant=${selectedVariant.id}`);
        }
    };

    const handleBackToProducts = () => {
        navigate('/test');
    };

    if (isLoading) {
        return (
            <div className='container flex flex-grow items-center justify-center py-12 md:py-20'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
                <span className='ml-2 text-gray-600'>Loading product...</span>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className='container flex flex-grow items-center justify-center py-12 md:py-20'>
                <div className='text-center'>
                    <Typography className='text-gray-500 mb-4'>
                        {error || 'Product not found'}
                    </Typography>
                    <button
                        onClick={handleBackToProducts}
                        className='bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors'
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className='bg-[#F9F4EE] py-12 relative'>
                <div className='container text-center w-full'>
                    <div className='relative flex justify-center w-80 sm:w-96 md:w-150 mx-auto'>
                        {product.images.length > 0 ? (
                            <img
                                src={product.images[0].src}
                                alt={product.title}
                                width='w-full'
                            />
                        ) : (
                            <div className='bg-gray-200 rounded-lg h-96 flex items-center justify-center w-full'>
                                <span className='text-gray-500'>No image available</span>
                            </div>
                        )}
                    </div>
                    <p className='text-2xl font-medium'>
                        Everything holds frequency. This one is tuned to yours.
                    </p>
                    <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2'>
                        <LargeFilledButton 
                            onClick={handleAddToCart}
                            disabled={!selectedVariant || selectedVariant.quantity === 0}
                        >
                            {selectedVariant && selectedVariant.quantity > 0
                                ? `Add to Cart - ${formatPrice(selectedVariant.cost)}`
                                : 'Out of Stock'
                            }
                        </LargeFilledButton>
                    </div>
                </div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container pt-12 md:pt-24 pb-6 md:pb-12 text-center'
            >
                <SubTitle className='mb-6 md:mb-12'>
                    Product Description
                </SubTitle>
                <div 
                    className='text-center prose prose-lg max-w-3xl mx-auto'
                    dangerouslySetInnerHTML={{ __html: product.description }}
                />
            </motion.div>

            {/* <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container py-6 md:py-12 text-center'
            >
                <SubTitle className='mb-6 md:mb-12'>
                    Product Options
                </SubTitle> 
                <table className='bg-[#DED6C0] w-full max-w-4xl mx-auto border-t border-b border-[#8B8678]'>
                    <tbody>
                        {product.variants.map((variant, index) => (
                            <tr key={variant.id} className={`text-left border-b ${index === product.variants.length - 1 ? '' : 'border-[#8B8678]'}`}>
                                <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                    {variant.title}:
                                </td>
                                <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                    {formatPrice(variant.price)} | Weight: {variant.grams}g
                                    {variant.quantity > 0 ? (
                                        <span className='text-green-600 ml-2'>In Stock ({variant.quantity})</span>
                                    ) : (
                                        <span className='text-red-600 ml-2'>Out of Stock</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div> */}

            {/* {product.tags.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='container py-6 md:py-12 text-center'
                >
                    <SubTitle className='mb-6 md:mb-12'>
                        Product Tags
                    </SubTitle> 
                    <div className='flex flex-wrap gap-2 justify-center'>
                        {product.tags.map((tag, index) => (
                            <span
                                key={index}
                                className='bg-[#DED6C0] text-black px-4 py-2 rounded-full text-lg font-medium border border-[#8B8678]'
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            )} */}

            {/* <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container py-6 md:py-12 text-center'
            >
                <SubTitle className='mb-6 md:mb-12'>
                    Product Information
                </SubTitle> 
                <table className='bg-[#DED6C0] w-full max-w-4xl mx-auto border-t border-b border-[#8B8678]'>
                    <tbody>
                        <tr className='text-left border-b border-[#8B8678]'>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                Product ID:
                            </td>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                {product.id}
                            </td>
                        </tr>
                        <tr className='text-left border-b border-[#8B8678]'>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                Blueprint ID:
                            </td>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                {product.blueprint_id}
                            </td>
                        </tr>
                        <tr className='text-left border-b border-[#8B8678]'>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                Shop ID:
                            </td>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                {product.shop_id}
                            </td>
                        </tr>
                        <tr className='text-left border-b border-[#8B8678]'>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                Created:
                            </td>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                {formatDate(product.created_at)}
                            </td>
                        </tr>
                        <tr className='text-left border-b border-[#8B8678]'>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                Updated:
                            </td>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                {formatDate(product.updated_at)}
                            </td>
                        </tr>
                        <tr className='text-left'>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                Status:
                            </td>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                {product.visible ? 'Visible' : 'Hidden'}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </motion.div> */}

            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container py-6 md:py-12 text-center'
            >
                <button
                    onClick={handleBackToProducts}
                    className='bg-[#DED6C0] text-black py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors border border-[#8B8678] font-medium'
                >
                    ← Back to Products
                </button>
            </motion.div>
        </>
    );
};

export default PrintifyProductDetail; 