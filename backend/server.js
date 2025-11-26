const express = require("express");
const connectDB = require("./shared/middlewares/connect-db");
const { usersRoute } = require("./modules/users/users-routes");
const cors = require("cors");

const port = 3000;
const hostname = "localhost";

const server = express();

server.use(cors());

// built-in middlewares to parse request body in application-level
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(connectDB);
// Mount all the routes
server.use(usersRoute);
server.use(freelancersRoute);
server.use(jobsRoute);
server.use(ordersRoute);
server.use(messagesRoute);
server.use(ordersRoute);

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
