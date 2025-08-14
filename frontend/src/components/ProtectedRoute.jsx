import {useAuth} from "../contexts/AuthProvider.jsx"
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // lub spinner
    }
    //TODO: ODCOMMENTOWAĆ JAK ZROBIE DASHBOARD

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" replace />;
    // }

    // if (requiredRole && user?.role !== requiredRole) {
    //     return <Navigate to="/" replace />;
    // }

    return children;
};

export default ProtectedRoute;