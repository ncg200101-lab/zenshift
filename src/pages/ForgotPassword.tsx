import { useState, useCallback, FormEvent } from 'react';
import { useAppDispatch } from '../state/hooks';
import { FacebookIcon, GoogleIcon } from '../components/CustomIcons';
import ExplosionEffect from '../components/ui/ExplosionEffect';
import { validateEmail } from '../utils/validation';
import { useForm } from '../hooks/useForm';
import { forgotPasswordAction } from '../state/auth/actions';

const ForgotPassword = () => {
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { formState, handleChange, validateForm } = useForm(
        ['email'],
        { email: validateEmail }
    );

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
            <div className='hidden md:block md:w-full md:h-screen md:flex md:flex-row md:bg-[#BBAE8F] sign-desktop-background bg-size-[100%_100%] bg-cover bg-center bg-no-repeat'>
                <div className='w-1/2'></div>
                <div className='w-1/2 h-full bg-transparent flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
                    <div className='max-w-md w-full space-y-8'>
                        <div>
                            <h2 className='mt-6 text-center text-[60px] font-playfair font-bold'>
                                Forgot Password
                            </h2>
                        </div>
                        <div className='chakra-row'>
                            <div className='chakra-circle purple max-w-10 max-h-10 min-w-10'></div>
                            <div className='chakra-circle indigo max-w-10 max-h-10 min-w-10'></div>
                            <div className='chakra-circle blue max-w-10 max-h-10 min-w-10'></div>
                            <div className='chakra-circle green max-w-10 max-h-10 min-w-10'></div>
                            <div className='chakra-circle yellow max-w-10 max-h-10 min-w-10'></div>
                            <div className='chakra-circle orange max-w-10 max-h-10 min-w-10'></div>
                            <div className='chakra-circle red max-w-10 max-h-10 min-w-10'></div>
                        </div>
                        <div className='mt-8 space-y-6'>
                            <div className='grid grid-cols-2 gap-4'>
                                <button
                                    type='button'
                                    className='w-full flex justify-center items-center py-2 px-4 border border-[#696969] rounded-lg text-sm font-medium text-[#696969] hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 cursor-pointer'
                                    onClick={handleGoogleLogin}
                                >
                                    <GoogleIcon />
                                    <span className='ml-1'>Continue with Google</span>
                                </button>
                                <button
                                    type='button'
                                    className='w-full flex justify-center items-center py-2 px-4 border border-[#696969] rounded-lg text-sm font-medium text-[#696969] hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 cursor-pointer'
                                    onClick={handleFacebookLogin}
                                >
                                    <FacebookIcon />
                                    <span className='ml-1'>Continue with Facebook</span>
                                </button>
                            </div>

                            <div className='relative flex justify-center text-sm'>
                                <span className='px-2 text-gray-500'>-OR-</span>
                            </div>

                            <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                                <div className='rounded-md space-y-4 mb-2'>
                                    <div>
                                        <label htmlFor='desktop-email' className='block text-sm font-medium text-[#696969]'>
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
                                            className='mt-1 appearance-none block w-full px-3 py-2 border-b border-[#696969] placeholder-gray-400 focus:outline-none focus:ring-orange-800 focus:border-orange-800 sm:text-sm'
                                        />
                                        {formState.emailError && <div className='text-sm text-red-500 mt-1'>{formState.emailErrorMessage}</div>}
                                    </div>
                                </div>

                                <div>
                                <ExplosionEffect className='w-full'>
                                    <button
                                        type='submit'
                                        disabled={isLoading}
                                        className='w-full flex justify-center py-3 px-4 rounded-lg border border-transparent text-base font-medium text-white bg-[#904805] hover:bg-orange-800 focus:outline-none transition deration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'
                                    >
                                        {isLoading ? (
                                            <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                                                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                            </svg>
                                        ) : 'Forgot Password'}
                                    </button>
                                </ExplosionEffect>
                                </div>
                            </form>
            
                            <div className='text-center text-sm'>
                                <span className='text-base text-[#696969] font-segoe'>Already have an account?</span>{' '}
                                <a href='/sign-in' className='text-base font-medium text-[#623408] hover:text-orange-900 font-segoe'>
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='block md:hidden min-h-screen w-full bg-white sign-mobile-background bg-[length:100%_auto] bg-no-repeat bg-top'>
                <div className='w-full h-full flex items-center justify-center pt-[400px] pb-20 px-4'>
                    <div className='w-full max-w-md space-y-6'>
                        <div>
                            <h2 className='text-center text-[30px] md:text-[60px] font-playfair font-bold'>
                                Forgot Password
                            </h2>
                        </div>
                        <div className='chakra-row flex justify-center gap-2'>
                            <div className='chakra-circle purple w-8 h-8'></div>
                            <div className='chakra-circle indigo w-8 h-8'></div>
                            <div className='chakra-circle blue w-8 h-8'></div>
                            <div className='chakra-circle green w-8 h-8'></div>
                            <div className='chakra-circle yellow w-8 h-8'></div>
                            <div className='chakra-circle orange w-8 h-8'></div>
                            <div className='chakra-circle red w-8 h-8'></div>
                        </div>
                        <div className='space-y-4'>
                            <form className='space-y-4' onSubmit={handleSubmit}>
                                <div className='space-y-4'>
                                    <div>
                                        <label htmlFor='mobile-email' className='block text-sm font-medium text-[#696969]'>
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
                                            className='mt-1 appearance-none block w-full px-3 py-2 border-b border-[#696969] placeholder-gray-400 focus:outline-none focus:ring-orange-800 focus:border-orange-800 sm:text-sm'
                                        />
                                        {formState.emailError && <div className='text-sm text-red-500 mt-1'>{formState.emailErrorMessage}</div>}
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type='submit'
                                        disabled={isLoading}
                                        className='w-full flex justify-center py-3 px-4 rounded-lg border border-transparent text-base font-medium text-white bg-[#904805] hover:bg-orange-800 focus:outline-none transition duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'
                                    >
                                        {isLoading ? (
                                            <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                                                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                            </svg>
                                        ) : 'Forgot Password'}
                                    </button>
                                </div>
                            </form>

                            <div className='relative flex justify-center text-sm'>
                                <span className='px-2 text-gray-500'>-OR-</span>
                            </div>

                            <div className='grid grid-cols-2 gap-3'>
                                <button
                                    type='button'
                                    className='w-full flex justify-center items-center py-2 px-4 border border-[#696969] rounded-lg text-sm font-medium text-[#696969] hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 cursor-pointer'
                                    onClick={handleGoogleLogin}
                                >
                                    <GoogleIcon />
                                    <span className='ml-1'>Continue with Google</span>
                                </button>
                                <button
                                    type='button'
                                    className='w-full flex justify-center items-center py-2 px-4 border border-[#696969] rounded-lg text-sm font-medium text-[#696969] hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 cursor-pointer'
                                    onClick={handleFacebookLogin}
                                >
                                    <FacebookIcon />
                                    <span className='ml-1'>Continue with Facebook</span>
                                </button>
                            </div>
            
                            <div className='text-center text-sm'>
                                <span className='text-base text-[#696969]'>Already have an account?</span>{' '}
                                <a href='/sign-in' className='text-base font-medium text-[#623408] hover:text-orange-900'>
                                    Log in
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