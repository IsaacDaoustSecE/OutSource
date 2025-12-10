import { AuthContext } from "./AuthContext";
import useApi from "./shared/useapi";

export const AuthProvider = ({ children }) => {
    const { data } = useApi("/users/me", {
        method: "GET",
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
