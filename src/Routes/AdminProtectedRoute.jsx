import { getCookie } from "cookies-next";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children, isAdmin }) => {
    const adminToken = getCookie(process.env.REACT_APP_ADMIN_TOKENNAME);
    const adminDetails = getCookie(process.env.REACT_APP_ADMINDETAILS);

    // Check if either admin or department user token exists
    const isAdminAuthenticated = !!adminToken;

    // Parse user details if tokens exist
    const user = adminDetails ? JSON.parse(adminDetails) : null;

    // Check if either admin or dept user is authenticated
    const isAuthenticated = isAdminAuthenticated

    if (!isAuthenticated) {
        // If not authenticated, redirect to login
        return <Navigate to="/login" />;
    }

    // If trying to access as an admin but the user is not an admin
    if (isAdmin && user?.role !== "admin") {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AdminProtectedRoute;
