import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    // get the content from req.body
    const { message } = req.body;
    const { id: receiverId } = req.id;
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

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error is sendMessage controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
