"use client";

import { useEffect, useState } from "react";
import { server } from "../../_api/api";
import DishFormDialog from "./_features/dish-form-dialog";
import ConfirmDialog from "../_components/confirm-dialog";
import { useTheme } from "../_components/theme-context";

export default function DishesPage() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [category, setCategory] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [image, setImage] = useState(null);
    const [editingFood, setEditingFood] = useState(null);
    const [deletingFood, setDeletingFood] = useState(null);
    const { darkMode } = useTheme();

    const getFoods = async () => {
        try {
            const response = await server.get("/food");
            setFoods(response.data.foods);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFoods();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let imageUrl = "";

            if (image) {
                const formData = new FormData();
                formData.append("image", image);

                const uploadResponse = await server.post(
                    "/food/upload-image",
                    formData
                );

                imageUrl = uploadResponse.data.image;
            }
            if (editingFood) {
                await server.put(`/food/${editingFood._id}`, {
                    name,
                    price: Number(price),
                    discount: Number(discount) || 0,
                    category,
                    ingredients,
                    image: imageUrl,
                });
            } else {
                await server.post("/food", {
                    name,
                    price: Number(price),
                    discount: Number(discount) || 0,
                    category,
                    ingredients,
                    image: imageUrl,
                });
            }

            setShowForm(false);
            setEditingFood(null);
            setName("");
            setPrice("");
            setDiscount("");
            setCategory("");
            setIngredients("");
            setImage("");
            setEditingFood(null);
            await getFoods();
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async (id) => {
        try {
            await server.delete(`food/${id}`);
            await getFoods();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            className={
                darkMode
                    ? "min-h-screen bg-[#252624] text-white"
                    : "min-h-screen bg-gray-100 text-black"
            }
        >

            {/* TOP BAR */}
            <header className="h-20 border-b border-white/10 px-8 flex items-center justify-between">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">
                        Dishes
                    </h2>

                    <button
                        type="button"
                        onClick={() => setShowForm(true)}
                        className="bg-[#ff4b45] text-white px-5 py-3 rounded-xl font-medium"
                    >
                        + New dish
                    </button>

                </div>

                <div className="text-sm text-gray-400">
                    Admin
                </div>
            </header>

            {/* CONTENT */}
            <main className="p-8">

                {showForm && (
                    <DishFormDialog
                        name={name}
                        setName={setName}
                        price={price}
                        setPrice={setPrice}
                        discount={discount}
                        setDiscount={setDiscount}
                        category={category}
                        setCategory={setCategory}
                        ingredients={ingredients}
                        setIngredients={setIngredients}
                        image={image}
                        setImage={setImage}
                        onSubmit={handleSubmit}
                        onClose={() => setShowForm(false)}
                    />
                )}
                {deletingFood && (
                    <ConfirmDialog
                        onCancel={() => setDeletingFood(null)}
                        onConfirm={async () => {
                            await handleDelete(deletingFood._id);
                            setDeletingFood(null);
                        }}
                    />
                )}

                <h2 className="text-2xl font-semibold mb-6">
                    All Dishes
                </h2>



                {loading ? (
                    <p>Loading...</p>
                ) : foods.length === 0 ? (
                    <p className="text-gray-400">
                        No dishes found.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {foods.map((food) => (
                            <div
                                key={food._id}
                                className="bg-[#30312e] rounded-2xl p-4 border border-white/5"
                            >
                                {food.image ? (
                                    <img
                                        src={food.image}
                                        alt={food.name}
                                        className="w-full h-48 object-cover rounded-xl mb-4"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-[#1b1c1a] rounded-xl mb-4 flex items-center justify-center text-gray-500">
                                        No image
                                    </div>
                                )}
                                <h3 className="text-lg font-semibold">
                                    {food.name}
                                </h3>

                                <p className="text-gray-400 mt-2">
                                    {food.ingredients}
                                </p>

                                <p className="mt-4">
                                    ₮{food.price.toLocaleString()}
                                </p>

                                <p className="text-sm text-gray-400">
                                    {food.category}
                                </p>
                                <div className="flex gap-3 mt-5">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingFood(food);
                                            setShowForm(true);

                                            setName(food.name);
                                            setPrice(food.price);
                                            setDiscount(food.discount || "");
                                            setCategory(food.category);
                                            setIngredients(food.ingredients || "");
                                            setImage(food.image || "");
                                        }}
                                        className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-lg transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setDeletingFood(food)}
                                        className="flex-1 bg-[#e85b52]/20 text-[#e85b52] hover:bg-[#e85b52]/30 py-2 rounded-lg transition"
                                    >
                                        Delete

                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                )}

            </main>
        </div>
    );
}