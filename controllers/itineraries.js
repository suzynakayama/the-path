const Path = require("../models/path");

async function createItinerary(req, res) {
    try {
        let path = await Path.findById(req.params.id, (err, path) => {
            let newItinerary = {
                day: req.body.day,
                city: req.body.city,
                notes: req.body.notes,
                places: req.body.places
            };
            path.itinerary.push(newItinerary);
            path.save();
        });
        res.status(200).json(path);
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function deleteItinerary(req, res) {
    try {
        let path = await Path.findById(req.params.id, (err, path) => {
            let itinerary = path.itinerary.id(req.params.iti_id);
            itinerary.remove();
            path.save();
        });
        res.status(200).json(path);
    } catch (err) {
        res.status(400).json({ err });
    }
}

module.exports = {
    createItinerary,
    deleteItinerary
};
