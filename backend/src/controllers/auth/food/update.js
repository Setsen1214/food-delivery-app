import { Food } from "../../../schemas/food.js";

export const updateFood = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedFood = await Food.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedFood) {
            return res.status(404).json({
                message: "Food not found",
            });
        }

        return res.status(200).json({
            message: "Food updated successfully",
            food: updatedFood,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to update food",
            error: error.message,
        });
    }
};