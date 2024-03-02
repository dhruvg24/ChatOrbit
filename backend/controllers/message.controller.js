import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    // get the content from req.body
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    // cant directly get userId - using middleware can get the authorized user

    let conversation = await Conversation.findOne({
      // to get all the conversations bw these users
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      // if they are sending for the first time
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // push the message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await conversation.save();
    // await newMessage.save();

    // optimisation can be if we save them parallely using promises
    await Promise.all([conversation.save(), newMessage.save()]);


    // SOCKET IO Programming

    const receiverSocketId = getReceiverSocketId(receiverId)

    if(receiverSocketId){
      // if user is online 
      // we need to send this msg to this user only so instead of emit we use to
      io.to(receiverSocketId).emit("newMessage", newMessage); 
    }
    

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error is sendMessage controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    // _id can get using the protectRoute functionality
    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    }).populate("messages");
    // conversation has only message ids so used the populate function of mongo
    // actual messages

    if (!conversation) {
      return res.status(200).json([]);
    }
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error is getMessages controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
