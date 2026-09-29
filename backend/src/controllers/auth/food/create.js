import { Food } from "../../../schemas/food.js";

export const createFood = async (req, res) => {
    try {
        const { name, price, discount, image, ingredients, category } = req.body;

        const food = await Food.create({
            name,
            price,
            discount,
            image,
            ingredients,
            category,
        });

        return res.status(201).json({
            message: "Food created successfully",
            food,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to create food",
            error: error.message,
        });
    }
};