import { useLocation, Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Redirect />
            : auth?.accessToken //changed from user to accessToken to persist login after refresh
                ? <Redirect to="/unauthorized" state={{ from: location }} replace />
                : <Redirect to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;