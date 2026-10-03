import { Order } from "../../../schemas/order.js";

export const createOrder = async (req, res) => {
    try {
        const { items, totalPrice } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Order must contain at least one item",
            });
        }

        const order = await Order.create({
            userId: req.user.userId,
            items,
            totalPrice,
        });

        return res.status(201).json({
            message: "Order created successfully",
            order,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to create order",
            error: error.message,
        });
    }
};