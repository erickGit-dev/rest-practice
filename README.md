### Practice REST-API
 This is a personal practice creating an eCommerce app using the followings technologies:
- Node.js (Express.js)
- React.js
- Typescript 
- MongoDB (Mongoose)

### Why?
 This app will help to get the knowledge about how the technologies works together using APIs.
 
 Still in development...

### Backend 
The entire application uses Typescript and JSON and the controllers endpoints are validated
 The backend have the followings endpoints 
User authentication using JWT and middleware validator
- post - /sign-up
- post - /log-in
- post - /log-out
- get - /users
- put - /update-user/:id 
- delete - /delete-user/:id

Products managements 
- post - /add-products
- get - /get-products
- get - /get-products/:id
- put - /update-products/:id
- delete - /delete-products/:id

### Frontend
 The Client app was made using Typescript applying best practices like:
- Type safety 
- Null safety 
- Enviroment variables
- React hook useEffect
- Error validator

And all the components was created from scratch using:
- CSS modules
- CSS nesting 
- CSS variables 
- Web toolkit 
- Media querys

The client app is intended to be responsive...

### How to use
 Clone the repository `git clone url` then `cd client` and split the terminal and `cd server` in both server and client use `nmp install` to install all dependencies.

 To run the server use `npm run dev` to run in dev mode or `npm run build` to build the production mode and then use `npm run start` to start the server.

 You need to create a .env file for the database and others enviroments variables.

 You can backup your database data using the comand `npm run backup:ts` or `npm run backup` in dev mode or `npm run backup:json` in production mode, otherwise you can restore the database using `npm run restore`

 To run the client can use `npm start` in dev mode or `npm run build` to transpile the code from Typescript to Javascript and start the project.  
