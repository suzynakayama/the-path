const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

db.on("connected", () => {
    console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`);
});

module.exports = mongoose;
