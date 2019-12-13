const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

io.on("connection", socket => {
    console.log("reunited and it feels so good ;)")
    socket.on("message", message => {
        console.log(message);
        io.emit("message", message);
    });
    
});

server.listen(port, () => console.log("server running on port" + port));