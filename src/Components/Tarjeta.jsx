//npm install @mui/material @emotion/react @emotion/styled
import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InfoIcon from '@mui/icons-material/Info';
import ListIcon from '@mui/icons-material/List';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import SeccionAbout from './SeccionAbout';
import SeccionEvolucion from './SeccionEvolution';

function Tarjeta({ pokemon, color }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const handleChange = (event, newValue) => {
            setValue(newValue);
            switch (newValue) {
                case 0:
                    <SeccionAbout pokemon={pokemon} />
                    break;
                case 1:
                    <SeccionBaseStats pokemon={pokemon} />
                    break;
                case 2:
                    <SeccionEvolution pokemon={pokemon} />
                    break;
                case 3:
                    <SeccionMoves pokemon={pokemon} />
                    break;
            }
        };
    };

    return (
        <div className="contenedorTarjeta" style={{ background: color }}>
            <h2>{pokemon.name}</h2>
            <p>Tipo: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
            <p>Número: #{pokemon.id}</p>
            <div>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} width="280px" className="moverImgTarjeta" />
            </div>

            <BottomNavigation
                value={value}
                onChange={handleChange}
                showLabels
            >
                <BottomNavigationAction label="About" />
                <BottomNavigationAction label="Base stats"/>
                <BottomNavigationAction label="Evolution" />
                <BottomNavigationAction label="Moves" />
            </BottomNavigation>
        </div>
    );
}

export default Tarjeta;