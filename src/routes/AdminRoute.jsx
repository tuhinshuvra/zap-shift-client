import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Loader from '../shared/loader/Loader';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { isAdmin, isLoading } = useUserRole();

    if (loading || isLoading) {
        return <Loader></Loader>
    }

    if (!user || !isAdmin) {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default AdminRoute;