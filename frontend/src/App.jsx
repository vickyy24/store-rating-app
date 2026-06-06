import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Admin from "./pages/Admin";
import User from "./pages/User";
import StoreOwner from "./pages/StoreOwner";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/signup" element={<Signup />} />

                <Route element={<Layout />}>

                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <Admin />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/normal-user"
                        element={
                            <ProtectedRoute>
                                <User />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/store-owner"
                        element={
                            <ProtectedRoute>
                                <StoreOwner />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
};

export default App;