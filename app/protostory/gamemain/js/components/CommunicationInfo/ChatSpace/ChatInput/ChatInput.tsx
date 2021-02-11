import React, { useState }  from 'react';
import './ChatInput.css';
type ChatInputProps = {
    className?: string,
    addChatFunc: (message:string)=>void,
}
function ChatInput({ className = "",  addChatFunc}: ChatInputProps) {
    const [chatMessage, setChatMessage] = useState("");
    let handleChange=(event)=>{
        setChatMessage(event.target.value);
    }
    let sendChat=()=>{
        addChatFunc(chatMessage);
        setChatMessage("");
    } ;
    return (
        <div className="chat-input">
            <input type="text" className="chat-input-console" value={chatMessage} onChange={handleChange}  placeholder="Type a message" />
            <button className="msg-send-btn" type="button" onClick={sendChat}>
                <i className="fas fa-reply"></i>
            </button>  
        </div>
    );
}

export { ChatInputProps, ChatInput }