
import React, { useState, useEffect } from 'react';
import Cartilla from './Cartilla';
import Individual from './Individual';

function ListaPokemones() {
    const [pokemones, setPokemones] = useState([]);

    useEffect(() => {
        const getPokemones = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await response.json();

        const pokemonPromises = data.results.map(async (result) => {
            const pokemonResponse = await fetch(result.url);
            return pokemonResponse.json();
        });

        const datos = await Promise.all(pokemonPromises);
        setPokemones(datos);
        };

        getPokemones();
    }, []);
    const pasa = () => {
        <Individual key={pokemon.name} pokemon={pokemon}/>;
    }
    return (
        <div className='estilosParaLista'>
        {pokemones.map((pokemon) => (
            <Cartilla key={pokemon.name} pokemon={pokemon} />
        ))}
        </div>
    );
}

export default ListaPokemones;
