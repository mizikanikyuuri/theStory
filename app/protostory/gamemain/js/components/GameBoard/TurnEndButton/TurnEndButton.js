import React from 'react'
import Button from 'react-bootstrap/Button'

import './TurnEndButton.css';
function TurnEndButton() {
    return (
        <Button variant="secondary" size="lg" className={"the-story-turn-end-button"}>
            Turn End
        </Button>
    );
}

export { TurnEndButton }