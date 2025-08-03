import { useState, useCallback, FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../state/hooks';
import ExplosionEffect from '../components/ui/ExplosionEffect';
import { validatePassword } from '../utils/validation';
import { useForm } from '../hooks/useForm';
import { resetPasswordAction } from '../state/auth/actions';

const ResetPassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showRePassword, setShowRePassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { formState, handleChange, validateForm, setFormState } = useForm(
        ['password', 'rePassword'],
        { password: validatePassword }
    );

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleRePasswordVisibility = () => {
        setShowRePassword(!showRePassword);
    };

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLoading) return;
        if (!validateForm()) {
            return;
        }

        if (formState.password !== formState.rePassword) {
            setFormState((prev) => ({
                ...prev,
                rePasswordError: true,
                rePasswordErrorMessage: "Passwords do not match."
            }));
            return;
        }

        const token = searchParams.get('token');
        if (!token) {
            return;
        }

        try {
            setIsLoading(true);
            const result = await dispatch(resetPasswordAction({
                token,
                password: formState.password as string 
            }));

            if (resetPasswordAction.fulfilled.match(result)) {
                navigate('/sign-in');
            }
        } catch(e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, isLoading, formState, validateForm, navigate, setFormState, searchParams]);

    return (
        <>
            <div className='hidden md:block md:w-full md:h-screen md:flex md:flex-row md:bg-[#BBAE8F] sign-desktop-background bg-size-[100%_100%] bg-cover bg-center bg-no-repeat'>
                <div className='w-1/2'></div>
                <div className='w-1/2 h-full bg-transparent flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
                    <div className='max-w-md w-full space-y-8'>
                        <div>
                            <h2 className='mt-6 text-center text-[60px] font-playfair font-bold'>
                                Reset Your Password
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
                            <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                                <div className='rounded-md space-y-4 mb-2'>
                                    <div>
                                        <label htmlFor='desktop-password' className='block text-sm font-medium text-[#696969]'>
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
                                                className='mt-1 appearance-none block w-full px-3 py-2 border-b border-[#696969] placeholder-gray-400 focus:outline-none focus:ring-orange-800 focus:border-orange-800 sm:text-sm'
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

                                    <div>
                                        <label htmlFor='desktop-repeat-password' className='block text-sm font-medium text-[#696969]'>
                                            Repeat Password:
                                        </label>
                                        <div className='relative'>
                                            <input
                                                id='desktop-repeat-password'
                                                name='desktop-repeat-password'
                                                type={showRePassword ? 'text' : 'password'}
                                                autoComplete='current-repeat-password'
                                                value={formState.rePassword as string}
                                                onChange={handleChange('rePassword')}
                                                required
                                                className='mt-1 appearance-none block w-full px-3 py-2 border-b border-[#696969] placeholder-gray-400 focus:outline-none focus:ring-orange-800 focus:border-orange-800 sm:text-sm'
                                            />
                                            <button
                                                type='button'
                                                onClick={toggleRePasswordVisibility}
                                                className='absolute inset-y-0 right-0 pr-3 flex items-center mt-1 cursor-pointer'
                                            >
                                                {showRePassword ? (
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
                                        {formState.rePasswordError && <div className='text-sm text-red-500 mt-1'>{formState.rePasswordErrorMessage}</div>}
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
                                        ) : 'Reset Password'}
                                    </button>
                                </ExplosionEffect>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='block md:hidden min-h-screen w-full bg-white bg-[length:100%_auto] sign-mobile-background bg-no-repeat bg-top'>
                <div className='w-full h-full flex items-center justify-center pt-[400px] pb-20 px-4'>
                    <div className='w-full max-w-md space-y-6'>
                        <div>
                            <h2 className='text-center text-[30px] md:text-[60px] font-playfair font-bold'>
                                Reset Your Password
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
                                        <label htmlFor='mobile-password' className='block text-sm font-medium text-[#696969]'>
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
                                                className='mt-1 appearance-none block w-full px-3 py-2 border-b border-[#696969] placeholder-gray-400 focus:outline-none focus:ring-orange-800 focus:border-orange-800 sm:text-sm'
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

                                    <div>
                                        <label htmlFor='mobile-repeat-password' className='block text-sm font-medium text-[#696969]'>
                                            Repeat Password:
                                        </label>
                                        <div className='relative'>
                                            <input
                                                id='mobile-repeat-password'
                                                name='mobile-repeat-password'
                                                type={showRePassword ? 'text' : 'password'}
                                                autoComplete='current-repeat-password'
                                                value={formState.password as string}
                                                onChange={handleChange('rePassword')}
                                                required
                                                className='mt-1 appearance-none block w-full px-3 py-2 border-b border-[#696969] placeholder-gray-400 focus:outline-none focus:ring-orange-800 focus:border-orange-800 sm:text-sm'
                                            />
                                            <button
                                                type='button'
                                                onClick={toggleRePasswordVisibility}
                                                className='absolute inset-y-0 right-0 pr-3 flex items-center mt-1 cursor-pointer'
                                            >
                                                {showRePassword ? (
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
                                        {formState.rePasswordError && <div className='text-sm text-red-500 mt-1'>{formState.rePasswordErrorMessage}</div>}
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
                                        ) : 'Sign Up'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;