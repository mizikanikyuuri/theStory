import { OracleStateFookTypes,InitialPlayerStatus } from "../../CommonGameObjects"
import {CharacterStates} from "GameRules/GameState/GameCharacter/CharacterStates"
import {HitPoint} from "Utilities/Parameters/HitPoint"
import {AttackPower} from "Utilities/Parameters/AttackPower"
import {DefensePower} from "Utilities/Parameters/DefensePower"
import {GoldAmount} from "Utilities/Parameters/GoldAmount"
class OracleStates extends CharacterStates<OracleStateFookTypes>{
    constructor() {
        super(
            new HitPoint(InitialPlayerStatus.hitPoint),
            new AttackPower(InitialPlayerStatus.attack),
            new DefensePower(InitialPlayerStatus.defense)
            );
        this.addNewParameter(new GoldAmount(InitialPlayerStatus.gold));
    }
}

export {OracleStates}