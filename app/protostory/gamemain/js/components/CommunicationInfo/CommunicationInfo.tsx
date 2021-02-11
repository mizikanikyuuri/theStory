import React from 'react';
import {PlayerBadgeProps,PlayerBadge } from './PlayerBadge/PlayerBadge'
import {ChatInputProps,ChatInput } from './ChatSpace/ChatInput/ChatInput'
import {ChatOutputProps,ChatOutput } from './ChatSpace/ChatOutput/ChatOutput'
import './CommunicationInfo.css';
import { PlayerIconType } from './PlayerBadge/PlayerIcon/PlayerIcon';
type CommunicationInfoProps = {
    className?: string,
    iconType?: PlayerIconType,
    playerName?:string,
    addChatFunc?:(message:string)=>void,
    chat?:Array<string>
}
function CommunicationInfo({ className = "",iconType=null,playerName="unknown user",addChatFunc=null,chat=[""]}: CommunicationInfoProps) {
    let playerBadgeProps:PlayerBadgeProps={
        iconType: iconType!==null?iconType:PlayerIconType.warrior,
        playerName: playerName,
    };
    let chatOutputProps:ChatOutputProps={
        chat: chat
    }
    let chatInputProps:ChatInputProps={
        addChatFunc:addChatFunc
    }
    return (
        <div className={"communication-info "+className}>
            <PlayerBadge {...playerBadgeProps} />
            <ChatOutput {...chatOutputProps} />
            {addChatFunc!==null?<ChatInput {...chatInputProps}/>:false }
        </div>
    );
}


export { CommunicationInfoProps, CommunicationInfo }
