import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../state/hooks';
import { RootState } from '../../state/store';

const PublicRoute = () => {
    const isAuthenticated = useAppSelector((state: RootState) => state.user.token);

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PublicRoute; 