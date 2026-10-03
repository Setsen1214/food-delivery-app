"use client";

export default function FoodCard({ food, onAdd }) {
    const discount = food.discount || 0;

    const finalPrice =
        food.price - (food.price * discount) / 100;

    return (
        <div className="bg-white rounded-2xl p-4 w-full">

            {/* IMAGE */}
            <div className="relative w-full h-52 rounded-xl overflow-hidden bg-gray-200">
                {food.image ? (
                    <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No image
                    </div>
                )}

                {/* PLUS BUTTON */}
                <button
                    type="button"
                    onClick={() => onAdd(food)}
                    className="absolute right-4 bottom-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#ff4b45] text-2xl shadow"
                >
                    +
                </button>
            </div>

            {/* NAME + PRICE */}
            <div className="flex items-center justify-between gap-3 mt-4">

                <h3 className="text-[#ff4b45] text-lg font-semibold">
                    {food.name}
                </h3>

                <div className="text-right whitespace-nowrap">
                    {discount > 0 ? (
                        <>
                            <p className="text-sm font-semibold">
                                ₮{finalPrice.toLocaleString()}
                            </p>

                            <p className="text-xs text-gray-400 line-through">
                                ₮{food.price.toLocaleString()}
                            </p>
                        </>
                    ) : (
                        <p className="text-sm font-semibold">
                            ₮{food.price.toLocaleString()}
                        </p>
                    )}
                </div>

            </div>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-600 mt-2 leading-5">
                {food.ingredients || "Fresh and delicious food made for you."}
            </p>

        </div>
    );
}