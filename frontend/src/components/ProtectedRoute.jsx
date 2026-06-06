import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {

        axios({
            url: "http://localhost:9000/verify-user",
            method: "GET",
            withCredentials: true
        })
        .then(() => {
            setAuthorized(true);
        })
        .catch(() => {
            setAuthorized(false);
        })
        .finally(() => {
            setLoading(false);
        });

    }, []);

    if (loading) {
        return null;
    }

    if (!authorized) {
        return <Navigate to="/" replace />;
    }

    return children;

};

export default ProtectedRoute;