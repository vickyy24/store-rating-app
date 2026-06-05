import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { FaChartPie, FaUserPlus, FaStore, FaUsers } from "react-icons/fa";

import AdminDashboard from "./AdminDashboard";
import AddUser from "./AddUser";
import AddStore from "./AddStore";
import AdminNormalUsers from "./AdminNormalUsers";
import Stores from "./Stores";
import AllUsers from "./AllUsers";

const Admin = () => {

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("dashboard");

    useEffect(() => {

        axios({
            url: "http://localhost:9000/verify-user",
            method: "GET",
            withCredentials: true,
        })
        .then((response) => {

            if (response.data.Role !== "Admin") {
                navigate("/");
            }

        })
        .catch(() => {
            navigate("/");
        });

    }, []);

    const menuClass = (tab) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
            activeTab === tab
                ? "bg-[#ff7b5c] text-white"
                : "text-white hover:bg-[#16325f]"
        }`;

    return (

        <div className="bg-[#f8fafc] min-h-full p-4 md:p-6">

            <div className="flex flex-col lg:flex-row gap-5 items-start">

                <div className="w-full lg:w-63 min-h-152 bg-[#081534] rounded-lg p-5 shadow-xl">

                    <h2 className="text-white text-2xl font-bold mb-4">
                        Admin
                    </h2>

                    <div className="flex flex-col gap-2">

                        <Link
                            to="#"
                            onClick={() => setActiveTab("dashboard")}
                            className={menuClass("dashboard")}
                        >
                            <FaChartPie />
                            Dashboard
                        </Link>

                        <Link
                            to="#"
                            onClick={() => setActiveTab("add-user")}
                            className={menuClass("add-user")}
                        >
                            <FaUserPlus />
                            Add User
                        </Link>

                        <Link
                            to="#"
                            onClick={() => setActiveTab("add-store")}
                            className={menuClass("add-store")}
                        >
                            <FaStore />
                            Add Store
                        </Link>

                        <Link
                            to="#"
                            onClick={() => setActiveTab("stores")}
                            className={menuClass("stores")}
                        >
                            <FaStore />
                            Stores
                        </Link>

                        <Link
                            to="#"
                            onClick={() => setActiveTab("admin-users")}
                            className={menuClass("admin-users")}
                        >
                            <FaUsers />
                            Admin/Normal Users
                        </Link>

                        <Link
                            to="#"
                            onClick={() => setActiveTab("all-users")}
                            className={menuClass("all-users")}
                        >
                            <FaUsers />
                            All Users
                        </Link>

                    </div>

                </div>

                <div className="flex-1 w-full">

                    {activeTab === "dashboard" && <AdminDashboard />}

                    {activeTab === "add-user" && <AddUser />}

                    {activeTab === "add-store" && <AddStore />}

                    {activeTab === "stores" && <Stores />}

                    {activeTab === "admin-users" && <AdminNormalUsers />}

                    {activeTab === "all-users" && <AllUsers />}

                </div>

            </div>

        </div>

    );
};

export default Admin;