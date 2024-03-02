import React, { useEffect, useRef } from "react";
import Message from "./Message.jsx";
import useGetMessages from "../../hooks/useGetMessages.js";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import useListenMessages from "../../hooks/useListenMessages.js";
const Messages = () => {
  const { messages, loading } = useGetMessages();

  useListenMessages();
  //will listen to the incoming msgs from socket

  // for automatic scroll if screen covers with msg - to display recent msgs
  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  // whenever messages array updates it targets the ref as lastMsgRef and points it out after scroll.
  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* rendering the messages */}
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start conversation</p>
      )}
    </div>
  );
};

export default Messages;
