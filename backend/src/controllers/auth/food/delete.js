import { Food } from "../../../schemas/food.js";

export const deleteFood = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedFood = await Food.findByIdAndDelete(id);

        if (!deletedFood) {
            return res.status(404).json({
                message: "Food not found",
            });
        }

        return res.status(200).json({
            message: "Food deleted successfully",
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to delete food",
            error: error.message,
        });
    }
};