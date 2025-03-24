import React from 'react';

function SeccionEvolution({ pokemon, evolutionChain }) {
    const [evolutions, setEvolutions] = React.useState(null);

    const getPokemonImageUrl = async (pokemonName) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const data = await response.json();
            return data.sprites.front_default;
        } catch (error) {
            console.error("Error al obtener la imagen del Pokémon:", error);
            return null;
        }
    };
    const extractEvolutions = async (chain) => {
        const evolutions = [];

        const processEvolution = async (evolutionData) => {
            const imageUrl = await getPokemonImageUrl(evolutionData.species.name);
            evolutions.push({
                name: evolutionData.species.name,
                url: `https://pokeapi.co/api/v2/pokemon/${evolutionData.species.name}`,
                evolutionDetails: evolutionData.evolution_details[0] || {},
                imageUrl: imageUrl,
            });

            if (evolutionData.evolves_to && evolutionData.evolves_to.length > 0) {
                for (const nextEvolution of evolutionData.evolves_to) {
                    await processEvolution(nextEvolution);
                }
            }
        };

        await processEvolution(chain);
        return evolutions;
    };

    React.useEffect(() => {
        const fetchEvolutions = async () => {
            if (evolutionChain) {
                const evoData = await extractEvolutions(evolutionChain.chain);
                setEvolutions(evoData);
            }
        };
        fetchEvolutions();
    }, [evolutionChain]);

    if (!evolutions) {
        return <div className="contenido">Cargando</div>;
    }

    return (
        <div className="contenido">
            <h3 className="evolution-title">Evolution Chain</h3>
            <div className="evolution-container">
                {evolutions.map((evolution, index) => (
                    <React.Fragment key={evolution.name}>
                        <div className="evolution-pokemon">
                            <h3 className="nombreEvolucion">{evolution.name}</h3>
                            {evolution.evolutionDetails && evolution.evolutionDetails.min_level && (
                                <div className="evolution-level">
                                    <span className="level-icon">↑</span> Level {evolution.evolutionDetails.min_level}
                                </div>
                            )}
                            {evolution.imageUrl && (
                                <img
                                    src={evolution.imageUrl}
                                    alt={evolution.name}
                                    className="evolution-image"
                                />
                            )}
                        </div>
                        {index < evolutions.length - 1 && (
                            <div className="arrow">→</div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default SeccionEvolution;