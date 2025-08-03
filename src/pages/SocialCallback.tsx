import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../state/hooks';
import { setUserFromSocial } from '../state/auth/actions';

const SocialCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleCallback = () => {
            try {
                const params = new URLSearchParams(location.search);
                const data = params.get('data');

                if (!data) {
                    throw new Error('No callback data received');
                }

                const decodedData = JSON.parse(decodeURIComponent(data));
                const { token, user } = decodedData;

                dispatch(setUserFromSocial({
                    id: user.id,
                    name: user.name || '',
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar || '',
                    token: token || '',
                }));

                navigate('/');
            } catch (error) {
                console.error('Error processing social auth callback:', error);
                navigate('/sign-in');
            }
        };

        handleCallback();
    }, [location, navigate, dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Processing your login...
                </h2>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            </div>
        </div>
    );
};

export default SocialCallback; 