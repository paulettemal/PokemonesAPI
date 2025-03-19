import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SeccionAbout from './SeccionAbout';
import SeccionBaseStats from './SeccionBaseStats';
import SeccionEvolution from './SeccionEvolution';
import SeccionMoves from './SeccionMoves';

function Tarjeta({ pokemon, color }) {
    const [value, setValue] = useState(0);
    const [seccionActual, setSeccionActual] = useState('about');
    const [especieInfo, setEspecieInfo] = useState(null);
    const [evolutionChain, setEvolutionChain] = useState(null);
    const [movesInfo, setMovesInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function cargarDatos() {
            try {
                const especieResponse = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name.toLowerCase()}`
                );
                setEspecieInfo(especieResponse.data);
                const evolutionResponse = await axios.get(especieResponse.data.evolution_chain.url);
                setEvolutionChain(evolutionResponse.data);
            
                const enhancedMoves = await Promise.all(
                    pokemon.moves.slice(0, 2).map(async (moveInfo) => {
                        const moveResponse = await axios.get(moveInfo.move.url);
                        return {
                            ...moveInfo,
                            details: moveResponse.data,
                            learnMethod: moveInfo.version_group_details[0]?.move_learn_method.name || 'unknown'
                        };
                    })
                );
                setMovesInfo(enhancedMoves);
                
                setLoading(false);
            } catch (error) {
                console.error("Error al cargar datos:", error);
                setLoading(false);
            }
        }
        
        cargarDatos();
    }, [pokemon.name]);

    const handleChange = (event, newValue) => {
        setValue(newValue);

        switch (newValue) {
            case 0:
                setSeccionActual('about');
                break;
            case 1:
                setSeccionActual('stats');
                break;
            case 2:
                setSeccionActual('evolution');
                break;
            case 3:
                setSeccionActual('moves');
                break;
            default:
                setSeccionActual('about');
                break;
        }
    };

    const renderSeccion = () => {
        if (loading) {
            return <div className="contenido">Cargando datos...</div>;
        }
        
        switch (seccionActual) {
            case 'about':
                return <SeccionAbout pokemon={pokemon} especieInfo={especieInfo} />;
            case 'stats':
                return <SeccionBaseStats pokemon={pokemon} />;
            case 'evolution':
                return <SeccionEvolution pokemon={pokemon} evolutionChain={evolutionChain} />;
            case 'moves':
                return <SeccionMoves pokemon={pokemon} movesInfo={movesInfo} />;
            default:
                return <SeccionAbout pokemon={pokemon} especieInfo={especieInfo} />;
        }
    };

    return (
        <>
            <div className="contenedorTarjeta" style={{ background: color }}>
                <h2>{pokemon.name}</h2>
                <p className='itemDescriptor'>Tipo: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
                <p className='itemDescriptor'>Número: #{pokemon.id}</p>

                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={handleChange}
                    className='estilosBarra'
                >
                    <BottomNavigationAction label="About" />
                    <BottomNavigationAction label="Stats" />
                    <BottomNavigationAction label="Evolution" />
                    <BottomNavigationAction label="Moves" />
                </BottomNavigation>
            </div>
            <div>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} width="280px" className="moverImgTarjeta" />
            </div>
            {renderSeccion()}
        </>
    );
}

export default Tarjeta;