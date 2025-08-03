import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe  } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useAppDispatch } from '../state/hooks';
import { getProductByIdAction } from '../state/product/actions';
import { ProductTypes } from '../state/product/types';
import { FullWidthButton } from '../components/ui/Buttons';
import ExplosionEffect from '../components/ui/ExplosionEffect';
import { MainTitle, SubTitle, Typography, Text } from '../components/ui/Text';
import SpinLoader from '../components/ui/SpinLoader';

const stripePromise = loadStripe(`pk_test_51JY90jITPrbxGSMcuo8bhxqQhCbSvHghLQaYIxtqVSe9u2xxm80SDtIVQ9acsLTW4WyPJX5G0nIMxaLXwtXbsN0N00vkBYmYDU`);

const Checkout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const options = {
        appearance: {
            theme: 'stripe'
        }
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currectProduct, setCurrentProduct] = useState<ProductTypes | undefined>();
    const [count, setCount] = useState<number>(1);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        saveForFuture: false,
        saveForFuturePayment: false,
        message: '',
        country: '',
        creditCard: 'credit-card'
    });

    const handleCountChange = useCallback((num: number) => () => {
        setCount(prev => {
            const newCount = prev + num;
            return newCount < 1 ? prev : newCount;
        });
    }, []);

    const handleResetCount = useCallback(() => {
        setCount(0);
    }, []);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (event.target as HTMLInputElement).checked : value,
        }));
    }, []);

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLoading) return;

        try {
            setIsLoading(true);
            navigate(`/thanks/${id}`)
        } catch(e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, id, navigate]);

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                setIsLoading(true);
                try {
                    const product = await dispatch(getProductByIdAction(id)).unwrap();
                    setCurrentProduct(product);
                } catch(e) {
                    console.error(e);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchProduct();
    }, [dispatch, id]);

    if (isLoading) {
        return (
            <SpinLoader className='flex-grow' size={50} />
        );
    }

    if (!currectProduct) {
        return (
            <div className='container flex flex-grow items-center justify-center py-12 md:py-20'>
                <Typography className='text-gray-500'>
                    Product not found
                </Typography>
            </div>
        );
    }

    return (
        <Elements
            options={options as any}
            stripe={stripePromise}
        >
            <div className='container pt-12 md:pt-24 pb-12 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='mb-6 md:mb-12'
                >
                    <MainTitle>
                        Complete Your Shift
                    </MainTitle>
                </motion.div>
                <Text className='mb-12'>
                    Everything in your cart is energetically attuned. Let's bring it into your field.
                </Text>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='relative bg-[#E8E0CB] rounded-xl shadow-md p-6 w-full max-w-2xl mx-auto mb-8'
                >
                    <div className='flex flex-col md:flex-row items-center md:space-x-6 space-y-6 mb-4 mt-8'>
                        <img
                            src={currectProduct?.image}
                            alt={currectProduct?.name || ''}
                            className='w-2/3 md:w-1/3 object-contain rounded-lg p-2'
                        />
                        <div className='flex-grow'>
                            <h2 className='text-2xl text-left font-bold text-[#362925] font-inter mb-1'>
                                {currectProduct?.name || ''}
                            </h2>
                            <p className='text-xl text-left font-inter text-[#362925]'>
                                ${currectProduct?.price?.toFixed(2) || 0}
                            </p>
                            <div className='flex items-center m-2'>
                                <button
                                    className='border border-black px-3 py-1 rounded-l-md text-[#362925] hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-[#763AF5]'
                                    onClick={handleCountChange(-1)}
                                >
                                    -
                                </button>
                                <div className='w-12 text-center border-y border-black py-1 mx-0'>
                                    {count}
                                </div>
                                <button
                                    className='border border-black px-3 py-1 rounded-r-md text-[#362925] hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-[#763AF5]'
                                    onClick={handleCountChange(1)}
                                >
                                    +
                                </button>
                                <button
                                    className='text-black text-sm ml-auto'
                                    onClick={handleResetCount}
                                >
                                    Remove
                                </button>
                            </div>
                            <div className='border-t border-gray-300 pt-4 flex justify-between font-inter items-center'>
                                <span className='text-black text-lg'>
                                    SubTotal
                                </span>
                                <span className='font-bold text-lg text-[#362925]'>
                                    ${currectProduct?.price?.toFixed(2) || 0}
                                </span>
                            </div>
                            <p className='text-sm font-lato text-left text-gray-500 mt-1'>
                                You're not just buying. You're shifting.
                            </p>
                            <div>
                            </div>
                            <div className='flex flex-col md:flex-row justify-between mt-6 space-y-4 md:space-y-0 md:space-x-4'>
                                <ExplosionEffect className='flex-1 w-full'>
                                    <button className='w-full cursor-pointer border-2 border-[#FF752B] text-[#FF752B] py-3 rounded-xl font-semibold hover:bg-[#FF752B] hover:text-white transition-colors'>
                                        Keep Exploring
                                    </button>
                                </ExplosionEffect>
                                <ExplosionEffect className='flex-1 w-full'>
                                    <button className='w-full cursor-pointer bg-[#FF752B] text-white py-3 rounded-xl font-semibold hover:bg-[#D4713E] transition-colors'>
                                        I'm Ready to Receive
                                    </button>
                                </ExplosionEffect>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <form className='w-full max-w-2xl mx-auto' onSubmit={handleSubmit}>
                    <SubTitle className='text-left'>
                        Where Should We Send This?
                    </SubTitle>
                    <p className='text-sm font-lato text-gray-500 my-4 text-start'>
                        We'll never spam - only updates that support your shift.
                    </p>
                    <div className='w-full max-w-2xl mb-6 md:mb-8'>
                        <label htmlFor='email' className='sr-only'>Email Address</label>
                        <input 
                            type='email' 
                            id='email' 
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Email Address' 
                            className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent'
                            required
                        />
                    </div>
                    <div className='h-[3px] bg-gradient-to-r from-[#F15D0D24] to-[#FF752B]'></div>

                    <SubTitle className='text-left mt-6'>
                        Delivery
                    </SubTitle>
                    <div className='w-full max-w-2xl my-6 md:my-8'>
                        <div className='space-y-4'>
                            <div>
                                <label htmlFor='country' className='sr-only'>Country / Region</label>
                                <select
                                    id='country'
                                    name='country'
                                    value={formData.country}
                                    onChange={handleChange}
                                    className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent'
                                    required
                                >
                                    <option value=''>Country / Region</option>
                                    <option value='USA'>United States</option>
                                    <option value='CAN'>Canada</option>
                                    <option value='GBR'>United Kingdom</option>
                                </select>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor='firstName' className='sr-only'>First Name</label>
                                    <input
                                        type='text'
                                        id='firstName'
                                        name='firstName'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder='First Name'
                                        className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent'
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor='lastName' className='sr-only'>Last Name</label>
                                    <input
                                        type='text'
                                        id='lastName'
                                        name='lastName'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder='Last Name'
                                        className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent'
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor='address' className='sr-only'>Address</label>
                                <input
                                    type='text'
                                    id='address'
                                    name='address'
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder='Address'
                                    className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent'
                                    required
                                />
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor='city' className='sr-only'>City</label>
                                    <input
                                        type='text'
                                        id='city'
                                        name='city'
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder='City'
                                        className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent'
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor='zipCode' className='sr-only'>Postal Code</label>
                                    <input
                                        type='text'
                                        id='zipCode'
                                        name='zipCode'
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        placeholder='Postal Code'
                                        className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent'
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex items-center mt-4'>
                                <input
                                    type='checkbox'
                                    id='saveForFuture'
                                    name='saveForFuture'
                                    checked={formData.saveForFuture}
                                    onChange={handleChange}
                                    className='bg-white h-4 w-4 text-[#763AF5] focus:ring-[#763AF5] border-gray-300 rounded'
                                />
                                <label htmlFor='saveForFuture' className='ml-2 block text-sm text-gray-900'>
                                    Save For Future Shifts?
                                </label>
                            </div>
                        </div>
                    </div>
                    <Typography className='text-left mb-6'>
                        Want to Share anything with the zenShift team?
                    </Typography>
                    <div className='w-full max-w-2xl'>
                        <div>
                            <label htmlFor='message' className='sr-only'>Message</label>
                            <textarea
                                id='message'
                                name='message'
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                placeholder="I trust what's arriving is exactly what I need."
                                className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent'
                            ></textarea>
                        </div>
                    </div>

                    <SubTitle className='text-left my-6'>
                        Payment
                    </SubTitle>
                    <div className='w-full max-w-2xl'>
                        <div className='space-y-4'>
                            <div>
                                <label htmlFor='creditCard' className='sr-only'>Credit Card</label>
                                <select
                                    id='creditCard'
                                    name='creditCard'
                                    value={formData.creditCard}
                                    onChange={handleChange}
                                    className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent'
                                    required
                                >
                                    <option value='credit-card'>Credit Card</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor='cardNumber' className='sr-only'>Card Number</label>
                                <input
                                    type='text'
                                    id='cardNumber'
                                    name='cardNumber'
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                    placeholder='Card Number'
                                    className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent'
                                    required
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor='expiryDate' className='sr-only'>Expiration Date</label>
                                    <input
                                        type='date'
                                        id='expiryDate'
                                        name='expiryDate'
                                        value={formData.expiryDate}
                                        onChange={handleChange}
                                        placeholder='Expiration Date'
                                        className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent'
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor='cvv' className='sr-only'>Security Code</label>
                                    <input
                                        type='text'
                                        id='cvv'
                                        name='cvv'
                                        value={formData.cvv}
                                        onChange={handleChange}
                                        placeholder='Security Code'
                                        className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent'
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor='nameOnCard' className='sr-only'>Name on Energy Exchange</label>
                                <input
                                    type='text'
                                    id='nameOnCard'
                                    name='nameOnCard'
                                    placeholder='Name on Energy Exchange'
                                    className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent'
                                    required
                                />
                            </div>
                            <div className='flex items-center'>
                                <input
                                    type='checkbox'
                                    id='saveForFuturePayment'
                                    name='saveForFuturePayment'
                                    checked={formData.saveForFuturePayment}
                                    onChange={handleChange}
                                    className='bg-white h-4 w-4 text-[#763AF5] focus:ring-[#763AF5] border-gray-300 rounded'
                                />
                                <label
                                    htmlFor='saveForFuturePayment'
                                    className='ml-2 block text-sm text-gray-900'
                                >
                                    Save For Future Shifts?
                                </label>
                            </div>
                            <p className='text-sm font-lato text-gray-600 my-4 text-left'>This is a secure checkout using aligned systems of trust.</p>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.6 }}
                            >
                                <FullWidthButton color='#fff' type='submit'>
                                    Complete My Shift
                                </FullWidthButton>
                            </motion.div>
                        </div>
                    </div>
                </form>
            </div>
        </Elements>
    );
};

export default Checkout;
