import useAuth from '../hooks/useAuth';
import Loader from '../shared/loader/Loader';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();


    if (loading) {
        return <Loader></Loader>
    }

    if (!user) {
        return <Navigate state={{ from: location.pathname }} to="/login" />
    }

    return children;

};

export default PrivateRoute;