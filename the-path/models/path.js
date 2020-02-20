const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itinerarySchema = new Schema(
    {
        day: Date,
        city: String,
        notes: String,
        places: Array
    },
    {
        timestamps: true
    }
);

const PathSchema = new Schema(
    {
        country: {
            type: String,
            required: true
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
            required: true
        },
        image: String,
        notes: String,
        places: Array,
        itinerary: [itinerarySchema],
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Path", PathSchema);
