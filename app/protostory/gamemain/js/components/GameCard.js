import React from 'react'
import { Card } from 'react-bootstrap';
// import { ItemTypes } from './ItemTypes'
// import { useDrag ,DragPreviewImage } from 'react-dnd'

function GameCard() {
    // const [{ isDragging }, drag, preview] = useDrag({
    //     item: { type: ItemTypes.KNIGHT },
    //     collect: monitor => ({
    //         isDragging: !!monitor.isDragging(),
    //     }),
    // });
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Header>
                <Card.Title>レッドドラゴン</Card.Title>
            </Card.Header>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Text>
                コスト：なし
                体力：30、攻撃力：10、防御力：5
                クリーンアップ：しない
                競合：なし
                効果：このカードの使用者はこのカードと戦闘を行う。このカードとの戦闘に勝利したプ
                レイヤーはゲームに勝利する。
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default GameCard