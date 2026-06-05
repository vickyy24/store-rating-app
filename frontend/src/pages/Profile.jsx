import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [oldPasswordError, setOldPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

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

        setOldPasswordError("");
        setNewPasswordError("");
        setConfirmPasswordError("");

        if (!oldPassword.trim()) {

            setOldPasswordError(
                "Old Password is required"
            );

            isValid = false;

        }

        if (!newPassword.trim()) {

            setNewPasswordError(
                "New Password is required"
            );

            isValid = false;

        }
        else if (
            newPassword.length < 8 ||
            newPassword.length > 16
        ) {

            setNewPasswordError(
                "Password must be between 8 and 16 characters"
            );

            isValid = false;

        }

        if (!confirmPassword.trim()) {

            setConfirmPasswordError(
                "Confirm Password is required"
            );

            isValid = false;

        }
        else if (
            newPassword !== confirmPassword
        ) {

            setConfirmPasswordError(
                "Passwords do not match"
            );

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
            url: "http://localhost:9000/change-password",
            method: "POST",
            withCredentials: true,
            data: {
                OldPassword: oldPassword,
                NewPassword: newPassword
            }
        })
        .then((response) => {

            setNotification({
                show: true,
                type: "success",
                message: response.data.message
            });

            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

        })
        .catch((error) => {

            setNotification({
                show: true,
                type: "error",
                message:
                    error.response?.data?.message ||
                    "Something went wrong"
            });

        })
        .finally(() => {

            setLoading(false);

        });

    };

    return (

        <div className="bg-[#f8fafc] min-h-full p-4 md:p-6">

            <div className="bg-white border border-[#e5e7eb] rounded-2xl shadow-sm p-8 max-w-2xl mx-auto">

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-[#081534]">
                        My Profile
                    </h1>

                    <p className="text-[#64748b] mt-2">
                        Manage your account settings and password.
                    </p>

                </div>

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

                <h2 className="text-xl font-semibold text-[#081534] mb-5">
                    Change Password
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="block font-semibold text-[#081534] mb-1">
                            Old Password
                        </label>

                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) =>
                                setOldPassword(
                                    e.target.value
                                )
                            }
                            className="w-full h-11 border border-[#e2e8f0] rounded-xl px-4 outline-none"
                        />

                        {oldPasswordError && (

                            <p className="text-red-500 text-xs mt-1">
                                {oldPasswordError}
                            </p>

                        )}

                    </div>

                    <div>

                        <label className="block font-semibold text-[#081534] mb-1">
                            New Password
                        </label>

                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(
                                    e.target.value
                                )
                            }
                            className="w-full h-11 border border-[#e2e8f0] rounded-xl px-4 outline-none"
                        />

                        {newPasswordError && (

                            <p className="text-red-500 text-xs mt-1">
                                {newPasswordError}
                            </p>

                        )}

                    </div>

                    <div>

                        <label className="block font-semibold text-[#081534] mb-1">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            className="w-full h-11 border border-[#e2e8f0] rounded-xl px-4 outline-none"
                        />

                        {confirmPasswordError && (

                            <p className="text-red-500 text-xs mt-1">
                                {confirmPasswordError}
                            </p>

                        )}

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 rounded-xl bg-[#ff7b5c] text-white font-semibold"
                    >
                        {loading
                            ? "Updating..."
                            : "Update Password"}
                    </button>

                </form>

            </div>

        </div>

    );
};

export default Profile;