"use client";

import { useEffect, useState } from "react";
import { server } from "../_api/api";
import FoodCard from "./components/food-card";

export default function MainPage() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cart, setCart] = useState([]);

    const fetchFoods = async () => {
        try {
            const response = await server.get("/food");

            setFoods(response.data.foods);
        } catch (error) {
            console.log(error);

            setError("Failed to load foods");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    const handleAddToCart = (food) => {
        setCart((currentCart) => {
            const existingFood = currentCart.find(
                (item) => item._id === food._id
            );
            if (existingFood) {
                return currentCart.map((item) =>
                    item._id === food._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...currentCart, { ...food, quantity: 1 }];
        });
    };
    const increaseQuantity = (foodId) => {
        setCart((currentCart) =>
            currentCart.map((item) =>
                item._id === foodId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (foodId) => {
        setCart((currentCart) =>
            currentCart
                .map((item) =>
                    item._id === foodId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (foodId) => {
        setCart((currentCart) =>
            currentCart.filter((item) => item._id !== foodId)
        );
    };
    const cartTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    if (loading) {
        return <p>Loading foods...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Food Delivery
            </h1>
            <p className="mb-6">
                Cart items: {cart.length}
            </p>
            <div className="mt-10 border rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4">
                    Your Cart
                </h2>

                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="border rounded-lg p-4"
                            >
                                <h3 className="font-semibold">
                                    {item.name}
                                </h3>

                                <p>
                                    ₮{item.price.toLocaleString()}
                                </p>

                                <div className="flex items-center gap-3 mt-2">
                                    <button
                                        onClick={() => decreaseQuantity(item._id)}
                                        className="border px-3 py-1 rounded"
                                    >
                                        -
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        onClick={() => increaseQuantity(item._id)}
                                        className="border px-3 py-1 rounded"
                                    >
                                        +
                                    </button>

                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="ml-4 text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="border-t pt-4">
                            <p className="text-xl font-bold">
                                Total: ₮{cartTotal.toLocaleString()}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {foods.length === 0 ? (
                <p>No foods available yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {foods.map((food) => (
                        <FoodCard
                            key={food._id}
                            food={food}
                            onAdd={handleAddToCart}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}