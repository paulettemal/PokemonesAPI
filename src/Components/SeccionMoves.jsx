import React from 'react';

function SeccionMoves({ pokemon, movesInfo }) {
    if (!movesInfo || movesInfo.length === 0) {
        return <div className="contenido">Cargando datos de movimientos...</div>;
    }

    const getMoveTypeClass = (type) => {
        return type.toLowerCase();
    };

    return (
        <div className="contenido">
            <h3 className="moves-title">Moves</h3>
            
            <div className="moves-list">
                {movesInfo.map((moveInfo) => (
                    <div key={moveInfo.move.name} className="move-item">
                        <div className="move-row">
                            <div className={`move-type ${getMoveTypeClass(moveInfo.details.type.name)}`}>
                                {moveInfo.details.type.name}
                            </div>
                            <div className="move-name">{moveInfo.move.name.replace('-', ' ')}</div>
                        </div>
                        
                        <div className="move-details">
                            <div className="move-stat">
                                Power: {moveInfo.details.power || 'N/A'}
                            </div>
                            <div className="move-stat">
                                Accuracy: {moveInfo.details.accuracy || 'N/A'}
                            </div>
                            <div className="move-stat">
                                PP: {moveInfo.details.pp}
                            </div>
                            <div className="move-stat">
                                {moveInfo.learnMethod === 'machine' ? 'Machine' : moveInfo.learnMethod.replace('-', ' ')}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SeccionMoves;