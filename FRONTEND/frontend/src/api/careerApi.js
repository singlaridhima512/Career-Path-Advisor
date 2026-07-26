import axios from "axios";

const BASE_URL = "http://localhost:1000/api/career";

// Update Profile - skills, interests, background
export async function updateProfile({ skills, interests, background }) {

    try {

        const response = await axios.post(
            `${BASE_URL}/profile`,
            {
                skills,
                interests,
                background
            },
            {
                withCredentials: true
            }
        );

        return response.data;

    } catch (err) {

        console.log(err);
        throw err;

    }

}

// Get past suggestion history
export async function getHistory() {

    try {

        const response = await axios.get(
            `${BASE_URL}/history`,
            {
                withCredentials: true
            }
        );

        return response.data;

    } catch (err) {

        console.log(err);
        throw err;

    }

}