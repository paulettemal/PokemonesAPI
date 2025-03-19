import React from 'react';
function SeccionEvolution({ pokemon, evolutionChain }) {
    if (!evolutionChain) {
        return <div className="contenido">Cargando</div>;
    }

    const extractEvolutions = (chain) => {
        const evolutions = [];
        evolutions.push({
            name: chain.species.name,
            url: `https://pokeapi.co/api/v2/pokemon/${chain.species.name}`,
            evolutionDetails: null
        });
        
        if (chain.evolves_to.length > 0) {
            chain.evolves_to.forEach(evolution => {
                const evolutionDetails = evolution.evolution_details[0] || {};
                evolutions.push({
                    name: evolution.species.name,
                    url: `https://pokeapi.co/api/v2/pokemon/${evolution.species.name}`,
                    evolutionDetails: evolutionDetails
                });
                
                if (evolution.evolves_to.length > 0) {
                    evolution.evolves_to.forEach(furtherEvolution => {
                        const furtherDetails = furtherEvolution.evolution_details[0] || {};
                        evolutions.push({
                            name: furtherEvolution.species.name,
                            url: `https://pokeapi.co/api/v2/pokemon/${furtherEvolution.species.name}`,
                            evolutionDetails: furtherDetails
                        });
                    });
                }
            });
        }
        return evolutions;
    };

    const evolutions = extractEvolutions(evolutionChain.chain);

    return (
        <div className="contenido">
            <h3 className="evolution-title">Evolution Chain</h3>
            <div className="evolution-container">
                {evolutions.map((evolution, index) => (
                    <React.Fragment key={evolution.name}>
                        <div className="evolution-pokemon">
                            <h3 className="evolution-pokemon-name">{evolution.name}</h3>
                            {evolution.evolutionDetails && evolution.evolutionDetails.min_level && (
                                <div className="evolution-level">
                                    <span className="level-icon">↑</span> Level {evolution.evolutionDetails.min_level}
                                </div>
                            )}
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.url.split('/')[6]}.png`}
                                alt={evolution.name}
                                className="evolution-image"
                            />
                        </div>
                        {index < evolutions.length - 1 && (
                            <div className="evolution-arrow">→</div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default SeccionEvolution;