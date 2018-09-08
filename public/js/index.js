const socket = io();

socket.on("newMessage", (message) => {
    console.log(message);
    let newMsg = $("<li></li>");
    newMsg.text(`${message.from} : ${message.text}`);
    $("#messages").append(newMsg);
});

$("#chat-form").on("submit", function (e) {
    e.preventDefault();

    socket.emit("createMessage", {
        from: "User",
        text: $("input").val()
    }, () => console.log("success!"));
    
    $("input").val("");
});