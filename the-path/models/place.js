const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO implement places schema

const placeSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        image: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Place", placeSchema);
