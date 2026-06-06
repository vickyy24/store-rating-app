import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FaUsers, FaStore, FaStar, FaSignOutAlt } from "react-icons/fa";

const AdminDashboard = () => {

    const navigate = useNavigate();

    const [totalUsers, setTotalUsers] = useState(0);
    const [totalStores, setTotalStores] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);

    useEffect(() => {

        axios({
            url: "http://localhost:9000/dashboard-counts",
            method: "GET",
            withCredentials: true
        })
        .then((response) => {

            setTotalUsers(response.data.users[0].TotalUsers);
            setTotalStores(response.data.stores[0].TotalStores);
            setTotalRatings(response.data.ratings[0].TotalRatings);

        })
        .catch((error) => {
            console.log(error);
        });

    }, []);

    const handleLogout = () => {

        axios({
            url: "http://localhost:9000/logout",
            method: "GET",
            withCredentials: true
        })
        .then(() => {
            navigate("/");
        });

    };

    return (

        <div className="w-full bg-white border border-[#e5e7eb] min-h-152 rounded-2xl shadow-sm p-8">

            <div className="flex items-center justify-between mb-2">

                <h1 className="text-3xl md:text-4xl font-bold text-[#081534]">
                    Admin Dashboard
                </h1>

                <button onClick={handleLogout}
                    className="flex items-center gap-2 bg-[#ff7b5c] hover:bg-[#ff6b47] text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-300 cursor-pointer"
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

            <p className="text-[#64748b] mt-2 mb-8 text-sm md:text-base">
                Manage users, stores and ratings across the platform.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm overflow-hidden">

                    <div className="h-2 bg-[#3b82f6]"></div>

                    <div className="p-6 flex items-center justify-between">

                        <div>
                            <p className="text-[#64748b] text-sm font-medium">
                                Total Users
                            </p>

                            <h2 className="text-5xl font-bold text-[#081534] mt-4">
                                {totalUsers}
                            </h2>
                        </div>

                        <div className="h-16 w-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                            <FaUsers className="text-3xl text-[#3b82f6]" />
                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm overflow-hidden">

                    <div className="h-2 bg-[#ff7b5c]"></div>

                    <div className="p-6 flex items-center justify-between">

                        <div>
                            <p className="text-[#64748b] text-sm font-medium">
                                Total Stores
                            </p>

                            <h2 className="text-5xl font-bold text-[#081534] mt-4">
                                {totalStores}
                            </h2>
                        </div>

                        <div className="h-16 w-16 rounded-2xl bg-orange-100 flex items-center justify-center">
                            <FaStore className="text-3xl text-[#ff7b5c]" />
                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm overflow-hidden">

                    <div className="h-2 bg-[#f59e0b]"></div>

                    <div className="p-6 flex items-center justify-between">

                        <div>
                            <p className="text-[#64748b] text-sm font-medium">
                                Total Ratings
                            </p>

                            <h2 className="text-5xl font-bold text-[#081534] mt-4">
                                {totalRatings}
                            </h2>
                        </div>

                        <div className="h-16 w-16 rounded-2xl bg-yellow-100 flex items-center justify-center">
                            <FaStar className="text-3xl text-[#f59e0b]" />
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default AdminDashboard;