/**
 * TODO: Connect MongoDB using Mongoose in an Express middleware:
 *
 * 1. Import the 'mongoose' library at the top of the file.
 * 2. Access the MongoDB connection URL from environment variables using process.env.DB_URL.
 *    (Ensure the DB_URL is defined in a .env file.)
 * 3. Create an asynchronous middleware function called connectDB that takes (req, res, next) as parameters.
 * 4. Inside the function, use a try...catch block to manage connection logic.
 * 5. In the try block, call mongoose.connect() with the database URL.
 *    - Pass an options object that includes the dbName (e.g., { dbName: "YourDatabaseName" }).
 * 6. After successfully connecting, log a message like "Database connected!".
 * 7. Call next() to pass control to the next middleware or route.
 * 8. In the catch block, log the error and throw a new Error with a message like "Database connection failed!".
 * 9. Export the connectDB function using module.exports so it can be used in other parts of the application.
 */

require("dotenv").config();
const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL;

async function connectDB(req, res, next) {
    try {
        await mongoose.connect(dbUrl, { dbName: "LeShoppe" });
        console.log("Database connected!");
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send("Database connection failed");
    }
}

module.exports = connectDB;
