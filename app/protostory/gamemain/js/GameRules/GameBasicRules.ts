import { HitPoint } from "Utilities/Parameters/HitPoint";
import { Player } from "./CommonGameObjects"
import {GameState} from "./GameState/GameState"
function whenUserHitPointIsZero(gameState:GameState){
    return (hitPoint:HitPoint)=>{
        gameState.winner=Player.opponent;
    }
}
function whenOpponentHitPointIsZero(gameState:GameState){
    return (hitPoint:HitPoint)=>{
        gameState.winner=Player.user;
    }
}

export {whenUserHitPointIsZero,whenOpponentHitPointIsZero}