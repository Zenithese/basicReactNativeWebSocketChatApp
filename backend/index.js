const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;
const messageHandler = require('./handlers/messageHandler')

let currentUserId = 2;
let users = {};

// console.log(socket)
io.on("connection", socket => {
    console.log(socket.id);
    users[socket.id] = { userId: currentUserId++ };
    socket.on("join", username => {
        users[socket.id].username = username;
        messageHandler.messageHandler(users, socket);
    });
});

server.listen(port, () => console.log("server running on port" + port));