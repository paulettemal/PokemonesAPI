import React from 'react';
function SeccionAbout({ pokemon, especieInfo }) {
    if (!especieInfo) {
        return <div>Cargando</div>;
    }

    const nombreEspecie = especieInfo.genera.find(g => g.language.name === "en")?.genus || "Unknown";
    const altura = pokemon.height / 10;
    const peso = pokemon.weight / 10;

    const habilidades = pokemon.abilities.map(ability =>
        ability.ability.name.replace('-', ' ')
    );

    const ratioGenero = especieInfo.gender_rate;

    if (ratioGenero === -1) {
        generoText = "Sin genero";
    } else {
        const porcentajeFemenino = (ratioGenero / 8) * 100;
        const porcentajeMasculino = 100 - porcentajeFemenino;
        generoText = `${porcentajeMasculino}% Male, ${porcentajeFemenino}% Female`;
    }
    const gruposHuevo = especieInfo.egg_groups.map(group =>
        group.name.replace('-', ' ')
    );
    const cicloHuevo = especieInfo.hatch_counter;
    const pasosCiclo = cicloHuevo * 255;

    return (
        <div className="contenido">
            <div className="info-row">
                <p className="tituloSecciones">Species:</p>
                <h4 className="respuesta">{nombreEspecie}</h4>
            </div>
            <div className="info-row">
                <p className="tituloSecciones">Height:</p>
                <h4 className="respuesta">{altura} m</h4>
            </div>
            <div className="info-row">
                <p className="tituloSecciones">Weight:</p>
                <h4 className="respuesta">{peso} kg</h4>
            </div>
            <div className="info-row">
                <p className="tituloSecciones">Abilities:</p>
                <h4 className="respuesta">{habilidades.join(', ')}</h4>
            </div>
            <div className="info-row">
                <p className="tituloSecciones">Gender:</p>
                <h4 className="respuesta">{generoText}</h4>
            </div>
            <div className="info-row">
                <p className="tituloSecciones">Egg Groups:</p>
                <h4 className="respuesta">{gruposHuevo.join(', ')}</h4>
            </div>

            <div className="info-row">
                <p className="tituloSecciones">Egg Cycle:</p>
                <h4 className="respuesta">{cicloHuevo} ({pasosCiclo} steps)</h4>
            </div>
        </div>
    );
}

export default SeccionAbout;