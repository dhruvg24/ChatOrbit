import React, { useState } from 'react'
import useConversation from '../zustand/useConversation.js';
import toast from "react-hot-toast"

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages, selectedConversation} = useConversation();
//   from zustand

  const sendMessage= async(message)=>{
    setLoading(true);
    try {
        const res = await fetch(`/api/v1/messages/send/${selectedConversation._id}`, {
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({message})
        })

        const data = await res.json();
        if(data.error){
            throw new Error(data.error);
        }

        // from zustand -> setMessages function
        setMessages([...messages, data])
    } catch (error) {
        toast.error(error.message);
    } finally{
        setLoading(false)
    }
  }

  return {sendMessage, loading};
}

export default useSendMessage