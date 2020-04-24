import React, {useState} from 'react';
import './App.css';
import Pizza from './pizza';
import Home from './Home';
import { Route,} from 'react-router-dom'

function App() {
  const [notes, setNotes] = useState([
    
  ]);
  
  const addNewNote = block =>{
  const newBlock ={
    id: Date.now(),
    Name: block.name,
    
  };
  setNotes([...notes, newBlock])

}
  
  return (
    <div className="App">
      <h1>Lambda Eats</h1>
       <Route exact path="/">
       <Home/>
      </Route> 
 
      <Route exact path="/pizza">
        <Pizza addNewNote={addNewNote} />
      </Route>

    </div>
  );
}
export default App;

