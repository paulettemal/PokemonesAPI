import React, { Component } from 'react';
import ListaPokemones from './Components/ListaPokemones';
import './App.css';

function App() {
  return (
    <div>
      <h1 className='tema'>Pokedex</h1>
      <ListaPokemones />
    </div>
  );
}

export default App;