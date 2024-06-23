import './App.css';
import './fonts/Raleway-VariableFont_wght.ttf'
import GameFieldComponent from './components/gameField/GameFieldComponent';

function App() {
  
  return (
    <div className="game">
      <div className="game-hint">
        <img src="/assets/images/finger.svg" alt="" />
        <p className='hint-text'>Перемещай предметы на картинку, чтобы отвечать на вопросы</p>
      </div>
      <GameFieldComponent/>
    </div>
  )
}

export default App;
