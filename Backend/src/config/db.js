const mongoose = require("mongoose");

async function connectDB() {
    try {
        console.log(process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL);

        console.log("Connected to DB");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;
