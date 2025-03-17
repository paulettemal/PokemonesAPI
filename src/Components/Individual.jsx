function Individual({ pokemon }) {
    return (
        <div className= "estiloIndividual">
                <h2>{pokemon.name}</h2>
                <p className='itemDescriptor'>Tipo: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
                <p className='itemDescriptor'>Número: #{pokemon.id}</p>
                <div>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} className='edicionImg'/>
                </div>
            
        </div>
        );
    }
export default Individual;