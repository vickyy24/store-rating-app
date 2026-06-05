import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { FaStore } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const [notification, setNotification] = useState({
        show: false,
        type: "",
        message: ""
    });

    useEffect(() => {

        const savedEmail = localStorage.getItem("rememberedEmail");

        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }

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

        setEmailError("");
        setPasswordError("");

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;

        if (!email.trim()) {
            setEmailError("Email is required");
            isValid = false;
        }
        else if (!emailRegex.test(email)) {
            setEmailError("Enter a valid email address");
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

        return isValid;
    };

    const handleLogin = (e) => {

        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        axios({
            url: "http://localhost:9000/login",
            method: "POST",
            data: {
                Email: email,
                Password: password
            },
            withCredentials: true
        })
        .then((response) => {

            if (rememberMe) {
                localStorage.setItem(
                    "rememberedEmail",
                    email
                );
            }
            else {
                localStorage.removeItem(
                    "rememberedEmail"
                );
            }

            setNotification({
                show: true,
                type: "success",
                message: response.data.message
            });

            setTimeout(() => {

                if (response.data.Role === "Admin") {
                    navigate("/admin");
                }
                else if (
                    response.data.Role ===
                    "Normal User"
                ) {
                    navigate("/normal-user");
                }
                else if (
                    response.data.Role ===
                    "Store Owner"
                ) {
                    navigate("/store-owner");
                }

            }, 1000);
        })
        .catch((error) => {

            if (
                error.response &&
                error.response.status === 404
            ) {
                setEmailError(
                    error.response.data.message
                );
            }
            else if (
                error.response &&
                error.response.status === 401
            ) {
                setPasswordError(
                    error.response.data.message
                );
            }
            else {
                setNotification({
                    show: true,
                    type: "error",
                    message:
                        error.response?.data?.message ||
                        "Something went wrong"
                });
            }
        })
        .finally(() => {
            setLoading(false);
        });
    };
    return (
    <div className="h-screen bg-[#fdfaf8] p-4 overflow-hidden">

        {notification.show && (
            <div
                className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-lg border ${
                    notification.type === "success"
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-red-50 border-red-200 text-red-700"
                }`}
            >
                {notification.message}
            </div>
        )}

        <div className="h-full rounded-3xl flex flex-col">

            <div className="flex-1 grid lg:grid-cols-[1.08fr_0.92fr]">

                <div className="hidden lg:flex flex-col justify-between px-10 pt-12 pb-8">

                    <div>

                        <div className="flex items-center gap-4">

                            <FaStore className="text-[48px] text-[#ff7b5c]" />

                            <div>

                                <div className="text-[26px] font-bold text-[#081534]">
                                    Store Rating
                                </div>

                                <div className="text-[14px] text-[#64748b] mt-1">
                                    Rate. Review. Discover.
                                </div>

                            </div>

                        </div>

                        <div className="mt-52">

                            <div className="text-[52px] font-bold leading-none text-[#081534]">
                                Welcome
                                <span className="text-[#ff7b5c]">
                                    {" "}Back!
                                </span>
                            </div>

                            <div className="mt-8 max-w-90 text-[18px] leading-[1.8] text-[#64748b]">
                                Log in to your account to continue
                                rating and reviewing your
                                favorite stores.
                            </div>

                            <div className="flex items-center gap-3 mt-10">

                                <div className="w-14 h-1 rounded-full bg-[#ff7b5c]" />

                                <div className="w-2 h-2 rounded-full bg-[#ff7b5c]" />

                            </div>

                        </div>

                    </div>

                </div>

                <div className="flex items-center justify-center pr-16">

                    <div className="w-full max-w-125 bg-white border border-[#f1f5f9] rounded-3xl px-10 py-10">

                        <div className="text-center">

                            <div className="text-[34px] font-bold text-[#081534]">
                                Login
                            </div>

                            <div className="mt-3 text-[15px] text-[#64748b]">
                                Enter your credentials to access your account
                            </div>

                        </div>

                        <form
                            onSubmit={handleLogin}
                            className="mt-10"
                        >

                            <div>

                                <label
                                    htmlFor="email"
                                    className="block text-[16px] font-semibold text-[#081534] mb-3"
                                >
                                    Email
                                </label>

                                <div className="relative">

                                    <MdOutlineEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#64748b]" />

                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full h-13 border border-[#e2e8f0] rounded-xl pl-12 pr-4 outline-none"
                                    />

                                </div>

                                {emailError && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {emailError}
                                    </p>
                                )}

                            </div>

                            <div className="mt-6">

                                <label
                                    htmlFor="password"
                                    className="block text-[16px] font-semibold text-[#081534] mb-3"
                                >
                                    Password
                                </label>

                                <div className="relative">

                                    <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#64748b]" />

                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full h-13 border border-[#e2e8f0] rounded-xl pl-12 pr-12 outline-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <IoEyeOffOutline className="text-[20px] text-[#64748b]" />
                                        ) : (
                                            <IoEyeOutline className="text-[20px] text-[#64748b]" />
                                        )}
                                    </button>

                                </div>

                                {passwordError && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {passwordError}
                                    </p>
                                )}

                            </div>

                            <div className="flex items-center justify-between mt-6">

                                <label className="flex items-center gap-2">

                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />

                                    <span className="text-[14px] text-[#64748b]">
                                        Remember me
                                    </span>

                                </label>

                                <a
                                    href="#"
                                    className="text-[14px] text-[#ff7b5c] font-medium"
                                >
                                    Forgot Password?
                                </a>

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-13 mt-6 rounded-xl bg-[#ff7b5c] text-white font-semibold text-[18px] cursor-pointer"
                            >
                                {loading ? "Logging In..." : "Login"}
                            </button>

                            <div className="flex items-center gap-4 my-6">

                                <div className="flex-1 h-px bg-[#e2e8f0]" />

                                <div className="text-[#64748b] text-sm">
                                    or
                                </div>

                                <div className="flex-1 h-px bg-[#e2e8f0]" />

                            </div>

                            <button
                                type="button"
                                className="w-full h-13 border border-[#e2e8f0] rounded-xl flex items-center justify-center gap-3"
                            >
                                <FcGoogle className="text-[24px]" />

                                <span className="text-[16px] font-medium text-[#081534]">
                                    Continue with Google
                                </span>

                            </button>

                            <div className="text-center mt-6 text-[15px] text-[#64748b]">

                                Don't have an account?

                                <Link
                                    to="/signup"
                                    className="ml-2 font-semibold text-[#ff7b5c]"
                                >
                                    Sign up
                                </Link>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

            <div className="h-16 border-t border-[#f1f5f9] px-12 flex items-center justify-between text-[14px] text-[#64748b]">

                <div>
                    © 2026 Store Rating. All rights reserved.
                </div>

                <div className="flex gap-10">

                    <div>
                        Terms of Service
                    </div>

                    <div>
                        Privacy Policy
                    </div>

                </div>

            </div>

        </div>

    </div>
);
};

export default Login;