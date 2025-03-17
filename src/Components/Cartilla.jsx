import React, { useState } from 'react';

function Cartilla({ pokemon }) {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    return (
        <div className="estiloCartilla">
            <div>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className='edicionImg' />
            </div>
            <section className='paraTextoGlobal'>
                <h2>{pokemon.name}</h2>
                <p className='itemDescriptor'>Tipo: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
                <p className='itemDescriptor'>Número: #{pokemon.id}</p>
            </section>
            <button onClick={openPopup} className='peque'>+</button>
            {isPopupOpen && (
                <div className="ventana-popup">
                    <div className="contenido-popup">
                        <p className='textoPokemon'>{pokemon.name}</p>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} className='edicionImgPop' />
                        <p> </p>
                        <button onClick={closePopup}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cartilla; 