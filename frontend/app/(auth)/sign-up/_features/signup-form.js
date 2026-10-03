"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { server } from "../../../_api/api";

export default function SignupForm() {
    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEmailNext = (event) => {
        event.preventDefault();

        setError("");

        if (!email) {
            setError("Please enter your email.");
            return;
        }

        setStep(2);
    };

    const handleSignup = async (event) => {
        event.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError("Those passwords didn't match. Try again.");
            return;
        }

        if (!phoneNumber) {
            setError("Please enter your phone number.");
            return;
        }

        setLoading(true);

        try {
            const response = await server.post("/auth/signUp", {
                email,
                password,
                phoneNumber,
            });

            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            window.location.href = "/main";
        } catch (error) {
            setError(
                error.response?.data?.message || "Sign up failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-screen min-h-screen flex bg-white">

            {/* LEFT SIDE */}
            <section className="flex-[0_0_40%] flex items-center justify-center px-12 py-12">
                <div className="w-full max-w-md">

                    {/* BACK BUTTON */}
                    {step === 2 && (
                        <button
                            type="button"
                            onClick={() => {
                                setError("");
                                setStep(1);
                            }}
                            className="w-9 h-9 border border-gray-200 rounded-md flex items-center justify-center text-gray-600 mb-10"
                        >
                            ←
                        </button>
                    )}

                    {/* STEP 1 */}
                    {step === 1 ? (
                        <>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Create your account
                            </h1>

                            <p className="text-sm text-gray-500 mt-2">
                                Sign up to explore your favorite dishes.
                            </p>

                            <form
                                onSubmit={handleEmailNext}
                                className="mt-8"
                            >
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    className={`w-full h-10 border rounded-md px-3 text-sm outline-none ${error
                                            ? "border-red-400"
                                            : "border-gray-200"
                                        }`}
                                    required
                                />

                                {error && (
                                    <p className="text-red-500 text-xs mt-2">
                                        {error}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="w-full h-10 mt-4 rounded-md bg-gray-300 text-white text-sm font-medium"
                                >
                                    Let's Go
                                </button>
                            </form>

                            <p className="text-center text-xs text-gray-500 mt-5">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="text-blue-600 hover:underline"
                                >
                                    Log in
                                </Link>
                            </p>
                        </>
                    ) : (
                        /* STEP 2 */
                        <>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Create a strong password
                            </h1>

                            <p className="text-sm text-gray-500 mt-2">
                                Create a strong password with letters, numbers.
                            </p>

                            <form
                                onSubmit={handleSignup}
                                className="mt-8"
                            >
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    className="w-full h-10 border border-gray-200 rounded-md px-3 text-sm outline-none"
                                    required
                                />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm"
                                    value={confirmPassword}
                                    onChange={(event) =>
                                        setConfirmPassword(event.target.value)
                                    }
                                    className="w-full h-10 border border-gray-200 rounded-md px-3 text-sm outline-none mt-3"
                                    required
                                />

                                <label className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                                    <input
                                        type="checkbox"
                                        checked={showPassword}
                                        onChange={(event) =>
                                            setShowPassword(event.target.checked)
                                        }
                                    />
                                    Show password
                                </label>

                                <input
                                    type="text"
                                    placeholder="Phone number"
                                    value={phoneNumber}
                                    onChange={(event) =>
                                        setPhoneNumber(event.target.value)
                                    }
                                    className="w-full h-10 border border-gray-200 rounded-md px-3 text-sm outline-none mt-3"
                                    required
                                />

                                {error && (
                                    <p className="text-red-500 text-xs mt-2">
                                        {error}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-10 mt-4 rounded-md bg-gray-300 text-white text-sm font-medium"
                                >
                                    {loading
                                        ? "Creating account..."
                                        : "Let's Go"}
                                </button>
                            </form>

                            <p className="text-center text-xs text-gray-500 mt-5">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="text-blue-600 hover:underline"
                                >
                                    Log in
                                </Link>
                            </p>
                        </>
                    )}

                </div>
            </section>

            {/* RIGHT SIDE IMAGE */}
            <section className="flex-[0_0_60%] p-6">
                <div className="relative w-full h-[calc(100vh-48px)] overflow-hidden rounded-xl">
                    <Image
                        src="/images/delivery.png"
                        alt="Food delivery"
                        fill
                        priority
                        sizes="60vw"
                        className="object-cover object-center"
                    />
                </div>
            </section>

        </main>
    );
}
