const Path = require("../models/path");
const User = require("../models/user");

async function index(req, res) {
    console.log("inside index");
    let user = req.user;
    console.log(user);
    try {
        if (user) {
            let paths = await Path.find({ user: user.id }).sort("country");
            console.log(paths);
            // res.json(paths);
        } else {
            return null;
        }
    } catch (err) {
        res.json({ err });
    }
}

async function createPath(req, res) {
    try {
        await Path.create(req.body);
    } catch (err) {
        res.json({ err });
    }
}

async function showPath(req, res) {
    try {
        let path = await Path.findOne({ id: req.params.id });
        res.json(path);
    } catch (err) {
        res.json({ err });
    }
}

async function updatePath(req, res) {
    try {
        await Path.findOne()
            .then(Path.updateOne(req.body))
            .then(res => res.json());
    } catch (err) {
        res.json({ err });
    }
}

async function deletePath(req, res) {
    try {
        await Path.findOne().then(Path.deleteOne());
    } catch (err) {
        res.json({ err });
    }
}

module.exports = {
    index,
    createPath,
    showPath,
    updatePath,
    deletePath
};
