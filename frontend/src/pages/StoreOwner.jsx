import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FaStar, FaSignOutAlt, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const StoreOwner = () => {

    const navigate = useNavigate();

    const [averageRating, setAverageRating] = useState(null);

    const [users, setUsers] = useState([]);

    const [sortField, setSortField] = useState("");

    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {

        axios({
            url: "http://localhost:9000/store-average-rating",
            method: "GET",
            withCredentials: true
        })
        .then((response) => {

            setAverageRating(
                response.data[0]?.AverageRating
            );

        })
        .catch((error) => {

            console.log(error);

        });

        axios({
            url: "http://localhost:9000/store-rating-users",
            method: "GET",
            withCredentials: true
        })
        .then((response) => {

            setUsers(response.data);

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

    const handleSort = (field) => {

        if (sortField === field) {

            setSortOrder(
                sortOrder === "asc"
                    ? "desc"
                    : "asc"
            );

        }
        else {

            setSortField(field);

            setSortOrder("asc");

        }

    };

    const getSortIcon = (field) => {

        if (sortField !== field) {

            return (
                <FaSort className="text-xs text-[#94a3b8]" />
            );

        }

        return sortOrder === "asc"
            ? <FaSortUp className="text-xs text-[#ff7b5c]" />
            : <FaSortDown className="text-xs text-[#ff7b5c]" />;

    };

    const sortedUsers = useMemo(() => {

        if (!sortField) {

            return users;

        }

        return [...users].sort((a, b) => {

            if (sortField === "rating") {

                return sortOrder === "asc"
                    ? a.rating - b.rating
                    : b.rating - a.rating;

            }

            const valueA =
                a[sortField]
                    ?.toString()
                    .toLowerCase();

            const valueB =
                b[sortField]
                    ?.toString()
                    .toLowerCase();

            if (sortOrder === "asc") {

                return valueA.localeCompare(valueB);

            }

            return valueB.localeCompare(valueA);

        });

    }, [
        users,
        sortField,
        sortOrder
    ]);

    return (

        <div className="bg-[#f8fafc] min-h-full p-4 md:p-6">

            <div className="flex items-center justify-between">

                <h1 className="text-3xl md:text-4xl font-bold text-[#081534]">
                    Store Owner Dashboard
                </h1>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-[#ff7b5c] hover:bg-[#ff6b47] text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-300 cursor-pointer"
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

            <p className="text-[#64748b] mb-6 text-sm md:text-base">
                View ratings and users who rated your store.
            </p>

            <div className="w-full md:w-95 bg-white border border-[#e5e7eb] rounded-2xl shadow-sm overflow-hidden mb-6">

                <div className="h-2 bg-[#ff7b5c]"></div>

                <div className="p-8 flex items-center justify-between">

                    <div>

                        <p className="text-[#64748b] text-sm font-medium">
                            Average Store Rating
                        </p>

                        <h2 className="text-5xl font-bold text-[#081534] mt-4">

                            {averageRating
                                ? Number(
                                    averageRating
                                ).toFixed(1)
                                : "-"
                            }

                        </h2>

                    </div>

                    <div className="h-16 w-16 rounded-2xl bg-orange-100 flex items-center justify-center">

                        <FaStar className="text-3xl text-[#ff7b5c]" />

                    </div>

                </div>

            </div>

            <div className="bg-white border border-[#e5e7eb] rounded-2xl shadow-sm overflow-hidden">

                <div className="p-6 border-b border-[#e5e7eb]">

                    <h2 className="text-2xl font-bold text-[#081534]">
                        Users Who Rated Your Store
                    </h2>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full min-w-200">

                        <thead>

                            <tr className="bg-[#f8fafc] border-b border-[#e5e7eb]">

                                <th
                                    onClick={() =>
                                        handleSort("name")
                                    }
                                    className="px-6 py-4 text-left font-semibold text-[#081534] cursor-pointer"
                                >
                                    <div className="flex items-center gap-2">

                                        Name

                                        {getSortIcon("name")}

                                    </div>
                                </th>

                                <th
                                    onClick={() =>
                                        handleSort("email")
                                    }
                                    className="px-6 py-4 text-left font-semibold text-[#081534] cursor-pointer"
                                >
                                    <div className="flex items-center gap-2">

                                        Email

                                        {getSortIcon("email")}

                                    </div>
                                </th>

                                <th
                                    onClick={() =>
                                        handleSort("rating")
                                    }
                                    className="px-6 py-4 text-left font-semibold text-[#081534] cursor-pointer"
                                >
                                    <div className="flex items-center gap-2">

                                        Rating

                                        {getSortIcon("rating")}

                                    </div>
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {sortedUsers.length > 0 ? (

                                sortedUsers.map((user) => (

                                    <tr
                                        key={user.user_id}
                                        className="border-b border-[#f1f5f9] hover:bg-[#fafafa]"
                                    >

                                        <td className="px-6 py-4 text-[#081534]">

                                            {user.name}

                                        </td>

                                        <td className="px-6 py-4 text-[#64748b]">

                                            {user.email}

                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-2">

                                                <span className="font-medium text-[#081534]">

                                                    {user.rating}

                                                </span>

                                                <FaStar className="text-yellow-500" />

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="3"
                                        className="text-center py-12 text-[#64748b]"
                                    >
                                        No ratings found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};

export default StoreOwner;