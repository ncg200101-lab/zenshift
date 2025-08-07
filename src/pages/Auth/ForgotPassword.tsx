import { useState, useCallback, FormEvent } from 'react';
import { useAppDispatch } from '../../state/hooks';
import ExplosionEffect from '../../components/ui/ExplosionEffect';
import { validateEmail } from '../../utils/validation';
import { useForm } from '../../hooks/useForm';
import { forgotPasswordAction } from '../../state/auth/actions';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { formState, handleChange, validateForm } = useForm(
        ['email'],
        { email: validateEmail }
    );

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLoading) return;

        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);
            await dispatch(forgotPasswordAction({
                email: formState.email as string,
            }));
        } catch(e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, isLoading, formState.email, validateForm]);

    return (
        <>
            <div className='hidden md:flex flex-col bg-transparent min-h-screen w-full sign-desktop-background'>
                <div className='flex flex-grow justify-center items-center p-6'>
                    <div className='bg-[#ffffff30] rounded-3xl space-y-8 p-10 max-w-lg w-full'>
                        <div>
                            <h2 className='text-center text-white text-[60px] font-playfair font-bold'>
                                Forgot Password
                            </h2>
                        </div>
                        <div className='chakra-row space-x-1'>
                            <div className='chakra-circle red max-w-10 max-h-10 min-w-10'></div>
                            <div className='chakra-circle orange max-w-10 max-h-10 min-w-10'></div>
                            <div className='chakra-circle yellow max-w-10 max-h-10 min-w-10'></div>
                            <div className='chakra-circle green max-w-10 max-h-10 min-w-10'></div>
                            <div className='chakra-circle blue max-w-10 max-h-10 min-w-10'></div>
                            <div className='chakra-circle indigo max-w-10 max-h-10 min-w-10'></div>
                            <div className='chakra-circle purple max-w-10 max-h-10 min-w-10'></div>
                        </div>
                        <div className='mt-8'>
                            <form className='mt-12 space-y-6' onSubmit={handleSubmit}>
                                <div className='rounded-md space-y-4 mb-2'>
                                    <div>
                                        <label htmlFor='desktop-email' className='block text-sm font-medium text-white'>
                                            Email:
                                        </label>
                                        <input
                                            id='desktop-email'
                                            name='desktop-email'
                                            type='email'
                                            autoComplete='email'
                                            value={formState.email as string}
                                            onChange={handleChange('email')}
                                            required
                                            className='mt-1 appearance-none block w-full px-3 py-2 border-b border-white placeholder-gray-400 focus:outline-none focus:ring-[#FAD859] focus:border-[#FAD859] sm:text-sm'
                                        />
                                        {formState.emailError && <div className='text-sm text-red-500 mt-1'>{formState.emailErrorMessage}</div>}
                                    </div>
                                </div>

                                <div>
                                    <motion.div
                                        whileHover={{ scale: 1.04 }}
                                        transition={{ duration: 0.3 }}
                                        className='w-full'
                                    >
                                        <ExplosionEffect className='w-full'>
                                            <button
                                                type='submit'
                                                disabled={isLoading}
                                                className='w-full flex justify-center py-3 px-4 rounded-lg border border-transparent text-base font-medium text-white focus:outline-none transition deration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed bg-gradient-to-r from-[#FFCD29] via-[#FAD859] to-[#FFCD29]'
                                                style={{
                                                    boxShadow: '0px 2px 6px 2px rgba(0,0,0,0.15), 0px 1px 2px 0px rgba(0,0,0,0.3)',
                                                }}
                                            >
                                                {isLoading ? (
                                                    <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                                                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                                    </svg>
                                                ) : 'Forgot Password'}
                                            </button>
                                            </ExplosionEffect>
                                        </motion.div>
                                </div>
                            </form>
            
                            <div className='text-center text-sm mt-6'>
                                <span className='text-base text-white font-segoe'>Already have an account?</span>{' '}
                                <a href='/sign-in' className='text-base font-semibold text-red-500 hover:text-red-600 font-segoe transition duration-200'>
                                    Log In
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:hidden min-h-screen w-full bg-white sign-mobile-background'>
                <div className='flex flex-grow justify-center items-center p-6'>
                    <div className='w-full max-w-md space-y-6 max-w-lg w-full'>
                        <div>
                            <h2 className='text-center text-[30px] md:text-[60px] font-playfair font-bold'>
                                Forgot Password
                            </h2>
                        </div>
                        <div className='chakra-row space-x-1'>
                            <div className='chakra-circle red w-8 h-8'></div>
                            <div className='chakra-circle orange w-8 h-8'></div>
                            <div className='chakra-circle yellow w-8 h-8'></div>
                            <div className='chakra-circle green w-8 h-8'></div>
                            <div className='chakra-circle blue w-8 h-8'></div>
                            <div className='chakra-circle indigo w-8 h-8'></div>
                            <div className='chakra-circle purple w-8 h-8'></div>
                        </div>
                        <div className='space-y-4'>
                            <form className='space-y-4' onSubmit={handleSubmit}>
                                <div className='space-y-4'>
                                    <div>
                                        <label htmlFor='mobile-email' className='block text-sm font-medium text-[#000]'>
                                            Email:
                                        </label>
                                        <input
                                            id='mobile-email'
                                            name='mobile-email'
                                            type='email'
                                            autoComplete='email'
                                            value={formState.email as string}
                                            onChange={handleChange('email')}
                                            required
                                            className='mt-1 appearance-none block w-full px-3 py-2 border-b border-[#696969] placeholder-gray-400 focus:outline-none focus:ring-[#FAD859] focus:border-[#FAD859] sm:text-sm'
                                        />
                                        {formState.emailError && <div className='text-sm text-red-500 mt-1'>{formState.emailErrorMessage}</div>}
                                    </div>
                                </div>

                                <div>
                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ duration: 0.3 }}
                                        className='w-full'
                                    >
                                        <ExplosionEffect className='w-full'>
                                            <button
                                                type='submit'
                                                disabled={isLoading}
                                                className='w-full flex justify-center py-2 px-4 rounded-lg border border-transparent text-base font-medium text-white focus:outline-none transition deration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed bg-gradient-to-r from-[#FFCD29] via-[#FAD859] to-[#FFCD29]'
                                                style={{
                                                    boxShadow: '0px 2px 6px 2px rgba(0,0,0,0.15), 0px 1px 2px 0px rgba(0,0,0,0.3)',
                                                }}
                                            >
                                                {isLoading ? (
                                                    <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                                                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                                    </svg>
                                                ) : 'Forgot Password'}
                                            </button>
                                        </ExplosionEffect>
                                    </motion.div>
                                </div>
                            </form>

                            <div className='text-center text-sm'>
                                <span className='text-sm text-white font-segoe'>Already have an account?</span>{' '}
                                <a href='/sign-in' className='text-sm font-semibold text-red-500 hover:text-red-600 font-segoe transition duration-200'>
                                    Log In
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;