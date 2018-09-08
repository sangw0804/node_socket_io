const path = require("path");
const http = require("http");

const express = require("express");
const app = express();
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("client connect to server!");

    socket.on("createMessage", (message) => {
        console.log(message);
        io.emit("newMessage", {
            ...message,
            createdAt: new Date().toString()
        });
    });

    socket.on("disconnect", () => {
        console.log("client disconnect from server!!");
    });

    // socket.emit("newMessage", {
    //     from: "sangwoo",
    //     text: "hi man",
    //     createdAt: new Date().getTime()
    // });
});

const port = process.env.PORT || 3000;
server.listen(port , () => {
    console.log(`now listening at :${port}`);
});