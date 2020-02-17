const Path = require("../models/path");
const User = require("../models/user");

async function index(req, res) {
    try {
        let user = req.user._id;
        let paths = await Path.find({ user: user }).sort("country");
        res.status(200).json(paths);
    } catch (err) {
        console.log(err);
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

// async function showPath(req, res) {
//     try {
//         let path = await Path.findOne({ id: req.params.id });
//         res.status(200).json(path);
//     } catch (err) {
//         res.status(400).json({ err });
//     }
// }

// async function updatePath(req, res) {
//     try {
//         await Path.findBy({ id: req.params.id })
//             .then(Path.updateOne(req.body))
//             .then(res => res.status(200).json());
//     } catch (err) {
//         res.status(400).json({ err });
//     }
// }

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
    // showPath,
    // updatePath,
    deletePath
};
