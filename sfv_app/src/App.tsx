import React from 'react';
import './App.css';
import { DropDown } from './DropDown/DropDown';
import {Headers} from './Headers';
import {Display} from './Display';
function App() {
  return (
    <div className="App">
      <div className = "top-container1">
        <Headers>

        </Headers>
        <DropDown className= "my-dropdown">
            <DropDown.Toggle>
              Category
            </DropDown.Toggle>
            <DropDown.Lists>
              
              <DropDown.Item>Personel</DropDown.Item>
              <DropDown.Item>Teams</DropDown.Item>
              <DropDown.Item>Area</DropDown.Item>
            
            </DropDown.Lists>
        </DropDown>
        
      </div>
      <div className = "body-container">
        <Display/>
      </div>
    </div>
    
  );
}

export default App;
