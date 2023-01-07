//Creates list
const displayUsers = (users) => {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    // Iterating the users array
    users.forEach(user => {

        //Creating user 'li' element
        const li = document.createElement('li');
        li.classList.add('user-li');
        li.textContent = user.userName;
        li.setAttribute("id", user.userId);
        
        // Append the user to the userList
        userList.append(li);
    });
}
   
