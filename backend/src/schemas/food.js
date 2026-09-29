import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        discount: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        image: {
            type: String,
            default: "",
        },

        ingredients: {
            type: String,
            default: "",
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);



export const Food = mongoose.model("Food", foodSchema);