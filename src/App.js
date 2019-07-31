//IMPORT
import React from 'react';
//COMPONENT IMPORT
import Quiz from './components/quiz.component';
//STYLESHEET IMPORT
import './App.css'

//REACT COMPONENT FUNCTION
function App() {
  return (
    <div className="App">
      <div id='container'>
        <div id='title'>
          <h1>Quiz Project</h1>
        </div>
        <Quiz/>
      </div>
    </div>
  );
}

//EXPORT CLASS
export default App;
