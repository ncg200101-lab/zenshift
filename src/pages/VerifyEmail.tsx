import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyEmailAction } from '../state/auth/actions';
import { useAppDispatch } from '../state/hooks';
import SpinLoader from '../components/ui/SpinLoader';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [verifying, setVerifying] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            setError('Invalid verification link');
            setVerifying(false);
            return;
        }

        const verify = async () => {
            try {
                const result = await dispatch(verifyEmailAction({ token }));
                if (verifyEmailAction.fulfilled.match(result)) {
                    navigate('/');
                }
                else {
                    navigate('/sign-up');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Verification failed');
                setVerifying(false);
            }
        };

        verify();
    }, [dispatch, navigate, searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
                {verifying ? (
                    <div className="text-center">
                        <SpinLoader />
                        <h2 className="mt-6 text-2xl font-bold text-gray-900">
                            Verifying your email...
                        </h2>
                    </div>
                ) : error ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-red-600">
                            Verification Failed
                        </h2>
                        <p className="mt-2 text-gray-600">{error}</p>
                        <button
                            onClick={() => navigate('/signin')}
                            className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                        >
                            Back to Sign In
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default VerifyEmail; 