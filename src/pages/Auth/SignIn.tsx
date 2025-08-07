import { useState, useCallback, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../state/hooks';
import { FacebookIcon, GoogleIcon } from '../../components/CustomIcons';
import ExplosionEffect from '../../components/ui/ExplosionEffect';
import { validateEmail, validatePassword } from '../../utils/validation';
import { useForm } from '../../hooks/useForm';
import { signInAction } from '../../state/auth/actions';
import { motion } from 'framer-motion';

const SignIn = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { formState, handleChange, validateForm } = useForm(
        ['email', 'password'],
        {
            email: validateEmail,
            password: validatePassword
        }
    );

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleGoogleLogin = () => {
        window.open('/api/auth/google', '_self');
    };
    
    const handleFacebookLogin = () => {
        window.open('/api/auth/facebook', '_self');
    };

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLoading) return;

        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);
            const result = await dispatch(signInAction({
                email: formState.email as string,
                password: formState.password as string
            }));
    
            if (signInAction.fulfilled.match(result)) {
                navigate('/');
            }
        } catch(e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, isLoading, formState.email, formState.password, validateForm, navigate]);

    return (
        <>
            <div className='hidden md:flex flex-col bg-transparent min-h-screen w-full sign-desktop-background'>
                <div className='flex flex-grow justify-center items-center p-6'>
                    <div className='bg-[#ffffff30] rounded-3xl space-y-8 p-10 max-w-lg w-full'>
                        <div>
                            <h2 className='text-center text-white text-[60px] font-playfair font-bold'>
                                Log In
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
                            <div className='grid grid-cols-2 gap-4'>
                                <button
                                    type='button'
                                    className='w-full flex justify-center items-center py-2 px-4 border border-white rounded-lg text-sm font-medium text-white hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 cursor-pointer'
                                    onClick={handleGoogleLogin}
                                >
                                    <GoogleIcon />
                                    <span className='ml-1 text-white'>Sign in with Google</span>
                                </button>
                                <button
                                    type='button'
                                    className='w-full flex justify-center items-center py-2 px-4 border border-white rounded-lg text-sm font-medium text-white hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 cursor-pointer'
                                    onClick={handleFacebookLogin}
                                >
                                    <FacebookIcon />
                                    <span className='ml-1 text-white'>Sign in with Facebook</span>
                                </button>
                            </div>

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
                                    <div>
                                        <label htmlFor='desktop-password' className='block text-sm font-medium text-white'>
                                            Password:
                                        </label>
                                        <div className='relative'>
                                            <input
                                                id='desktop-password'
                                                name='desktop-password'
                                                type={showPassword ? 'text' : 'password'}
                                                autoComplete='current-password'
                                                value={formState.password as string}
                                                onChange={handleChange('password')}
                                                required
                                                className='mt-1 appearance-none block w-full px-3 py-2 border-b border-white placeholder-gray-400 focus:outline-none focus:ring-[#FAD859] focus:border-[#FAD859] sm:text-sm'
                                            />
                                            <button
                                                type='button'
                                                onClick={togglePasswordVisibility}
                                                className='absolute inset-y-0 right-0 pr-3 flex items-center mt-1 cursor-pointer'
                                            >
                                                {showPassword ? (
                                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 text-gray-500'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88' />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 text-gray-500'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' />
                                                        <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        {formState.passwordError && <div className='text-sm text-red-500 mt-1'>{formState.passwordErrorMessage}</div>}
                                    </div>
                                </div>

                                <div className='flex items-center justify-end'>
                                    <div className='text-sm'>
                                        <a href='/forgot-password' className='font-medium text-white hover:text-gray-300 transition duration-100'>
                                            Forgot Password?
                                        </a>
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
                                                ) : 'Log In'}
                                            </button>
                                        </ExplosionEffect>
                                    </motion.div>
                                </div>
                            </form>
            
                            <div className='text-center text-sm mt-6'>
                                <span className='text-base text-white font-segoe'>New to ZenShift?</span>{' '}
                                <a href='/sign-up' className='text-base font-semibold text-red-500 hover:text-red-600 font-segoe transition duration-200'>
                                    Create Account
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
                                Log In
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
                        <div className=''>
                            <form className='space-y-4 mb-4' onSubmit={handleSubmit}>
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
                                    <div>
                                        <label htmlFor='mobile-password' className='block text-sm font-medium text-[#000]'>
                                            Password:
                                        </label>
                                        <div className='relative'>
                                            <input
                                                id='mobile-password'
                                                name='mobile-password'
                                                type={showPassword ? 'text' : 'password'}
                                                autoComplete='current-password'
                                                value={formState.password as string}
                                                onChange={handleChange('password')}
                                                required
                                                className='mt-1 appearance-none block w-full px-3 py-2 border-b border-[#696969] placeholder-gray-400 focus:outline-none focus:ring-[#FAD859] focus:border-[#FAD859] sm:text-sm'
                                            />
                                            <button
                                                type='button'
                                                onClick={togglePasswordVisibility}
                                                className='absolute inset-y-0 right-0 pr-3 flex items-center mt-1 cursor-pointer'
                                            >
                                                {showPassword ? (
                                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 text-gray-500'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88' />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 text-gray-500'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' />
                                                        <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        {formState.passwordError && <div className='text-sm text-red-500 mt-1'>{formState.passwordErrorMessage}</div>}
                                    </div>
                                </div>

                                <div className='flex items-center justify-end'>
                                    <div className='text-sm'>
                                        <a href='/forgot-password' className='font-medium text-[#000] hover:text-gray-800'>
                                            Forgot Password?
                                        </a>
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
                                                ) : 'Log In'}
                                            </button>
                                            
                                        </ExplosionEffect>
                                    </motion.div>
                                </div>
                            </form>

                            <div className='text-center text-sm'>
                                <span className='text-sm text-white font-segoe'>New to Zenshift?</span>{' '}
                                <a href='/sign-up' className='text-sm font-semibold text-red-500 hover:text-red-600 font-segoe transition duration-200'>
                                    Create Account
                                </a>
                            </div>

                            <div className='space-y-2 mt-8 w-full flex flex-col items-center'>
                                <button
                                    type='button'
                                    className='w-[240px] flex justify-center items-center py-2 px-4 border border-white rounded-lg text-sm font-medium text-white hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 cursor-pointer'
                                    onClick={handleGoogleLogin}
                                >
                                    <GoogleIcon />
                                    <span className='ml-1 text-white'>Sign in with Google</span>
                                </button>
                                <div className='relative flex justify-center text-sm'>
                                    <span className='px-2 text-black'>-OR-</span>
                                </div>
                                <button
                                    type='button'
                                    className='w-[240px] flex justify-center items-center py-2 px-4 border border-white rounded-lg text-sm font-medium text-white hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 cursor-pointer'
                                    onClick={handleFacebookLogin}
                                >
                                    <FacebookIcon />
                                    <span className='ml-1 text-white'>Sign in with Facebook</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;