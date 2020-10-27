import React from 'react'

import './StatusBar.css';
function StatusBar({className}) {
    return (
    <div className={"the-story-status-bar " + className}>
        {/* ゴールド={props.gold},HP={props.hp},攻撃力={props.attack},防御力={props.deffence} */}
        ゴールド=10,HP=20,攻撃力=5,防御力=1
    </div>
    );
}

function UserStatusBar({className}){
    return (
        <StatusBar className={"the-story-user-status-bar "+className}/>
        );
}
function OpponentStatusBar({className}){
    return (
        <StatusBar className={"the-story-opponent-status-bar "+className}/>
        );
}
export {UserStatusBar,OpponentStatusBar}
