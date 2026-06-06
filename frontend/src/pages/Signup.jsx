import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { FaStore } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMapPin } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        setConfirmPasswordError("");

        const nameRegex = /^(?=.{20,60}$)(?=.*[A-Za-z])[A-Za-z\s.'-]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const addressRegex = /^(?=.{1,400}$)(?=.*[A-Za-z])[A-Za-z0-9\s,.'#\/()-]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;

        if (!name.trim()) {
            setNameError("Name is required");
            isValid = false;
        }
        else if (!nameRegex.test(name.trim())) {
            setNameError("Name must be 20-60 characters and contain valid characters only");
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
        else if (!addressRegex.test(address.trim())) {
            setAddressError("Address must be 1-400 characters and contain at least one letter");
            isValid = false;
        }

        if (!password.trim()) {
            setPasswordError("Password is required");
            isValid = false;
        }
        else if (!passwordRegex.test(password)) {
            setPasswordError("Password must be 8-16 characters with at least one uppercase letter and one special character");
            isValid = false;
        }

        if (!confirmPassword.trim()) {
            setConfirmPasswordError("Confirm Password is required");
            isValid = false;
        }
        else if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            isValid = false;
        }

        return isValid;

    };

    const handleSignup = (e) => {

        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        axios({
            url: "http://localhost:9000/signup",
            method: "POST",
            data: {
                Name: name,
                Email: email,
                Address: address,
                Password: password,
                Role: "Normal User"
            }
        })
        .then((response) => {

            setNotification({
                show: true,
                type: "success",
                message: response.data.message
            });

            setTimeout(() => {

                navigate("/");

            }, 1500);

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

        <div className="h-full rounded-3xl flex flex-col overflow-hidden">

            <div className="flex-1 grid lg:grid-cols-[1.2fr_0.8fr]">

                <div className="hidden lg:flex flex-col bg-[#fffaf7] px-14 pt-12">

                    <div className="flex items-center gap-4">

                        <FaStore className="text-[48px] text-[#ff7b5c]" />

                        <div>

                            <div className="text-[26px] font-bold text-[#081534]">
                                Store Rating
                            </div>

                            <div className="text-[15px] text-[#64748b] mt-1">
                                Rate. Review. Discover.
                            </div>

                        </div>

                    </div>

                    <div className="mt-40">

                        <div className="text-[44px] font-bold leading-tight text-[#081534]">
                            Create{" "}
                            <span className="text-[#ff7b5c]">
                                Account
                            </span>
                        </div>

                        <div className="mt-5 max-w-[320px] text-[16px] leading-[1.6] text-[#64748b]">
                            Sign up to start rating stores
                            <br />
                            and share your experience.
                        </div>

                        <div className="flex items-center gap-3 mt-6">

                            <div className="w-14 h-1 rounded-full bg-[#ff7b5c]" />

                            <div className="w-2 h-2 rounded-full bg-[#ff7b5c]" />

                        </div>

                    </div>

                </div>

                <div className="flex items-center justify-center px-6">

                    <div className="w-full max-w-125 bg-white rounded-3xl border border-[#f1f5f9] px-7">

                        <div className="text-center">

                            <div className="text-[30px] font-bold text-[#081534]">
                                Sign Up
                            </div>

                            <div className="text-[14px] text-[#64748b] mt-1">
                                Create a new account
                            </div>

                        </div>

                        <form onSubmit={handleSignup} className="mt-3">

                            <div>

                                <label htmlFor="name" className="block font-semibold text-[#081534]">
                                    Name
                                </label>

                                <div className="relative">

                                    <FaRegUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]" />

                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoComplete="name"
                                        placeholder="Enter your name"
                                        className="w-full h-10 border border-[#e2e8f0] rounded-xl pl-12 pr-4 outline-none"
                                    />

                                </div>

                                {nameError && (
                                    <p className="text-red-500 text-xs"> {nameError}</p>
                                )}

                            </div>

                            <div className="mt-2">

                                <label
                                    htmlFor="email"
                                    className="block font-semibold text-[#081534]"
                                >
                                    Email
                                </label>

                                <div className="relative">

                                    <MdOutlineEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]" />

                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                        placeholder="Enter your email"
                                        className="w-full h-10 border border-[#e2e8f0] rounded-xl pl-12 pr-4 outline-none"
                                    />

                                </div>

                                {emailError && (
                                    <p className="text-red-500 text-xs">
                                        {emailError}
                                    </p>
                                )}

                            </div>

                            <div className="mt-2">

                                <label
                                    htmlFor="address"
                                    className="block font-semibold text-[#081534]"
                                >
                                    Address
                                </label>

                                <div className="relative">

                                    <HiOutlineMapPin className="absolute left-4 top-4 text-[#64748b]" />

                                    <textarea
                                        id="address"
                                        rows="1"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        autoComplete="street-address"
                                        placeholder="Enter your address"
                                        className="w-full h-12.2 border border-[#e2e8f0] rounded-xl pl-12 pr-4 py-3 resize-none outline-none"
                                    />

                                </div>

                                {addressError && (
                                    <p className="text-red-500 text-xs">
                                        {addressError}
                                    </p>
                                )}

                            </div>

                            <div className="mt-2">

                                <label
                                    htmlFor="password"
                                    className="block  font-semibold text-[#081534]"
                                >
                                    Password
                                </label>

                                <div className="relative">

                                    <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]" />

                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="new-password"
                                        placeholder="Enter your password"
                                        className="w-full h-10 border border-[#e2e8f0] rounded-xl pl-12 pr-12 outline-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                                    >
                                        {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                                    </button>

                                </div>

                                {passwordError && (
                                    <p className="text-red-500 text-xs">
                                        {passwordError}
                                    </p>
                                )}

                            </div>

                            <div className="mt-2">

                                <label
                                    htmlFor="confirmPassword"
                                    className="block  font-semibold text-[#081534]"
                                >
                                    Confirm Password
                                </label>

                                <div className="relative">

                                    <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]" />

                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        autoComplete="new-password"
                                        placeholder="Confirm your password"
                                        className="w-full h-10 border border-[#e2e8f0] rounded-xl pl-12 pr-12 outline-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                                    >
                                        {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                                    </button>

                                </div>

                                {confirmPasswordError && (
                                    <p className="text-red-500 text-xs">
                                        {confirmPasswordError}
                                    </p>
                                )}

                            </div>

                            <div className="mt-2 bg-[#fff3ef] border border-[#ffe1d6] rounded-xl p-2 flex gap-3">

                                <RiLockPasswordLine className="text-[#ff7b5c] text-base shrink-0 mt-1" />

                                <div className="text-[12px] text-[#e65a3a] leading-5">
                                    Password must be 8–16 characters long and include at least one uppercase letter and one special character.
                                </div>

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-10 mt-2 rounded-xl bg-[#ff7b5c] text-white font-semibold cursor-pointer"
                            >
                                {loading ? "Creating..." : "Sign Up"}
                            </button>

                            <div className="flex items-center gap-4 my-2">

                                <div className="flex-1 h-px bg-[#e2e8f0]" />

                                <div className="text-[#64748b] text-sm">
                                    or
                                </div>

                                <div className="flex-1 h-px bg-[#e2e8f0]" />

                            </div>

                            <button
                                type="button"
                                className="w-full h-10 border border-[#e2e8f0] rounded-xl flex items-center justify-center gap-3"
                            >
                                <FcGoogle className="text-[20px]" />

                                <span className="font-medium text-[#081534]">
                                    Continue with Google
                                </span>

                            </button>

                            <div className="text-center mt-2 text-[14px] text-[#64748b]">

                                Already have an account?

                                <Link
                                    to="/"
                                    className="ml-2 text-[#ff7b5c] font-semibold"
                                >
                                    Login
                                </Link>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

            <div className="h-12 border-t border-[#f1f5f9] px-12 flex items-center justify-between text-[13px] text-[#64748b]">

                <div>
                    © 2026 Store Rating. All rights reserved.
                </div>

                <div className="flex gap-8">

                    <div>Terms of Service</div>

                    <div>Privacy Policy</div>

                </div>

            </div>

        </div>

    </div>
);
};

export default Signup;