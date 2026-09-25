import { User } from "../../schemas/user-schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const SALT_ROUND = 10;
const JWT_SECRET = "Michid";

// const token = jwt.sign({ email: "gmail.com" }, JWT_SECRET, {
//     expiresIn: "5h"
// });


const publicUser = (user) => {
    return {
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        _id: user._id,

    }
}
const createToken = (user) => {
    return jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, {
        expiresIn: "7d"
    })
}

export const loginController = async (req, res) => {
    const { user } = req;
    const { password } = req.body;
    console.log(user, "hello this is my user");

    try {
        const isPassMatching = await bcrypt.compare(password, user.password);
        if (!isPassMatching) {
            return res.status(401).json({ message: "Wrong Password" });
        } else {
            const token = createToken(user);
            return res.status(200).json({
                message: "Successfully login",
                user: publicUser(user),
                token,
            });

        }


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to login user", error: err });

    }
};

export const signUpController = async (req, res) => {
    const { email, password, phoneNumber, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUND);



        const user = await User.create({
            email,
            password: hashedPassword,
            phoneNumber,
            role,
        })

        const token = createToken(user)


        res.status(201).json({
            message: "User Created",
            user: publicUser(user),
            token,
        });

    } catch (err) {
        res.status(500).json({ message: "Failed to create user", error: err })
    }
};
