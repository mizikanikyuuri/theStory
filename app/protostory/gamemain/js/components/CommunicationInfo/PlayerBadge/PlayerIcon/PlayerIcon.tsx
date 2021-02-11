import React from 'react';
import warriorImg from "./IconImages/Icons_14.png"
import beardWarriorImg from "./IconImages/Icons_15.png"
import goblinImg from "./IconImages/Icons_10.png"

type PlayerIconrProps = {
    className?: string,
    iconType: PlayerIconType,
    iconSize?: number,
}
enum PlayerIconType{
    warrior,
    beard_warrior,
    goblin,
}
function getIconImg(iconType:PlayerIconType){
    switch(iconType){
        case PlayerIconType.warrior:
            return warriorImg;
        case PlayerIconType.beard_warrior:
            return beardWarriorImg;
        case PlayerIconType.goblin:
            return goblinImg;
    }
}
function PlayerIcon({ className = "", iconType, iconSize=128}: PlayerIconrProps) {
    return (
        <div className={className}>
            <img src={getIconImg(iconType)} width={iconSize} height={iconSize} title="playerIcon"/>
        </div>
    );
}

export { PlayerIconrProps, PlayerIconType,PlayerIcon }