"use strict";

import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import config from 'config';
import passport from 'passport';
import { Server, Socket } from 'socket.io';

dotenv.config();
const app = express();
app.use(cors({
    origin: process.env.NODE_ENV === "production" ?
        config.get<string>("origin.prod") :
        config.get<string>("origin.dev")
}));

app.use(express.json());    //parse incoming JSON data and converts it to JS object which is then attached to req.body.


const port = process.env.PORT || 5500;
const server = app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
})

//create session middleware for oauth verification from cookie 
app.use(session({
    secret: "SESSION_SECRETE",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(passport.initialize());
app.use(passport.session());

//socket io server for direct communication sent from server to client
const io = new Server(server);

io.on('connection', (socket: Socket) => {
    console.log(`Client ${socket.id} connected`);

    socket.on('disconnect', () => {
        console.log(`Client ${socket.id} disconnected`);
    });
});
