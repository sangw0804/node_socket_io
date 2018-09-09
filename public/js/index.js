const socket = io();

socket.on("newMessage", (message) => {
    let formatTime = moment(message.createdAt).format("h:mm a");
    let template = $("#message-template").html();
    let newMsg = Mustache.render(template, {
        from: message.from,
        createdAt: formatTime,
        text: message.text
    });
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

    let template = $("#location-message-template").html();
    let html = Mustache.render(template, {
        from: data.from,
        createdAt: formatTime,
        url: data.url
    });

    $("#messages").append(html);
})