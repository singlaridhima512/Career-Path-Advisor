import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const Login = () => {

    const navigate=useNavigate()
    const {handleLogin,loading}=useAuth()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        await handleLogin(formData);

        navigate("/profile");

    } catch (err) {

        alert("Invalid email or password");

    }

};

    return (
        <div className="login-page">

            <div className="login-card">

                <h1>Career Path Advisor</h1>

                <p className="subtitle">
                    Welcome Back 👋
                </p>

                <form onSubmit={handleSubmit}>

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

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="register-text">

                    Don't have an account?

                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default Login;