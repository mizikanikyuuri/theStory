import React from 'react'
import './PlaySpace.css';
function PlaySpace(props) {
    return (
        <div className={"the-story-play-space " + props.className}>
        </div>
    );
}
function UserPlaySpace(props){
    return (
            <PlaySpace className={"the-story-user-play-space " + props.className} />
    );
}
function OpponentPlaySpace(props){
    return (
            <PlaySpace className={"the-story-opponent-play-space " + props.className} />
    );
}
export { UserPlaySpace,OpponentPlaySpace }
