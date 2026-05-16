import express, { urlencoded } from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import messgeRoutes from './routes/messageRoutes.js'
import Message from './model/message.js'
dotenv.config()

const app = express()
const server = http.createServer(app)


connectDB()


app.use(cors({
    origin : function (origin, callback) {
        callback(null, true);
    },
    credentials: true
}))

const io = new Server(server, {
    cors : {
        origin : function (origin, callback) {
            callback(null, true);
        },
        credentials: true
    }
})

const onlineUsers = {}  
io.on('connection' , (socket) =>{
    console.log('user connected', socket.id)

        socket.emit('welcome' , 'hello frontend')

        socket.on('join' , (userId) =>{
            onlineUsers[userId] = socket.id
            console.log(onlineUsers)
        })
    socket.on('message' , (data) =>{
        console.log(data)
    })

    socket.on('sendMessage' , async (data) =>{
        console.log(data)
        const receiverSocketId = onlineUsers[data.receiver]
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('receiveMessage' , data)
        }
        
        try {
            await Message.create({
                sender: data.sender,
                receiver: data.receiver,
                text: data.text
            })
            console.log("Message saved to DB")
        } catch (err) {
            console.log("Error saving message:", err.message)
        }
    })

})
    
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/api/auth' , authRoutes)
app.use('/api/message' ,messgeRoutes )
app.get('/',(req , res) =>{
    console.log('server is running sdfhjskdfnjsdk')
})
server.listen(3000 , () =>{
    console.log('server is runninng....')
})
