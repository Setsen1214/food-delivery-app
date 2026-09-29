"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { server } from "../../../_api/api";

export default function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
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

            router.push("/main");
        } catch (error) {
            setError(
                error.response?.data?.message || "Sign up failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-box">
            <h1>Sign Up</h1>

            <p>Create your account</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />

                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Sign Up"}
                </button>
            </form>

            <p>
                Already have an account?{" "}
                <Link href="/login">
                    Login
                </Link>
            </p>
        </div>
    );
}