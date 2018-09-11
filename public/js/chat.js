const socket = io();

const scrollToBottom = () => {
    let messages = $("#messages");
    let scrollHeight = messages.prop("scrollHeight");
    let clientHeight = messages.prop("clientHeight");
    let scrollTop = messages.prop("scrollTop");
    let lastListHeight = messages.children("li:last-child").innerHeight();
    let prevListHeight = messages.children("li:last-child").prev().innerHeight();

    if(clientHeight + scrollTop + lastListHeight + prevListHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on("connect", () => {
    const params = deparam(location.search.slice(1));
    console.log(params);
    socket.emit("join", params, (err) => {
        if(err) {
            alert(err);
            location.href = "/";
        } else {
            console.log("join room");
        }
    })
});

socket.on("updateUserList", (userNames) => {
    let ol = $("<ol></ol>");
    userNames.forEach((username) => {
        ol.append($("<li></li>").text(username));
    });

    $("#users").html(ol);
});

socket.on("newMessage", (message) => {
    let formatTime = moment(message.createdAt).format("h:mm a");
    let template = $("#message-template").html();
    let newMsg = Mustache.render(template, {
        from: message.from,
        createdAt: formatTime,
        text: message.text
    });
    $("#messages").append(newMsg);

    scrollToBottom();
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

    scrollToBottom();
})