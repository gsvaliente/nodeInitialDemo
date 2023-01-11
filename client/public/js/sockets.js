socket.on('connect', () => {
    console.log(socket.id)

    socket.on('new-user', data => {
        document.getElementById("userName").innerHTML = `Hi!${data.userName}`;
        sessionStorage.setItem("userId",`${data.userId}`);
        sessionStorage.setItem("userName",`${data.userName}`);
    })
      
     //Display new message in chat
    socket.on('new-message', message => {
        displayMessage(message);
    })
    
    //Emit join message to chat
    socket.on('new-join-message', message => {
        displayJoinMessage(message);
    })
    
    //New room created, updating user list
    socket.on('new-room', (room, users) => {
        displayRoom(room);
        displayRoomUsers(room, users);
    })

    socket.on('update-room-users', (room, users) => {
        // Display updated list
        if (sessionStorage.roomId === room.roomId) {
            displayUsers(users)
        }
        displayRoomUsers(room, users);
    })

    // Retrieve room list 
    socket.emit('get-rooms');
})