import React from 'react'
import GameCard from "Components/GameCard"
import './GoalCardSpace.css';
function GoalCardSpace() {
    return (
        <div className={"the-story-goal-card-space"}>
            <GameCard/>
        </div>
    );
}

export { GoalCardSpace }