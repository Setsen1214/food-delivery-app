import { User } from "../schemas/user-schema.js";


export const validateEmailAndPassword = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password required"
        });
    }

    next();
};

export const checkIfUserExist = async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        return res.status(409).json({
            message: "User already exists"
        });
    }

    next();
};
export const validateEmail = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    } else {
        req.user = user;
        next();
    }
}