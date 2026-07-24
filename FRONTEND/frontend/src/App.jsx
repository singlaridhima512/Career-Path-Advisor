import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Protected from "./components/Protected";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Home Route */}
                <Route
                    path="/"
                    element={
                        <Protected>
                            <Home />
                        </Protected>
                    }
                />

                {/* Protected Profile Route */}
                <Route
                    path="/profile"
                    element={
                        <Protected>
                            <Profile />
                        </Protected>
                    }
                />

                {/* Redirect unknown routes to Home */}
                <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;