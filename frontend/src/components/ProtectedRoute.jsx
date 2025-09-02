import { useAuth } from "../contexts/AuthProvider.jsx";
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, user, loading, tryRefreshToken } = useAuth();
    const [refreshAttempted, setRefreshAttempted] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        const attemptRefresh = async () => {
            // Jeśli nie jesteśmy zalogowani, nie próbowaliśmy jeszcze refreshu i nie trwa refresh
            if (!isAuthenticated && !refreshAttempted && !loading && !isRefreshing) {
                setIsRefreshing(true);
                console.log('Attempting token refresh in ProtectedRoute...');
                
                const success = await tryRefreshToken();
                setRefreshAttempted(true);
                setIsRefreshing(false);
                
                if (success) {
                    console.log('Token refresh successful in ProtectedRoute');
                } else {
                    console.log('Token refresh failed in ProtectedRoute');
                }
            }
        };

        attemptRefresh();
    }, [isAuthenticated, refreshAttempted, loading, tryRefreshToken, isRefreshing]);

    // Pokaż loading podczas ładowania lub refreshowania
    if (loading || isRefreshing) {
        return <div>Loading...</div>;
    }

    // Jeśli nie jesteśmy zalogowani i już próbowaliśmy refresh
    if (!isAuthenticated && refreshAttempted) {
        return <Navigate to="/login" replace />;
    }

    // Jeśli nie mamy wymaganej roli
    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;