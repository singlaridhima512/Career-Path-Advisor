import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { login, register, logout } from "../api/authApi";

export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {

        setLoading(true);

        try {

            const data = await login({ email, password });

            setUser(data.user);

            return data;

        } catch (err) {

            console.log(err);
            throw err;

        } finally {

            setLoading(false);

        }

    };

    const handleRegister = async ({ userName, email, password }) => {

        setLoading(true);

        try {

            const data = await register({ userName, email, password });

            setUser(data.user);

            return data;

        } catch (err) {

            console.log(err);
            throw err;

        } finally {

            setLoading(false);

        }

    };

    const handleLogout = async () => {

        setLoading(true);

        try {

            await logout();

            setUser(null);

        } catch (err) {

            console.log(err);
            throw err;

        } finally {

            setLoading(false);

        }

    };

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout
    };
};