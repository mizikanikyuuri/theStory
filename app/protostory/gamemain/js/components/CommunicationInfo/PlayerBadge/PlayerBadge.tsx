import React, { useState }  from 'react';
import Badge from 'react-bootstrap/Badge'
import {PlayerIconType,PlayerIcon } from './PlayerIcon/PlayerIcon'
import './PlayerBadge.css';
type PlayerBadgeProps = {
    className?: string,
    iconType?:PlayerIconType
    playerName: string,
}
function PlayerBadge({ className = "", iconType=PlayerIconType.warrior,playerName }: PlayerBadgeProps) {
    return (
        <div className={"player-badge "+className}>
            <PlayerIcon className={"player-badge-icon"} iconType={iconType}/>
            <Badge variant="secondary">{playerName}</Badge>
        </div>
    );
}


export { PlayerBadgeProps, PlayerBadge }
