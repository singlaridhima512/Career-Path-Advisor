import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";
import { useAuth } from "../hooks/useAuth";

const Register = () => {

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const { handleRegister, loading } = useAuth();

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await handleRegister(formData);

            // Change this if you want to redirect somewhere else
            navigate("/profile");

        } catch (err) {

            console.error(err);
            alert("Registration failed");

        }

    };

    return (

        <div className="register-page">

            <div className="register-card">

                <h1>Career Path Advisor</h1>

                <p className="subtitle">
                    Create Your Account 🚀
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <label>Username</label>

                        <input
                            type="text"
                            name="userName"
                            placeholder="Enter username"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="input-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="input-group">

                        <label>Password</label>

                        <div className="password-box">

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                className="eye-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈" : "👁"}
                            </button>

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="register-btn"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                </form>

                <p className="login-text">

                    Already have an account?{" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Register;