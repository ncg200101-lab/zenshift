import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../state/hooks';
import { RootState } from '../../state/store';
import AdminLayout from '../layouts/AdminLayout';

const AdminRoute = () => {
    const token = useAppSelector((state: RootState) => state.user.token);
    const role = useAppSelector((state: RootState) => state.user.role);
    const location = useLocation();

    if (!token) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }
    if (role !== 'admin') {
        return <Navigate to="/" replace />;
    }
    return (
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    );
};

export default AdminRoute; 