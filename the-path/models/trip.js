const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itinerarySchema = new Schema(
    {
        day: Number,
        cities: String,
        notes: String,
        Places: {
            type: Schema.Types.ObjectId,
            ref: "Place"
        }
    },
    {
        timestamps: true
    }
);

const tripSchema = new Schema(
    {
        country: {
            type: String,
            required: true
        },
        city: String,
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
            required: true
        },
        Flight1: String,
        Flight2: String,
        Notes: String,
        Itinerary: [itinerarySchema],
        Places: {
            type: Schema.Types.ObjectId,
            ref: "Place"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Trip", tripSchema);
