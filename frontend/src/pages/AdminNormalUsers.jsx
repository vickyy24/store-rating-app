import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const AdminNormalUsers = () => {

    const [users, setUsers] = useState([]);

    const [nameFilter, setNameFilter] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const [addressFilter, setAddressFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");

    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {

        axios({
            url: "http://localhost:9000/admin-normal-users",
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
            return <FaSort className="text-xs text-[#94a3b8]" />;
        }

        return sortOrder === "asc"
            ? <FaSortUp className="text-xs text-[#ff7b5c]" />
            : <FaSortDown className="text-xs text-[#ff7b5c]" />;

    };

    const filteredUsers = useMemo(() => {

        const filtered = users.filter((user) => {

            return (

                user.name
                    .toLowerCase()
                    .includes(nameFilter.toLowerCase())

                &&

                user.email
                    .toLowerCase()
                    .includes(emailFilter.toLowerCase())

                &&

                user.address
                    .toLowerCase()
                    .includes(addressFilter.toLowerCase())

                &&

                user.role
                    .toLowerCase()
                    .includes(roleFilter.toLowerCase())

            );

        });

        if (!sortField) {
            return filtered;
        }

        return [...filtered].sort((a, b) => {

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
        nameFilter,
        emailFilter,
        addressFilter,
        roleFilter,
        sortField,
        sortOrder
    ]);

    return (

        <div className="bg-white border border-[#e5e7eb] rounded-2xl shadow-sm min-h-152 p-8">

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-[#081534]">
                    Admin / Normal Users
                </h1>

                <p className="text-[#64748b] mt-2">
                    View and manage administrator and normal user accounts.
                </p>

            </div>

            <div className="border border-[#e5e7eb] rounded-2xl p-5 mb-6">

                <h2 className="font-semibold text-[#081534] mb-4">
                    Filters
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                    <input
                        type="text"
                        placeholder="Filter by Name"
                        value={nameFilter}
                        onChange={(e) =>
                            setNameFilter(e.target.value)
                        }
                        className="h-11 border border-[#e2e8f0] rounded-xl px-4 outline-none focus:border-[#ff7b5c]"
                    />

                    <input
                        type="text"
                        placeholder="Filter by Email"
                        value={emailFilter}
                        onChange={(e) =>
                            setEmailFilter(e.target.value)
                        }
                        className="h-11 border border-[#e2e8f0] rounded-xl px-4 outline-none focus:border-[#ff7b5c]"
                    />

                    <input
                        type="text"
                        placeholder="Filter by Address"
                        value={addressFilter}
                        onChange={(e) =>
                            setAddressFilter(e.target.value)
                        }
                        className="h-11 border border-[#e2e8f0] rounded-xl px-4 outline-none focus:border-[#ff7b5c]"
                    />

                    <select
                        value={roleFilter}
                        onChange={(e) =>
                            setRoleFilter(e.target.value)
                        }
                        className="h-11 border border-[#e2e8f0] rounded-xl px-4 outline-none focus:border-[#ff7b5c]"
                    >
                        <option value="">
                            All Roles
                        </option>

                        <option value="Admin">
                            Admin
                        </option>

                        <option value="Normal User">
                            Normal User
                        </option>

                    </select>

                </div>

            </div>

            <div className="overflow-x-auto border border-[#e5e7eb] rounded-2xl">

                <table className="w-full min-w-237.5">

                    <thead>

                        <tr className="bg-[#f8fafc] border-b border-[#e5e7eb]">

                            <th
                                onClick={() =>
                                    handleSort("name")
                                }
                                className="px-6 py-4 text-left font-semibold text-[#081534] cursor-pointer select-none"
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
                                className="px-6 py-4 text-left font-semibold text-[#081534] cursor-pointer select-none"
                            >
                                <div className="flex items-center gap-2">
                                    Email
                                    {getSortIcon("email")}
                                </div>
                            </th>

                            <th
                                onClick={() =>
                                    handleSort("address")
                                }
                                className="px-6 py-4 text-left font-semibold text-[#081534] cursor-pointer select-none"
                            >
                                <div className="flex items-center gap-2">
                                    Address
                                    {getSortIcon("address")}
                                </div>
                            </th>

                            <th
                                onClick={() =>
                                    handleSort("role")
                                }
                                className="px-6 py-4 text-left font-semibold text-[#081534] cursor-pointer select-none"
                            >
                                <div className="flex items-center gap-2">
                                    Role
                                    {getSortIcon("role")}
                                </div>
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredUsers.length > 0 ? (

                            filteredUsers.map((user) => (

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

                                    <td className="px-6 py-4 text-[#64748b]">
                                        {user.address}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span
                                            className={
                                                user.role === "Admin"
                                                    ? "bg-[#fff3ef] text-[#ff7b5c] px-3 py-1 rounded-full text-sm font-medium"
                                                    : "bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                                            }
                                        >
                                            {user.role}
                                        </span>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="text-center py-12 text-[#64748b]"
                                >
                                    No users found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );
};

export default AdminNormalUsers;