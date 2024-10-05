import React from 'react';
import './Style/App.css';
import Chatbot from './Chatbot'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>Chatbot App</h1> */}
        <Chatbot />  
      </header>
    </div>
  );
}

export default App;
