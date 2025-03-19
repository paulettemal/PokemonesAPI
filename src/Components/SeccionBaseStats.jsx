import React from 'react';

function SeccionBaseStats({ pokemon }) {
    const stats = pokemon.stats;
    
    const getBarColor = (value) => {
        if (value < 50) return 'stat-bar-low';
        return 'stat-bar-high';
    };
    
    const getBarWidth = (value) => {
        const percentage = Math.min(100, value);
        return `${percentage}%`;
    };
    
    const formatStatName = (statName) => {
        switch(statName) {
        case 'hp': return 'HP';
        case 'attack': return 'Attack';
        case 'defense': return 'Defense';
        case 'special-attack': return 'Sp. Atk';
        case 'special-defense': return 'Sp. Def';
        case 'speed': return 'Speed';
        default: return statName;
        }
    };

    return (
        <div className="contenido stats-container">
        {stats.map((stat) => (
            <div key={stat.stat.name} className="stat-row">
            <p className="tituloSecciones stat-name">{formatStatName(stat.stat.name)}</p>
            <p className="stat-value">{stat.base_stat}</p>
            <div className="stat-bar-container">
                <div
                className={`stat-bar ${getBarColor(stat.base_stat)}`}
                style={{ width: getBarWidth(stat.base_stat) }}
                />
            </div>
            </div>
        ))}
        </div>
    );
}

export default SeccionBaseStats;