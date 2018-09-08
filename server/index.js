const path = require("path");
const http = require("http");

const express = require("express");
const app = express();
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);
const {generateMessage} = require("./utils/message");

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("client connect to server!");

    socket.emit("newMessage", generateMessage("Admin", "Welcome to Chat-App!"));

    socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined!!"));

    socket.on("createMessage", (message, callback) => {
        console.log(message);
        io.emit("newMessage", generateMessage(message.from, message.text));
        callback();
    });

    socket.on("disconnect", () => {
        console.log("client disconnect from server!!");
    });
});

const port = process.env.PORT || 3000;
server.listen(port , () => {
    console.log(`now listening at :${port}`);
});