import { MonsterStateFookTypes } from "../../CommonGameObjects"
import {CharacterStates} from "GameRules/GameState/GameCharacter/CharacterStates"
import {HitPoint} from "Utilities/Parameters/HitPoint"
import {AttackPower} from "Utilities/Parameters/AttackPower"
import {DefensePower} from "Utilities/Parameters/DefensePower"
class MonsterStates extends CharacterStates<MonsterStateFookTypes>{
    constructor(hitPoint:HitPoint,attackPower:AttackPower,defensePower:DefensePower) {
        super(hitPoint,attackPower,defensePower);
    }
}

export {MonsterStates}