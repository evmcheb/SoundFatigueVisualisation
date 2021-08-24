import React,{useState} from 'react'
import {GraphOne} from './GraphOne';
import {AnimatedCircle} from './AnimatedCircle';
import './App.css';
import SimpleChart from './SimpleChart';
import { SimpleReactVizChart } from './SimpleReactVizChart';
import Example from './Example';
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
            <SimpleChart/>
            <SimpleReactVizChart/>
            <Example/>
            </div>
            :null}
            </div>
        );
}
