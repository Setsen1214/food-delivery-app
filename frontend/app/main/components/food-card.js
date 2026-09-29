export default function FoodCard({ food, onAdd }) {
    const discount = food.discount || 0;

    const finalPrice =
        food.price - (food.price * discount) / 100;

    return (
        <div className="border rounded-xl p-4">
            {/* Image placeholder for now */}
            <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                No image
            </div>

            <h2 className="text-xl font-semibold mt-4">
                {food.name}
            </h2>

            <p className="text-gray-500">
                {food.category}
            </p>

            {discount > 0 ? (
                <div className="mt-2">
                    <p className="font-bold">
                        ₮{finalPrice.toLocaleString()}
                    </p>

                    <p className="line-through text-gray-400">
                        ₮{food.price.toLocaleString()}
                    </p>

                    <p className="text-red-500">
                        {discount}% OFF
                    </p>
                </div>
            ) : (
                <p className="font-bold mt-2">
                    ₮{food.price.toLocaleString()}
                </p>
            )}

            <button
                onClick={() => onAdd(food)}
                className="mt-4 w-full bg-black text-white py-2 rounded-lg"
            >
                Add to cart
            </button>
        </div>
    );
}