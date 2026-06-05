import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Admin from "./pages/Admin";
import User from "./pages/User";
import StoreOwner from "./pages/StoreOwner";
import Profile from "./pages/Profile";

const App = () => {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/signup" element={<Signup />} />

                <Route element={<Layout />}>

                    <Route
                        path="/admin"
                        element={<Admin />}
                    />

                    <Route
                        path="/normal-user"
                        element={<User />}
                    />

                    <Route
                        path="/store-owner"
                        element={<StoreOwner />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
};

export default App;