import React, { useState } from 'react';
import Tarjeta from './Tarjeta';
function Cartilla({ pokemon }) {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    let color;
    
    if(pokemon.types.some(type => type.type.name === 'water')){
        color = "agua";
    } else if(pokemon.types.some(type => type.type.name === 'electric')){
        color = "electrico";
    } else if(pokemon.types.some(type => type.type.name === 'fire')){
        color = "fuego";
    } else if(pokemon.types.some(type => type.type.name === 'grass')){
        color = "planta";
    }else if(pokemon.types.some(type => type.type.name === 'bug')){
        color = "bicho";
    }else if(pokemon.types.some(type => type.type.name === 'normal')){
        color = "normal";
    }

    return (
        <div className={color}>
            <div className="estiloCartilla" onClick={openPopup}>
                <section className='paraTextoGlobal'>
                    <h2>{pokemon.name}</h2>
                    <p className='itemDescriptor'>Tipo: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
                    <p className='itemDescriptor'>Número: #{pokemon.id}</p>
                </section>
                <div >
                <div  className="circulo-transparente"/>
                <div className='circulito'></div>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className="edicionImg" />
                    
                </div>
                
                {isPopupOpen && (
                    <div className="ventana-popup">
                        <div className={color}>
                            <Tarjeta pokemon={pokemon} color={color} />
                            <button onClick={(event) => { 
                                closePopup(); 
                                event.stopPropagation();}}>
                                    Cerrar
                                </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cartilla; 