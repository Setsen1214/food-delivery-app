"use client";

import { useState } from "react";
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
        <div className="auth-box">
            <h1>Login</h1>

            <p>Login to your account</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
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
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p>
                Don't have an account?{" "}
                <Link href="/sign-up">
                    Sign up
                </Link>
            </p>
        </div>
    );
}