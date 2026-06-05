import { useState, useEffect } from "react";
import axios from "axios";

const AddUser = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [roleError, setRoleError] = useState("");

    const [loading, setLoading] = useState(false);

    const [notification, setNotification] = useState({
        show: false,
        type: "",
        message: ""
    });

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

        setNameError("");
        setEmailError("");
        setAddressError("");
        setPasswordError("");
        setRoleError("");

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;

        if (!name.trim()) {

            setNameError("Name is required");
            isValid = false;

        }
        else if (name.length < 20 || name.length > 60) {

            setNameError("Name must be between 20 and 60 characters");
            isValid = false;

        }

        if (!email.trim()) {

            setEmailError("Email is required");
            isValid = false;

        }
        else if (!emailRegex.test(email)) {

            setEmailError("Enter a valid email address");
            isValid = false;

        }

        if (!address.trim()) {

            setAddressError("Address is required");
            isValid = false;

        }
        else if (address.length > 400) {

            setAddressError("Address cannot exceed 400 characters");
            isValid = false;

        }

        if (!password.trim()) {

            setPasswordError("Password is required");
            isValid = false;

        }
        else if (!passwordRegex.test(password)) {

            setPasswordError(
                "Password must be 8-16 characters with at least one uppercase letter and one special character"
            );

            isValid = false;

        }

        if (!role) {

            setRoleError("Please select a role");
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
            url: "http://localhost:9000/add-user",
            method: "POST",
            withCredentials: true,
            data: {
                Name: name,
                Email: email,
                Address: address,
                Password: password,
                Role: role
            }
        })
        .then((response) => {

            setNotification({
                show: true,
                type: "success",
                message: response.data.message
            });

            setName("");
            setEmail("");
            setAddress("");
            setPassword("");
            setRole("");

        })
        .catch((error) => {

            if (
                error.response &&
                error.response.status === 409
            ) {

                setEmailError(
                    error.response.data.message
                );

            }
            else {

                setNotification({
                    show: true,
                    type: "error",
                    message: error.response?.data?.message || "Something went wrong"
                });

            }

        })
        .finally(() => {

            setLoading(false);

        });

    };

    return (

        <div className="bg-white border border-[#e5e7eb] rounded-2xl shadow-sm min-h-152 p-8">

            {notification.show && (

                <div className={`mb-6 px-5 py-3 rounded-xl border 
                    ${notification.type === "success"
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-red-50 border-red-200 text-red-700"
                    }`}
                >
                    {notification.message}
                </div>

            )}

            <div className="w-full max-w-md">

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-[#081534]">Add User</h1>
                    <p className="text-[#64748b] mt-2"> Create Admin, Store Owner or Normal User accounts.</p>

                </div>

                <form onSubmit={handleSubmit} className="space-y-4" >
                    <div>

                        <label className="block font-semibold text-[#081534] mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Full Name"
                            className="w-full h-10 border border-[#e2e8f0] rounded-xl px-4 outline-none"
                        />

                        {nameError && (
                            <p className="text-red-500 text-xs mt-1">
                                {nameError}
                            </p>
                        )}

                    </div>

                    <div>

                        <label className="block font-semibold text-[#081534] mb-1"> Email</label>

                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email Address"
                            className="w-full h-10 border border-[#e2e8f0] rounded-xl px-4 outline-none"
                        />

                        {emailError && (
                            <p className="text-red-500 text-xs mt-1">
                                {emailError}
                            </p>
                        )}

                    </div>

                    <div>

                        <label className="block font-semibold text-[#081534] mb-1">Address</label>

                        <textarea
                            rows="2"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter Address"
                            className="w-full border border-[#e2e8f0] rounded-xl px-4 py-3 resize-none outline-none"
                        />

                        {addressError && (
                            <p className="text-red-500 text-xs mt-1">
                                {addressError}
                            </p>
                        )}

                    </div>

                    <div>

                        <label className="block font-semibold text-[#081534] mb-1">Password</label>

                        <input
                            type="password"
                            value={password}
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className="w-full h-10 border border-[#e2e8f0] rounded-xl px-4 outline-none"
                        />

                        {passwordError && (
                            <p className="text-red-500 text-xs mt-1">
                                {passwordError}
                            </p>
                        )}

                    </div>

                    <div>

                        <label className="block font-semibold text-[#081534] mb-1">Role</label>

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full h-10 border border-[#e2e8f0] rounded-xl px-4 outline-none"
                        >
                            <option value="">
                                Select Role
                            </option>

                            <option value="Admin">
                                Admin
                            </option>

                            <option value="Normal User">
                                Normal User
                            </option>

                            <option value="Store Owner">
                                Store Owner
                            </option>

                        </select>

                        {roleError && (
                            <p className="text-red-500 text-xs mt-1">
                                {roleError}
                            </p>
                        )}

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-10 rounded-xl bg-[#ff7b5c] text-white font-semibold"
                    >
                        {loading ? "Adding..." : "Add User"}
                    </button>

                </form>

            </div>

        </div>

    );
};

export default AddUser;