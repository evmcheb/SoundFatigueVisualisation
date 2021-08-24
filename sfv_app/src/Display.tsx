import React,{useState} from 'react'
import {GraphOne} from './GraphOne';
import {AnimatedCircle} from './AnimatedCircle';
import './App.css';
interface DisplayProps {

}

export const Display: React.FC<DisplayProps> = ({}) => {
    const[showText,setShowText] = useState(false);
    const onClick = () => setShowText(true);
        return (
            <div>
            <button onClick={onClick} className="displayButton">
                Display Graphs
            </button>
            {showText ? 
            <div>
            <GraphOne/> 
           
            </div>
            :null}
            </div>
        );
}
