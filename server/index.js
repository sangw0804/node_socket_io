const path = require("path");
const http = require("http");

const express = require("express");
const app = express();
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);
const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");

const users = new Users();

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("client connect to server!");

    socket.on("join", (params, callback) => {
        console.log("hi");
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback("need user and room");
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit("updateUserList", users.getUserList(params.room));

        socket.emit("newMessage", generateMessage("Admin", "Welcome to Chat-App!"));
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} joined!!`));

        callback();
    });

    socket.on("createMessage", (message, callback) => {
        console.log(message);
        io.emit("newMessage", generateMessage(message.from, message.text));
        callback();
    });

    socket.on("createLocationMessage", (data, callback) => {
        io.emit("newLocationMessage", generateLocationMessage("User", data.lat, data.lng));
        callback();
    });

    socket.on("disconnect", () => {
        let removedUser = users.removeUser(socket.id);
        if(removedUser) {
            socket.broadcast.to(removedUser.room).emit("updateUserList", users.getUserList(removedUser.room));
            socket.broadcast.to(removedUser.room).emit("newMessage", generateMessage("Admin", `${removedUser.name} has left the room!`));
        }
    });
});

const port = process.env.PORT || 3000;
server.listen(port , () => {
    console.log(`now listening at :${port}`);
});