import React, { useState, useEffect, useCallback } from 'react';
import './SnakeGame.css';

/* The `const SnakeGame = () => {` is defining a functional component in React called `SnakeGame`. This
component uses React hooks such as `useState`, `useEffect`, and `useCallback` to manage the state
and lifecycle of the game. Inside this component, the game logic for a simple Snake game is
implemented, including handling the movement of the snake, checking for collisions, updating the
score, generating food, and handling game over scenarios. */

const SnakeGame = () => {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: Math.floor(Math.random() * 20) * 10, y: Math.floor(Math.random() * 20) * 10 });
    const [direction, setDirection] = useState({ x: 0, y: 0 });
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    /* The `const moveSnake = useCallback(() => {` is defining a function called `moveSnake` using the
    `useCallback` hook in React. This function is responsible for handling the movement of the snake
    in the Snake game. */

    const moveSnake = useCallback(() => {
        const newHead = {
            x: snake[0].x + direction.x * 10,
            y: snake[0].y + direction.y * 10,
        };

        // Verifica se bateu nas bordas
        if (newHead.x < 0 || newHead.x > 390 || newHead.y < 0 || newHead.y > 390) {
            setGameOver(true);
            return;
        }

        // Verifica colisão com o próprio corpo
        if (snake.some((part, index) => part.x === newHead.x && part.y === newHead.y && index > 0)) {
            setGameOver(true);
            return;
        }

        // Verifica se comeu a comida
        if (newHead.x === food.x && newHead.y === food.y) {
            setSnake([newHead, ...snake]);
            setScore(score + 1);
            setFood({
                x: Math.floor(Math.random() * 20) * 10,
                y: Math.floor(Math.random() * 20) * 10
            });
        } else {
            setSnake([newHead, ...snake.slice(0, -1)]);
        }
    }, [snake, direction, food, score]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!gameOver) {
                moveSnake();
            }
        }, 200);

        return () => clearInterval(intervalId);
    }, [snake, direction, gameOver, moveSnake]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    

    /* The `const handleKeyDown = (event) => {` is defining an event handler function in React. This
    function is responsible for capturing keydown events on the window and updating the direction of
    the snake based on the arrow keys pressed by the user. */

    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                if (direction.y === 0) setDirection({ x: 0, y: -1 });
                break;
            case 'ArrowDown':
                if (direction.y === 0) setDirection({ x: 0, y: 1 });
                break;
            case 'ArrowLeft':
                if (direction.x === 0) setDirection({ x: -1, y: 0 });
                break;
            case 'ArrowRight':
                if (direction.x === 0) setDirection({ x: 1, y: 0 });
                break;
            default:
                break;
        }
    };

    /* `const handlePlayAgain = () => {` is defining a function called `handlePlayAgain` in the
    SnakeGame component. This function is responsible for resetting the game state when the user
    wants to play again. When the user clicks the "Play Again" button rendered in the game
    interface, this function is called. Inside the function, the following state values are reset to
    their initial values:
    - `snake`: Set to an array containing the initial position of the snake.
    - `food`: Set to a new random position for the food item.
    - `direction`: Set to { x: 0, y: 0 } to stop the snake from moving.
    - `score`: Set to 0 to reset the score.
    - `gameOver`: Set to false to indicate that the game is not over. */

    const handlePlayAgain = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood({ x: Math.floor(Math.random() * 20) * 10, y: Math.floor(Math.random() * 20) * 10 });
        setDirection({ x: 0, y: 0 });
        setScore(0);
        setGameOver(false);
    };

    /* The `return (` statement in the `SnakeGame` component is the start of the JSX (JavaScript XML)
    syntax in React. It signifies the beginning of the return value of the functional component.
    Inside the `return (` block, you define the structure of the component by returning JSX elements
    that will be rendered in the DOM. */
    
    return (
        <div className="game-container" onKeyDown={handleKeyDown} tabIndex="0">
            <div className="game-score">Score: {score}</div>
            <div className="game-area">
                <div className="game-snake">
                    {snake.map((part, index) => (
                        <div
                            key={index}
                            className={`game-snake-part ${index === 0 ? 'game-snake-head' : 'game-snake-body'}`}
                            style={{ top: `${part.y}px`, left: `${part.x}px` }}
                        >
                            {index === 0 ? '🟢' : '🟢'} {/* Cabeça da cobra como 🟢 e corpo como 🟢 */}
                        </div>
                    ))}
                </div>
                <div className="game-food" style={{ top: `${food.y}px`, left: `${food.x}px` }}>
                    🍎 {/* Comida como 🍎 */}
                </div>
            </div>
            {gameOver && <div className="game-over">Game Over</div>}
            <button onClick={handlePlayAgain}>Play Again</button> {/* Botão para jogar novamente */}
        </div>
    );
};

export default SnakeGame;
