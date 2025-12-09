// Import and configure the 'dotenv' package at the top of server.js to load environment variables.
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./shared/middlewares/connect-db");
const { usersRoute } = require("./modules/users/users-routes");
const {
    freelancersRoute,
} = require("./modules/freelancers/freelancers-routes");
const { jobsRoute } = require("./modules/jobs/jobs-routes");
const { messagesRoute } = require("./modules/messages/messages-routes");
const { ordersRoute } = require("./modules/orders/orders-routes");
const {oauthRoutes} = require("./modules/auth/GoogAuth-routes");

const port = 3000;
const hostname = "localhost";

const server = express();

server.use(cors());

// built-in middlewares to parse request body in application-level
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// middlewares to parse request cookies in application-level
server.use(cookieParser());

// Add the connectDB middleware in application-level, before defining routes.
server.use(connectDB);

// Mount all the routes
server.use(usersRoute);
server.use(freelancersRoute);
server.use(jobsRoute);
server.use(ordersRoute);
server.use(messagesRoute);
server.use(ordersRoute);
server.use(oauthRoutes);
// error-handling middleware to logs the error for debugging.
server.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send("Oops! Internal server error!");
});

// Middleware to handle route not found error.
server.use((req, res, next) => {
    res.status(404).send(`404! ${req.method} ${req.path} Not Found.`);
});

server.listen(port, hostname, (error) => {
    if (error) console.log(error.message);
    else console.log(`Server running on http://${hostname}:${port}`);
});
