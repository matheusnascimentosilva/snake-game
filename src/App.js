import React from 'react';
import './App.css';
import './components/SnakeGame.css'
import SnakeGame from './components/SnakeGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Snake Game</h1>
        <SnakeGame /> {/* Renderiza o jogo Snake */}
      </header>
    </div>
  );
}

export default App;
