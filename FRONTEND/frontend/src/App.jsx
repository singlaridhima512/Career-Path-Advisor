
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Protected from "./components/Protected";
import Navbar from "./components/Navbar";  
import Results from "./pages/Results";

function App() {
    return (
        <BrowserRouter>
            <Navbar />   {/* ← add this, right above <Routes> */}
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

                {/* Protected History Route */}
                <Route
                    path="/history"
                    element={
                        <Protected>
                            <History />
                        </Protected>
                    }
                />
                <Route
    path="/results"
    element={
        <Protected>
            <Results />
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