import Message from "../model/message.js";
import User from "../model/user.js";
export const sentMessage = async (req ,res) =>{
    try{
        const { receiver , text } = req.body
        console.log(req.body)
    const sender = req.user.id  

    if(!receiver){
        return res.status(400).json({
            message : "reciver not found"
        })
    }
    if(!text){
        return res.status(400).json({
            message : "text is empty"
        })
    }

    const message = await Message.create({
        sender,
        receiver,
        text
    })
    return res.status(201).json({   
        message : "message created succesfully",
        message
    })

    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            message : 'error for createing message'
        })
    }
}   


export const getMessage = async (req ,res) =>{
  try{
    const sender =  req.user.id
    const receiver = req.params.id
    console.log(receiver)

    const message = await Message.find({
        $or: [
            {
                sender : sender,
                receiver : receiver
            },{
                sender :  receiver,
                receiver : sender
            }
        ]
    })
    
   return res.status(200).json({
    message : message
   })

  }catch(err){
    console.log(err.message)
    return res.status(500).json({
        message : "unable to send"
    })

  }
}

export const saveMessage = async (req , res)=>{
    try{
        const {sender , receiver , text } = req.body

    const message = await Message.create({
        sender ,
        receiver,
        text
    })
    res.status(201).json({
        message : "saved message",
        message
    })
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}