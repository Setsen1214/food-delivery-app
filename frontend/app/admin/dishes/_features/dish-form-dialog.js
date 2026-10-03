"use client";

import ImageUpload from "./image-upload";

export default function DishFormDialog({
    name,
    setName,
    price,
    setPrice,
    discount,
    setDiscount,
    category,
    setCategory,
    ingredients,
    setIngredients,
    image,
    setImage,
    onSubmit,
    onClose,
}) {
    return (
        <div className="bg-[#30312e] rounded-2xl p-6 mb-8 max-w-2xl">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">
                    Add New Dish
                </h3>

                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 hover:text-white"
                >
                    ✕
                </button>
            </div>

            <form
                onSubmit={onSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <ImageUpload onChange={setImage} />

                <input
                    type="text"
                    placeholder="Food name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    className="bg-[#1b1c1a] border border-white/10 rounded-xl px-4 py-3 outline-none"
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    required
                    className="bg-[#1b1c1a] border border-white/10 rounded-xl px-4 py-3 outline-none"
                />

                <input
                    type="number"
                    placeholder="Discount %"
                    value={discount}
                    onChange={(event) => setDiscount(event.target.value)}
                    min="0"
                    max="100"
                    className="bg-[#1b1c1a] border border-white/10 rounded-xl px-4 py-3 outline-none"
                />

                <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    required
                    className="bg-[#1b1c1a] border border-white/10 rounded-xl px-4 py-3 outline-none text-white"
                >
                    <option value="">Select category</option>
                    <option value="Appetizers">Appetizers</option>
                    <option value="Main Dishes">Main Dishes</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Drinks">Drinks</option>
                </select>

                <input
                    type="text"
                    placeholder="Ingredients"
                    value={ingredients}
                    onChange={(event) => setIngredients(event.target.value)}
                    className="md:col-span-2 bg-[#1b1c1a] border border-white/10 rounded-xl px-4 py-3 outline-none"
                />

                <button
                    type="submit"
                    className="md:col-span-2 bg-[#e85b52] hover:bg-[#d94d45] rounded-xl py-3 font-medium transition"
                >
                    Add Dish
                </button>
            </form>
        </div>
    );
}