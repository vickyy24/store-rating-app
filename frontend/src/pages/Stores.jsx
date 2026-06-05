import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import {
    FaSort,
    FaSortUp,
    FaSortDown,
    FaStar
} from "react-icons/fa";

const Stores = () => {

    const [stores, setStores] = useState([]);

    const [storeNameFilter, setStoreNameFilter] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const [addressFilter, setAddressFilter] = useState("");
    const [ratingFilter, setRatingFilter] = useState("");

    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {

        axios({
            url: "http://localhost:9000/store-list",
            method: "GET",
            withCredentials: true
        })
        .then((response) => {

            setStores(response.data);

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

    const filteredStores = useMemo(() => {

        const filtered = stores.filter((store) => {

            return (

                store.store_name
                    .toLowerCase()
                    .includes(
                        storeNameFilter.toLowerCase()
                    )

                &&

                store.email
                    .toLowerCase()
                    .includes(
                        emailFilter.toLowerCase()
                    )

                &&

                store.address
                    .toLowerCase()
                    .includes(
                        addressFilter.toLowerCase()
                    )

                &&

                (
                    ratingFilter === "" ||
                    Math.round(
                        Number(store.Rating || 0)
                    ) === Number(ratingFilter)
                )

            );

        });

        if (!sortField) {
            return filtered;
        }

        return [...filtered].sort((a, b) => {

            if (sortField === "Rating") {

                const ratingA =
                    Number(a.Rating || 0);

                const ratingB =
                    Number(b.Rating || 0);

                return sortOrder === "asc"
                    ? ratingA - ratingB
                    : ratingB - ratingA;

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
        stores,
        storeNameFilter,
        emailFilter,
        addressFilter,
        ratingFilter,
        sortField,
        sortOrder
    ]);

    return (

        <div className="bg-white border border-[#e5e7eb] rounded-2xl shadow-sm min-h-152 p-8">

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-[#081534]">
                    Stores
                </h1>

                <p className="text-[#64748b] mt-2">
                    View and manage stores across the platform.
                </p>

            </div>

            <div className="border border-[#e5e7eb] rounded-2xl p-5 mb-6">

                <h2 className="font-semibold text-[#081534] mb-4">
                    Filters
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                    <input
                        type="text"
                        placeholder="Filter by Store Name"
                        value={storeNameFilter}
                        onChange={(e) =>
                            setStoreNameFilter(e.target.value)
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
                        value={ratingFilter}
                        onChange={(e) =>
                            setRatingFilter(e.target.value)
                        }
                        className="h-11 border border-[#e2e8f0] rounded-xl px-4 outline-none focus:border-[#ff7b5c]"
                    >
                        <option value="">
                            All Ratings
                        </option>

                        <option value="1">
                            1
                        </option>

                        <option value="2">
                            2
                        </option>

                        <option value="3">
                            3
                        </option>

                        <option value="4">
                            4
                        </option>

                        <option value="5">
                            5
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
                                    handleSort("store_name")
                                }
                                className="px-6 py-4 text-left font-semibold text-[#081534] cursor-pointer hover:text-[#ff7b5c]"
                            >
                                <div className="flex items-center gap-2">
                                    Store Name
                                    {getSortIcon("store_name")}
                                </div>
                            </th>

                            <th
                                onClick={() =>
                                    handleSort("email")
                                }
                                className="px-6 py-4 text-left font-semibold text-[#081534] cursor-pointer hover:text-[#ff7b5c]"
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
                                className="px-6 py-4 text-left font-semibold text-[#081534] cursor-pointer hover:text-[#ff7b5c]"
                            >
                                <div className="flex items-center gap-2">
                                    Address
                                    {getSortIcon("address")}
                                </div>
                            </th>

                            <th
                                onClick={() =>
                                    handleSort("Rating")
                                }
                                className="px-6 py-4 text-left font-semibold text-[#081534] cursor-pointer hover:text-[#ff7b5c]"
                            >
                                <div className="flex items-center gap-2">
                                    Rating
                                    {getSortIcon("Rating")}
                                </div>
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredStores.length > 0 ? (

                            filteredStores.map((store) => (

                                <tr
                                    key={store.store_id}
                                    className="border-b border-[#f1f5f9] hover:bg-[#fafafa]"
                                >

                                    <td className="px-6 py-4 text-[#081534]">
                                        {store.store_name}
                                    </td>

                                    <td className="px-6 py-4 text-[#64748b]">
                                        {store.email}
                                    </td>

                                    <td className="px-6 py-4 text-[#64748b]">
                                        {store.address}
                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-2">

                                            <span className="font-medium text-[#081534]">
                                                {store.Rating ? Number(store.Rating).toFixed(1) : "-"}
                                            </span>

                                            <FaStar className="text-yellow-500" />
                                        </div>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="text-center py-12 text-[#64748b]"
                                >
                                    No stores found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );
};

export default Stores;