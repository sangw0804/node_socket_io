const socket = io();

socket.on("newMessage", (message) => {
    console.log(message);
});

// setTimeout(() => {
//     socket.emit("createMessage", {
//         from: "paduck",
//         text: "wo i ni"
//     });
// }, 1000);