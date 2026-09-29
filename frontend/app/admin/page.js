"use client";

import { useState } from "react";
import { server } from "../_api/api";

export default function AdminPage() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [category, setCategory] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await server.post("/food", {
                name,
                price: Number(price),
                discount: Number(discount) || 0,
                category,
                ingredients,
            });

            console.log(response.data);

            setMessage("Food added successfully!");

            setName("");
            setPrice("");
            setDiscount("");
            setCategory("");
            setIngredients("");
        } catch (error) {
            console.log(error);

            setMessage(
                error.response?.data?.message || "Failed to add food"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Admin Dashboard
            </h1>

            <h2 className="text-xl font-semibold mb-4">
                Add Food
            </h2>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 max-w-md"
            >
                <input
                    type="text"
                    placeholder="Food name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Discount (%)"
                    value={discount}
                    onChange={(event) => setDiscount(event.target.value)}
                    min="0"
                    max="100"
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Ingredients"
                    value={ingredients}
                    onChange={(event) =>
                        setIngredients(event.target.value)
                    }
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white py-2 rounded-lg"
                >
                    {loading ? "Adding..." : "Add Food"}
                </button>
            </form>

            {message && (
                <p className="mt-4">
                    {message}
                </p>
            )}
        </main>
    );
}