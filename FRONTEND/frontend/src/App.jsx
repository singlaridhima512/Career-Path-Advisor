import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Protected from "./components/Protected";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/home" element={
                    <Protected>
                        <Home />
                    </Protected>
                }/>

                <Route path="*" element={<Navigate to="/login" replace />} />
                <Route path="/profile" element={<Protected><Profile /></Protected>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
import Profile from "./pages/Profile";