"use client";

import { useEffect, useState } from "react";
import { server } from "../_api/api";
import FoodCard from "./components/food-card";
import Header from "./components/header";
import Hero from "./components/hero";
export default function MainPage() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cart, setCart] = useState([]);
    const categories = [...new Set(foods.map((food) => food.category))];

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
        <>
            <Header cartCount={cart.length} />

            <Hero />

            <main
                id="menu"
                className="bg-[#3f3f3f] min-h-screen px-6 py-12"
            >
                <div className="max-w-7xl mx-auto">


                    <h2 className="text-2xl font-semibold text-white mb-8">
                        Appetizers
                    </h2>


                    {foods.length === 0 ? (
                        <p className="text-white">
                            No foods available yet.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {foods.map((food) => (
                                <FoodCard
                                    key={food._id}
                                    food={food}
                                    onAdd={handleAddToCart}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </main>
        </>
    );
}