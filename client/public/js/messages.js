const sendMessage = () => {
    //retrieve message from chat-form input, room and user from sessionStorage
    const text = document.querySelector('.chat-form input[name="newMessage"]').value;
    const user = {userId: sessionStorage.userId, userName: sessionStorage.userName};
    const room = {roomId: sessionStorage.roomId, roomName: sessionStorage.roomName};
    
    //send obj with message, room and user info to backend
    if (text) {
        let message = {user, room, text};
        socket.emit('new-message', message);
        displayMessage(message);
        document.querySelector('.chat-form input[name="newMessage"]').value = '';
    }
    return false;
}

//Out chat messages to dom
const displayMessage = (message) =>{
    //current message list on display
    let messageList = document.getElementById("messageList");
    //create element with current message to append to current message list
    let li = document.createElement('li');
    li.classList.add('chat-li')
    li.textContent = message.text;

    //retrieve last inserted ul element 
    let ul = document.getElementById('lastMessage');

    // append if last message has same user.id as current
    /*if (ul && (ul.getAttribute('userId') === message.user.userId)) {
        ul.append(li)
    } else {
        if (ul) document.getElementById("lastMessage").removeAttribute("id");*/
        if (ul && (ul.getAttribute('userId') === message.user.userId)) {
            ul.append(li)
        } else {
            if (ul) document.getElementById("lastMessage").removeAttribute("id");

    //create new ul element
    ul = document.createElement('ul');
    ul.setAttribute('id', 'lastMessage');
    ul.setAttribute('userId', message.user.userId)

    //Separate USER from users 
    //Align USER's messages to the right ({ul} in css)
    if (message.user.userId === sessionStorage.userId) {
        const time = new Date();
        const formattedTime = time.toLocaleString("en-US", {hour: "numeric", minute:"numeric"});
        ul.classList.add('myMessage')
        const name = document.createElement('ul')
        name.textContent = `Me:  ` + "\n" 
        + `${formattedTime}`;
        messageList.append(name);
        //messageList.append(formattedTime);
        ul.classList.add('myMessage')

    } else {
    //Align other users's messages to the left ({li} in css)
        const time = new Date();
        const formattedTime = time.toLocaleString("en-US", {hour: "numeric", minute:"numeric"});
        ul.classList.add('notMyMessage')
        const name = document.createElement('li')
        name.textContent = `${message.user.userName} wrote at ` + "\n" 
        + `${formattedTime}`;
        messageList.append(name);
        //$messageList.append(formattedTime);
        ul.classList.add('notMyMessage')
    }
        //append list element
        ul.append(li);
        //append ul to message list
        messageList.append(ul);
    }
    //scroll to bottom
    messageList.scrollTop = messageList.scrollHeight;
}

//output user joining room
/*const displayJoinMessage = (message) => {

   document.getElementById('lastMessage').removeAttribute('id');

    let messageList = document.getElementById('messageList');

    // Create the element to append
    let li = document.createElement('li');
    li.classList.add('chat-li-join')
    li.textContent = message;
    li.setAttribute('id', 'lastMessage');
    messageList.append(li);

    //scroll to bottom
    messageList.scrollTop = messageList.scrollHeight;
}*/

const displayJoinMessage = (message) => {

    let messageList = document.getElementById('messageList');
    let lastMsg = document.getElementById('lastMessage');

    if(lastMsg) {
        lastMsg.removeAttribute('id');
    }

    let li = document.createElement('li');
    li.classList.add('chat-li-join')
    li.textContent = message;
    li.setAttribute('id', 'lastMessage');
    messageList.append(li); 
}
 

