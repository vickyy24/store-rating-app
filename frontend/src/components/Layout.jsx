import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col">

            <Navbar />

            <div className="flex-1">
                <Outlet />
            </div>

            <Footer />

        </div>
    );
};

export default Layout;