let currentMessageId = 1;

const createMessage = (user, message) => {
    return {
        _id: currentMessageId++,
        text: message,
        createdAt: new Date(),
        user: {
            _id: user.userId,
            name: user.username,
            avatar: 'https://placeimg.com/140/140/any',
        }
    };
}

function messageHandler(users, socket) {
    socket.on("message", message => {
        const user = users[socket.id];
        const textMessage = createMessage(user, message);
        console.log(textMessage)
        socket.broadcast.emit("message", textMessage);
    });
}

module.exports = { messageHandler }