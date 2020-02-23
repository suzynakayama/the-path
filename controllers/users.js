const User = require("../models/user");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

function createJWT(user) {
    return jwt.sign({ user }, SECRET, { expiresIn: "24h" });
}

async function signup(req, res) {
    const user = new User(req.body);
    try {
        await user.save();
        const token = createJWT(user);
        res.json({ token });
    } catch (err) {
        res.status(400).json(err);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ err: "wrong credentials" });
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch) {
                const token = createJWT(user);
                res.json({ token });
            } else {
                return res.status(401).json({ err: "wrong credentials" });
            }
        });
    } catch (err) {
        return res.status(401).json(err);
    }
}

async function updateUser(req, res) {
    await User.findOne({ email: req.body.email }, (err, user) => {
        user.name = req.body.name;
        user.email = req.body.email;
        try {
            user.save();
            const token = createJWT(user);
            res.json({ token });
        } catch (err) {
            res.status(400).json(err);
        }
    });
}

async function deleteUser(req, res) {
    await User.findOne({ email: req.body.email }, (err, user) => {
        try {
            user.remove();
            res.status(200).json({ message: "User deleted!" });
        } catch (err) {
            res.status(400).json({ err });
        }
    });
}

module.exports = {
    signup,
    login,
    updateUser,
    deleteUser
};
