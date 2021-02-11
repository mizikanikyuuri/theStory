import React from 'react';
import './ChatOutput.css';

type ChatOutputProps = {
    className?: string,
    chat?: Array<string>,
}
function ChatOutput({ className = "",  chat=[" message is not sent yet"]}: ChatOutputProps) {
    const messageList=chat.map(message=><li>{message}</li>);
    return (
        <div className={"chat-output "+className}>
            <ul>{messageList}</ul>
        </div>
    );
}

export { ChatOutputProps, ChatOutput }