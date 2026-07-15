import { createContext, useEffect, useState } from "react";
import { getMe } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function getAndSetUser() {

            try {

                const data = await getMe();

                setUser(data.user);

            } catch (err) {

                console.log(err);

                setUser(null);

            } finally {

                setLoading(false);

            }

        }

        getAndSetUser();

    }, []);

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};