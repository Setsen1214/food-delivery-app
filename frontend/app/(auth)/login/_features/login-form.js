"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { server } from "../../../_api/api";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await server.post("/auth/login", {
                email,
                password,
            });

            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            if (user.role === "ADMIN") {
                router.push("/admin");
            } else {
                router.push("/main");
            }
        } catch (error) {
            console.log("LOGIN ERROR:", error);
            console.log("RESPONSE:", error.response);
            console.log("RESPONSE DATA:", error.response?.data);

            setError(
                error.response?.data?.message || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-screen min-h-screen flex bg-white">

            {/* LEFT SIDE - LOGIN FORM */}
            <section className="flex-[0_0_40%] flex items-center justify-center px-12 py-12">
                <div className="w-full max-w-md">

                    {/* BACK BUTTON */}
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="w-9 h-9 border border-gray-200 rounded-md flex items-center justify-center text-gray-600 mb-10"
                    >
                        ←
                    </button>

                    {/* TITLE */}
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Welcome back
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        Log in to your account
                    </p>

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
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

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
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
                            {loading ? "Logging in..." : "Let's Go"}
                        </button>
                    </form>

                    {/* SIGN UP */}
                    <p className="text-center text-xs text-gray-500 mt-5">
                        Don't have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="text-blue-600 hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>

                </div>
            </section>

            {/* RIGHT SIDE - IMAGE */}
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