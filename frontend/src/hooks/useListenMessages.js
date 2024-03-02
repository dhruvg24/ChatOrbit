// this is for real time messages using socket io
import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext.jsx'
import useConversation from "../zustand/useConversation.js"
import notificationSound from "../assets/sounds/notification.mp3"
const useListenMessages = () => {
    const {socket}= useSocketContext();

    const {messages, setMessages} = useConversation();


    useEffect(()=>{
        socket?.on("newMessage", (newMessage)=>{
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound)
            sound.play();
            setMessages([...messages, newMessage])
        })
        // listen for newMessage event

        // cleanup
        return ()=>socket?.off("newMessage")
        // so that this event is listened only once.
    }, [socket, setMessages, messages])
}

export default useListenMessages