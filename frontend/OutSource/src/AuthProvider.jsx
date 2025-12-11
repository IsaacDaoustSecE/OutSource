import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import useApi from "./shared/useapi";
import { useEffect } from "react";

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = useApi("/users/me", {
        method: "GET",
    });

    useEffect(() => {
        const path = location.pathname;
        const onUserPage =
            path.startsWith("/login") ||
            path.startsWith("/signup") ||
            path.startsWith("/otp");

        console.log(data, onUserPage, path);

        if (!data && !onUserPage) {
            console.log("redirecting to login cause no user");
            navigate("/login");
        } else if (data && onUserPage) {
            navigate("/");
        }
    });

    return (
        <AuthContext.Provider
            value={{
                user: data,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
