import React from 'react'
import GameCard from "Components/GameCard"
import './ArtifactSpace.css';
function ArtifactSpace(props) {
    return (
        <div className={"the-story-artifact-space "+props.className}>
            <GameCard/>
        </div>
    );
}

function UserArtifactSpace(props){
    return (
        <ArtifactSpace className={"the-story-user-artifact-space "+props.className}/>
        );
}
function OpponentArtifactSpace(props){
    return (
        <ArtifactSpace className={"the-story-opponent-artifact-space "+props.className}/>
        );
}
export {UserArtifactSpace,OpponentArtifactSpace}
