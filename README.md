# WELCOME TO ChatAPP

## How to Install

Each folder contains a `package.json` file that has all the necessary dependencies for the app to run.

1. Make your way to the `client` directory and run `npm install` in the terminal.
2. Once the installation is completed, you run `npm start` in the terminal and the client side will start running.
3. Open a new tab of the terminal.
4. Make your way to the `server` directory and run `npm install`.
5. Access the `.env.template` and change the name of the file to be `.env`
6. Repeat step 2
7. In your favorite client, go to `http://localhost:5050` and enjoy Chat App.

## Dependencies Used

- bcryptjs : to hash the password
- cors : to allow cross origin with the frontend
- dotenv : to be able to use .env variables
- express : to create the api
- express-validator : to validate fields in the endpoints
- jsonwebtoken : to allow access to certain parts of app to registered users
- mongoose : to facilitate the use of MongoDB with the API
- socket.io : to enable real-time requests between client and serer

## GOALS

The main goal of this exercise was to create a chat. The app consists of two main folders.

- Client
- Server

The **client** directory contains everything for the frontend. While the **server** contains everything for the backend.

## HOW IT WAS CREATED

<p>To create this app my first step was to create the MongoDB database. This way I was going to be able to test my endpoints in an appropriate manner. </p>
<p>In addition I wanted the app to stop if the connection to the database was not possible. After this was done, the next step was to create the models. In my opinion, one of the hardest parts. It took me like 10 tries to figure out a way in which I was able to do what I wanted.</p>
<p>I decided to just have two models, a <strong>User</strong> and a <strong>Room</strong>. Following is an example of each collection:</p>
<br>
User
<li> Username
<li> Email
<li> Password
<li> Status (online,offline)
<li> Room Info
<br>
<br>

<p> The first three are for registering and login reasons. While <strong>status</strong> was implemented to filter out the users who are online. This was useful in the socket implementation to send the information to the frontend. 
<p> Room info was for a similar reason. If the user changes rooms or leaves the chat, I wanted to have a record of where the user is, and where he was. If the user signed out, all this information was set to <i>null</i>.</p>
<br>
Room
<li> Name
<li> Messages
<br>
<br>

<p>In the room collection the name is needed for each room. Also, I decided to create an array of objects to store in the <strong>messages</strong>. This includes the userData and the roomData. The purpose of this is to have a record of who sent each message, and to which room it is to be saved. </p>

<p>After this, creating endpoints for the login and register were done, and tested using Postman. To add further verification, the use of JWT and Express Validators was included.</p>
