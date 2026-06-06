import { useEffect, useState } from "react";
import axios from "axios";

const AddStore = () => {

    const [storeOwners, setStoreOwners] = useState([]);

    const [storeOwner, setStoreOwner] = useState("");
    const [storeName, setStoreName] = useState("");

    const [storeOwnerError, setStoreOwnerError] = useState("");
    const [storeNameError, setStoreNameError] = useState("");

    const [loading, setLoading] = useState(false);

    const [notification, setNotification] = useState({
        show: false,
        type: "",
        message: ""
    });

    useEffect(() => {

        axios({
            url: "http://localhost:9000/store-owners",
            method: "GET",
            withCredentials: true
        })
        .then((response) => {
            setStoreOwners(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

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

    const validateForm = () => {

        let isValid = true;

        setStoreOwnerError("");
        setStoreNameError("");

        if (!storeOwner) {

            setStoreOwnerError("Please select a Store Owner");

            isValid = false;

        }

        const storeNameRegex = /^(?=.*[A-Za-z])[A-Za-z0-9\s&().,'-]{3,255}$/;
        if (!storeName.trim()) {

            setStoreNameError("Store Name is required");
            isValid = false;

        }
        else if (!storeNameRegex.test(storeName.trim())) {

            setStoreNameError("Store Name must be 3-255 characters and contain only valid characters");

            isValid = false;

        }

        return isValid;

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        axios({
            url: "http://localhost:9000/add-store",
            method: "POST",
            withCredentials: true,
            data: { UserId: storeOwner, StoreName: storeName}
        })
        .then((response) => {

            setNotification({
                show: true,
                type: "success",
                message: response.data.message
            });

            setStoreOwner("");
            setStoreName("");

        })
        .catch((error) => {

            setNotification({
                show: true,
                type: "error",
                message: error.response?.data?.message || "Something went wrong"
            });

        })
        .finally(() => {

            setLoading(false);

        });

    };

    return (

        <div className="bg-white border border-[#e5e7eb] rounded-2xl shadow-sm min-h-152 p-8">

            {notification.show && (

                <div className={`mb-6 px-5 py-3 rounded-xl border ${
                    notification.type === "success"
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-red-50 border-red-200 text-red-700"
                    }`}
                >
                    {notification.message}
                </div>

            )}

            <div className="w-full max-w-md">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#081534]">Add Store</h1>
                    <p className="text-[#64748b] mt-2"> Create a new store and assign it to a Store Owner.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>

                        <label className="block font-semibold text-[#081534] mb-1">Store Owner</label>

                        <select value={storeOwner} onChange={(e) =>setStoreOwner(e.target.value)} className="w-full h-10 border border-[#e2e8f0] rounded-xl px-4 outline-none focus:border-gray-500">

                            <option value="">  Select Store Owner</option>
                            {storeOwners.map((owner) => (

                                <option key={owner.user_id} value={owner.user_id}>
                                    {owner.name}
                                </option>

                            ))}

                        </select>

                        {storeOwnerError && (
                            <p className="text-red-500 text-xs mt-1">
                                {storeOwnerError}
                            </p>
                        )}

                    </div>

                    <div>

                        <label className="block font-semibold text-[#081534] mb-1">Store Name</label>
                        <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="Enter Store Name"
                            className="w-full h-10 border border-[#e2e8f0] rounded-xl px-4 outline-none focus:border-gray-500"
                        />

                        {storeNameError && (
                            <p className="text-red-500 text-xs mt-1">{storeNameError}</p>
                        )}

                    </div>

                    <button type="submit" disabled={loading} className="w-full h-10 rounded-xl bg-[#ff7b5c] text-white font-semibold">
                        {loading ? "Adding..." : "Add Store"}
                    </button>

                </form>

            </div>

        </div>

    );
};

export default AddStore;