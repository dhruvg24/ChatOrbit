import {Server} from 'socket.io'

import http from 'http'
import express from 'express'

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors : {
        origin: ["http://localhost:3000"],
         //frontend application address
        methods: ["GET","POST"]
    }
})
// on express server we added socket server

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

// getting online users
const userSocketMap = {};
// mapping {userId : socketId}

io.on('connection', (socket)=>{
    console.log("a user connected", socket.id)
    const userId = socket.handshake.query.userId;
    // because from socketContext we are getting it from query->userId

    if(userId!="undefined"){
        userSocketMap[userId]=socket.id    
    }
    // we need to send this to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    // keys will be userId
    // so whenever user connects can get the info who is online and offline

    socket.on("disconnect", ()=>{
        console.log("user disconnected", socket.id)
        // once the user disconnects delete it from the userSocketMap
        delete userSocketMap[userId]
        // and send this info to all clients
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})
// io.on has name of the event and callback listener function


export {app, io, server}