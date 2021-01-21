import React from 'react';
import Badge from 'react-bootstrap/Badge'
type PlayerBadgerProps = {
    className?: string,
    playerName: string,
}
function PlayerBadge({ className = "", playerName }: PlayerBadgerProps) {
    return (
        <div className={className}>
            <h2>
                <Badge variant="secondary">{playerName}</Badge>
            </h2>
        </div>
    );
}

export { PlayerBadgerProps, PlayerBadge }
