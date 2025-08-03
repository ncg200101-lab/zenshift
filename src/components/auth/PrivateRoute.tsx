import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../state/hooks';
import { RootState } from '../../state/store';

const PrivateRoute = () => {
    const isAuthenticated = useAppSelector((state: RootState) => state.user.token);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default PrivateRoute; 