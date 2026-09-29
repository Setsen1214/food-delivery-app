import { Food } from "../../../schemas/food.js";

export const getFoods = async (req, res) => {
    try {
        const foods = await Food.find().sort({ createdAt: -1 });

        return res.status(200).json({
            foods,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to get foods",
            error: error.message,
        });
    }
};