# File-Management-System

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
* [NPM](https://www.npmjs.com/get-npm)

### Installing
In order to get the project up and running:

1. Put your environment variables at .env
2. Install all dependencies and spin up the server: 
  
Run the front-end server at http://localhost:3000/
  ``` javascript
    $ cd client
    $ npm install 
    $ npm start
  ```

Run the back-end server at http://localhost:5000/
  ``` javascript
    $ cd server
    $ npm install 
    $ npm start
  ```

## ENV Variables
Config the following variable into server .env file
  ```
    DB_CONNECT = 'MongoDb connection link'
    TOKEN_SECRET = 'TOKEN SECRET'
  ```

For Testing
```
    DB_CONNECT = 'mongodb+srv://admin:admin@cluster0-wxo2b.mongodb.net/test?retryWrites=true&w=majority'
    TOKEN_SECRET = 'ABC123'
```
### Testing 
Testing Account
  ```
    Email = admin@admin.com
    Password = abc
  ```

## Back-End API
| Method | Description | Endpoint | Request | Response |
| ------ | ------ | ----- | ----- | ----- | 
| POST   | Registation | /api/register | { email: email, password: password } | payload |
| POST   | Login | /api/login | { email: email, password: password }| payload |
| POST   | Upload File | /api/files/upload | { userId: userId, fileName: fileName, source: source, type: type, size: size} | payload |
| POST   | Get All File | /api/files/get | { userId: userId } | payload |
| POST   | Get Single File | /api/files/download | { userId: userId, _id: fileId } | payload |
| PUT   | Edit File | /api/files/:id | { _id: fileId } | payload |
| DELETE | Delete File | /api/files/:id | { _id: fileId } | payload |


## Front-End Dependencies

### React
A JavaScript library for building user interfaces.

### Redux
Redux is a predictable state container for JavaScript apps. 

### React Router
A collection of navigational components that compose declaratively with the application.

### Material-UI
React components for faster and easier web development.

### Sass
A stylesheet language that's compiled to CSS.

## Back-End Dependencies

### Express
A web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs.

### MongoDB
A cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schema.

### JSON Web Tokens
A compact URL-safe means of representing claims to be transferred between two parties. 

### cors
Used to configure API security.

### dotenv
Load environment variables from a .env file into process.env.

## Authors
* Li Yiu Shing [Github](https://github.com/LiYiuShing)