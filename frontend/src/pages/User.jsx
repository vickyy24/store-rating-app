import { useEffect, useState } from "react";
import axios from "axios";

import {
    FaStar,
    FaMapMarkerAlt,
    FaTimes,
    FaSignOutAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const User = () => {

    const [stores, setStores] = useState([]);

    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);

    const [selectedStore, setSelectedStore] = useState(null);

    const [selectedRating, setSelectedRating] = useState(null);

    const [notification, setNotification] = useState({
        show: false,
        type: "",
        message: ""
    });

    const navigate = useNavigate();
    const fetchStores = () => {

        axios({
            url: "http://localhost:9000/all-stores",
            method: "GET",
            withCredentials: true
        })
        .then((response) => {

            setStores(response.data);

        })
        .catch((error) => {

            console.log(error);

        })
        .finally(() => {

            setLoading(false);

        });

    };

    useEffect(() => {

        fetchStores();

    }, []);

    useEffect(() => {

        if (notification.show) {

            const timer = setTimeout(() => {

                setNotification({
                    show: false,
                    type: "",
                    message: ""
                });

            }, 5000);

            return () => clearTimeout(timer);

        }

    }, [notification]);

    const openModal = (store) => {

        setSelectedStore(store);

        setSelectedRating(
            store.UserSubmittedRating || null
        );

        setModalOpen(true);

    };

    const closeModal = () => {

        setModalOpen(false);

        setSelectedStore(null);

        setSelectedRating(null);

    };

    const handleRatingSubmit = () => {

        if (!selectedRating) {

            setNotification({
                show: true,
                type: "error",
                message: "Please select a rating"
            });

            return;

        }

        const apiUrl =
            selectedStore.UserSubmittedRating
                ? "http://localhost:9000/update-rating"
                : "http://localhost:9000/submit-rating";

        const method =
            selectedStore.UserSubmittedRating
                ? "PUT"
                : "POST";

        axios({
            url: apiUrl,
            method,
            withCredentials: true,
            data: {
                StoreId: selectedStore.store_id,
                Rating: selectedRating
            }
        })
        .then((response) => {

            setNotification({
                show: true,
                type: "success",
                message: response.data.message
            });

            closeModal();

            fetchStores();

        })
        .catch((error) => {

            setNotification({
                show: true,
                type: "error",
                message:
                    error.response?.data?.message ||
                    "Something went wrong"
            });

        });

    };
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

        <div className="bg-[#f8fafc] min-h-full p-4 md:p-6">

            {notification.show && (

                <div
                    className={`mb-6 px-5 py-3 rounded-xl border ${
                        notification.type === "success"
                            ? "bg-green-50 border-green-200 text-green-700"
                            : "bg-red-50 border-red-200 text-red-700"
                    }`}
                >
                    {notification.message}
                </div>

            )}

            <div className="flex items-center justify-between mb-2">

                <h1 className="text-3xl md:text-4xl font-bold text-[#081534]">
                    Stores
                </h1>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-[#ff7b5c] hover:bg-[#ff6b47] text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-300 cursor-pointer"
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

            <p className="text-[#64748b] mt-2 mb-8 text-sm md:text-base">
                Discover stores and share your ratings.
            </p>

            {loading ? (

                <div className="text-center text-[#64748b] py-20">
                    Loading Stores...
                </div>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {stores.map((store) => (

                        <div
                            key={store.store_id}
                            className="bg-white border border-[#e5e7eb] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6"
                        >

                            <h2 className="text-2xl font-bold text-[#081534] mb-4">
                                {store.store_name}
                            </h2>

                            <div className="flex items-start gap-2 text-[#64748b] mb-5">

                                <FaMapMarkerAlt className="mt-1 text-[#ff7b5c]" />

                                <span>
                                    {store.address}
                                </span>

                            </div>

                            <div className="border-t border-[#f1f5f9] pt-4">

                                <div className="mb-4">

                                    <p className="text-sm text-[#64748b] mb-1">
                                        Overall Rating
                                    </p>

                                    <div className="flex items-center gap-2">

                                        <span className="text-xl font-bold text-[#081534]">

                                            {store.OverallRating
                                                ? Number(
                                                    store.OverallRating
                                                ).toFixed(1)
                                                : "-"
                                            }

                                        </span>

                                        <FaStar className="text-yellow-500" />

                                    </div>

                                </div>

                                <div className="mb-6">

                                    <p className="text-sm text-[#64748b] mb-1">
                                        Your Rating
                                    </p>

                                    <div className="flex items-center gap-2">

                                        <span className="text-xl font-bold text-[#081534]">

                                            {store.UserSubmittedRating
                                                ? store.UserSubmittedRating
                                                : "-"
                                            }

                                        </span>

                                        {store.UserSubmittedRating && (

                                            <FaStar className="text-yellow-500" />

                                        )}

                                    </div>

                                </div>

                                <button
                                    onClick={() =>
                                        openModal(store)
                                    }
                                    className="w-full h-11 rounded-xl bg-[#ff7b5c] hover:bg-[#ff6b47] text-white font-semibold transition-all duration-300 cursor-pointer"
                                >
                                    {store.UserSubmittedRating
                                        ? "Update Rating"
                                        : "Submit Rating"
                                    }
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}
                        {modalOpen && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

                    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

                        <div className="flex items-center justify-between mb-6">

                            <h2 className="text-2xl font-bold text-[#081534]">
                                Rate Store
                            </h2>

                            <button
                                onClick={closeModal}
                                className="h-9 w-9 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 cursor-pointer"
                            >
                                <FaTimes />
                            </button>

                        </div>

                        <p className="text-[#64748b] mb-6">
                            {selectedStore?.store_name}
                        </p>

                        <div className="grid grid-cols-5 gap-3 mb-8">

                            {[1, 2, 3, 4, 5].map((rating) => (

                                <button
                                    key={rating}
                                    onClick={() =>
                                        setSelectedRating(rating)
                                    }
                                    className={`h-12 rounded-xl border font-semibold transition-all duration-300 cursor-pointer ${
                                        selectedRating === rating
                                            ? "bg-[#ff7b5c] text-white border-[#ff7b5c]"
                                            : "border-[#e5e7eb] text-[#081534] hover:border-[#ff7b5c]"
                                    }`}
                                >
                                    {rating}
                                </button>

                            ))}

                        </div>

                        <div className="flex gap-3">

                            <button
                                onClick={closeModal}
                                className="flex-1 h-11 rounded-xl border border-[#e5e7eb] text-[#081534] font-semibold cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleRatingSubmit}
                                className="flex-1 h-11 rounded-xl bg-[#ff7b5c] hover:bg-[#ff6b47] text-white font-semibold cursor-pointer"
                            >
                                {selectedStore?.UserSubmittedRating
                                    ? "Update Rating"
                                    : "Submit Rating"
                                }
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

};

export default User;