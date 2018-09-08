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

let locBtn = $("#loc-btn");
locBtn.on("click", (e) => {
    if(!navigator.geolocation) {
        return alert("this browser doesn't support geolocation!!!");
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("createLocationMessage", {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        },() => {
            console.log("success!");
        });
    }, () => {
        alert("cannot get location!!!");
    })
});

socket.on("newLocationMessage", (data) => {
    let li = $("<li></li>");
    let a = $("<a target='_blank'>My Location!</a>");

    a.attr("href", data.url);
    li.text(`${data.from} : `);
    li.append(a);
    $("#messages").append(li);
})