const socket = io();

socket.on("newMessage", (message) => {
    let formatTime = moment(message.createdAt).format("h:mm a");
    console.log(message);
    let newMsg = $("<li></li>");
    newMsg.text(`${message.from} ${formatTime} : ${message.text}`);
    $("#messages").append(newMsg);
});

$("#chat-form").on("submit", function (e) {
    e.preventDefault();
    let input = $("input");

    socket.emit("createMessage", {
        from: "User",
        text: input.val()
    }, () => {
        input.val("");
    });
});

let locBtn = $("#loc-btn");
locBtn.on("click", (e) => {
    if(!navigator.geolocation) {
        return alert("this browser doesn't support geolocation!!!");
    }

    locBtn.attr("disabled", "disabled").text("Sending location...");

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("createLocationMessage", {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        },() => {
            locBtn.removeAttr("disabled").text("Send location");
        });
    }, () => {
        locBtn.removeAttr("disabled").text("Send location");
        alert("cannot get location!!!");
    })
});

socket.on("newLocationMessage", (data) => {
    let formatTime = moment(data.createdAt).format("h:mm a");
    let li = $("<li></li>");
    let a = $("<a target='_blank'>My Location!</a>");

    a.attr("href", data.url);
    li.text(`${data.from} ${formatTime} : `);
    li.append(a);
    $("#messages").append(li);
})