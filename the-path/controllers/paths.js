const Path = require("../models/path");

async function index(req, res) {
    try {
        let user = req.user._id;
        let paths = await Path.find({ user: user }).sort("country");
        res.status(200).json(paths);
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function createPath(req, res) {
    try {
        let path = await Path.create(req.body);
        res.status(201).json(path);
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function showPath(req, res) {
    try {
        let path = await Path.findOne({ _id: req.params.id });
        res.status(200).json(path);
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function updatePath(req, res) {
    try {
        const updatedPath = await Path.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedPath);
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function deletePath(req, res) {
    try {
        let path = await Path.findByIdAndDelete(req.params.id);
        res.status(200).json(path);
    } catch (err) {
        res.status(400).json({ err });
    }
}

module.exports = {
    index,
    createPath,
    showPath,
    updatePath,
    deletePath
};
