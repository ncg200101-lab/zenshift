import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { MainTitle, SubTitle, Typography, Text } from '../components/ui/Text';
import { FullWidthButton } from '../components/ui/Buttons';
import SpinLoader from '../components/ui/SpinLoader';
import { BASE_URL } from '../state/global/api';

interface PrintifyProduct {
    id: string;
    title: string;
    description: string;
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
}

const PrintifyCheckout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const variantId = searchParams.get('variant');

    const [product, setProduct] = useState<PrintifyProduct | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US',
        message: ''
    });

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
                    
                    // Set selected variant
                    let variant;
                    if (variantId) {
                        variant = data.data.variants.find((v: any) => v.id.toString() === variantId);
                    }
                    if (!variant) {
                        variant = data.data.variants.find((v: any) => v.is_default) || data.data.variants[0];
                    }
                    setSelectedVariant(variant);
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
    }, [id, variantId]);

    const formatPrice = (price: number) => {
        return `$${(price / 100).toFixed(2)}`;
    };

    const handleQuantityChange = (change: number) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= (selectedVariant?.quantity || 1)) {
            setQuantity(newQuantity);
        }
    };

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting || !product || !selectedVariant) return;

        try {
            setIsSubmitting(true);
            setError('');

            // Prepare order data for Printify
            const orderData = {
                external_id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                label: `Order ${Date.now()}`,
                line_items: [
                    {
                        product_id: product.id,
                        variant_id: selectedVariant.id,
                        quantity: quantity
                    }
                ],
                shipping_method: 1,
                is_printify_express: false,
                is_economy_shipping: false,
                send_shipping_notification: false,
                address_to: {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    country: formData.country,
                    region: formData.state,
                    address1: formData.address1,
                    address2: formData.address2,
                    city: formData.city,
                    zip: formData.zipCode
                }
            };

            console.log('Submitting Printify order:', orderData);

            const response = await fetch('/api/test/printify/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Printify order created:', result);

            // Navigate to success page
            navigate(`/thanks/printify/${result.data.id || 'success'}`);

        } catch (err) {
            console.error('Order creation error:', err);
            setError(err instanceof Error ? err.message : 'Failed to create order');
        } finally {
            setIsSubmitting(false);
        }
    }, [isSubmitting, product, selectedVariant, quantity, formData, navigate]);

    if (isLoading) {
        return (
            <div className='container flex flex-grow items-center justify-center py-12 md:py-20'>
                <SpinLoader size={50} />
            </div>
        );
    }

    if (error || !product || !selectedVariant) {
        return (
            <div className='container flex flex-grow items-center justify-center py-12 md:py-20'>
                <div className='text-center'>
                    <Typography className='text-gray-500 mb-4'>
                        {error || 'Product not found'}
                    </Typography>
                    <button
                        onClick={() => navigate('/test')}
                        className='bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors'
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    const totalPrice = (selectedVariant.price * quantity) / 100;

    return (
        <div className='container pt-12 md:pt-24 pb-12'>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='mb-6 md:mb-12 text-center'
            >
                <MainTitle>Complete Your Printify Order</MainTitle>
                <Text className='mb-12'>
                    Let's get your custom product delivered to your door.
                </Text>
            </motion.div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto'>
                {/* Order Summary */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className='bg-[#E8E0CB] rounded-xl shadow-md p-6'
                >
                    <SubTitle className='mb-4'>Order Summary</SubTitle>
                    
                    <div className='flex items-center space-x-4 mb-6'>
                        <img
                            src={product.images[0]?.src}
                            alt={product.title}
                            className='w-20 h-20 object-cover rounded-lg'
                        />
                        <div className='flex-1'>
                            <h3 className='font-semibold text-lg'>{product.title}</h3>
                            <p className='text-gray-600'>{selectedVariant.title}</p>
                        </div>
                    </div>

                    <div className='space-y-3 mb-6'>
                        <div className='flex justify-between items-center'>
                            <span>Price per item:</span>
                            <span className='font-semibold'>{formatPrice(selectedVariant.price)}</span>
                        </div>
                        
                        <div className='flex justify-between items-center'>
                            <span>Quantity:</span>
                            <div className='flex items-center space-x-2'>
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className='w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100'
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span className='w-12 text-center'>{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className='w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100'
                                    disabled={quantity >= selectedVariant.quantity}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        
                        <div className='border-t pt-3'>
                            <div className='flex justify-between items-center text-lg font-bold'>
                                <span>Total:</span>
                                <span className='text-green-600'>${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className='text-sm text-gray-600'>
                        <p>• Custom printed product</p>
                        <p>• Standard shipping included</p>
                        <p>• Production time: 3-5 business days</p>
                    </div>
                </motion.div>

                {/* Checkout Form */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Error Display */}
                        {error && (
                            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
                                {error}
                            </div>
                        )}

                        {/* Contact Information */}
                        <div>
                            <SubTitle className='mb-4'>Contact Information</SubTitle>
                            <div className='space-y-4'>
                                <input
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder='Email Address'
                                    className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    required
                                />
                                <input
                                    type='tel'
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder='Phone Number'
                                    className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    required
                                />
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div>
                            <SubTitle className='mb-4'>Shipping Address</SubTitle>
                            <div className='space-y-4'>
                                <div className='grid grid-cols-2 gap-4'>
                                    <input
                                        type='text'
                                        name='firstName'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder='First Name'
                                        className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        required
                                    />
                                    <input
                                        type='text'
                                        name='lastName'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder='Last Name'
                                        className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        required
                                    />
                                </div>
                                
                                <select
                                    name='country'
                                    value={formData.country}
                                    onChange={handleChange}
                                    className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    required
                                >
                                    <option value=''>Select Country</option>
                                    <option value='US'>United States</option>
                                    <option value='CA'>Canada</option>
                                    <option value='GB'>United Kingdom</option>
                                    <option value='AU'>Australia</option>
                                    <option value='DE'>Germany</option>
                                    <option value='FR'>France</option>
                                </select>
                                
                                <input
                                    type='text'
                                    name='address1'
                                    value={formData.address1}
                                    onChange={handleChange}
                                    placeholder='Street Address'
                                    className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    required
                                />
                                
                                <input
                                    type='text'
                                    name='address2'
                                    value={formData.address2}
                                    onChange={handleChange}
                                    placeholder='Apartment, suite, etc. (optional)'
                                    className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                                
                                <div className='grid grid-cols-3 gap-4'>
                                    <input
                                        type='text'
                                        name='city'
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder='City'
                                        className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        required
                                    />
                                    <input
                                        type='text'
                                        name='state'
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder='State'
                                        className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        required
                                    />
                                    <input
                                        type='text'
                                        name='zipCode'
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        placeholder='ZIP Code'
                                        className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Notes */}
                        <div>
                            <SubTitle className='mb-4'>Additional Notes (Optional)</SubTitle>
                            <textarea
                                name='message'
                                value={formData.message}
                                onChange={handleChange}
                                rows={3}
                                placeholder='Any special instructions or notes for your order...'
                                className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.6 }}
                        >
                            <FullWidthButton
                                type='submit'
                                disabled={isSubmitting}
                                className='w-full'
                            >
                                {isSubmitting ? 'Creating Order...' : `Place Order - $${totalPrice.toFixed(2)}`}
                            </FullWidthButton>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default PrintifyCheckout;
