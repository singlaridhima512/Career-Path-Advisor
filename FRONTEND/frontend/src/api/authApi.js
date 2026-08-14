import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

// Register
export async function register({ userName, email, password }) {

    try {

        const response = await axios.post(
            `${BASE_URL}/register`,
            {
                userName,
                email,
                password
            },
            {
                withCredentials: true
            }
        );

        return response.data;

    } catch (err) {

        console.log(err);

    }

}

// Login
export async function login({ email, password }) {

    try {

        const response = await axios.post(
            `${BASE_URL}/login`,
            {
                email,
                password
            },
            {
                withCredentials: true
            }
        );

        return response.data;

    } catch (err) {

        console.log(err);

    }

}

// Logout
export async function logout() {

    try {

        const response = await axios.post(
            `${BASE_URL}/logout`,
            {},
            {
                withCredentials: true
            }
        );

        return response.data;

    } catch (err) {

        console.log(err);

    }

}

// Get Logged-in User
export async function getMe() {

    try {

        const response = await axios.get(
            `${BASE_URL}/me`,
            {
                withCredentials: true
            }
        );

        return response.data;

    } catch (err) {

        console.log(err);

    }

}