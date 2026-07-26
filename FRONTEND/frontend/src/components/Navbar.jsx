import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
    const { user, handleLogout } = useAuth();

    if (!user) return null;

    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/history">History</Link>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
};

export default Navbar;