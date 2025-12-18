import useAuth from '../hooks/useAuth';
import Loader from '../shared/loader/Loader';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        <Loader></Loader>
    }

    if (!user) {
        <Navigate to="/login"></Navigate>
    }

    return children

};

export default PrivateRoute;