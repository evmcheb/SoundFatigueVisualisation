import React,{useContext} from 'react'
import { DropDownContext } from './DropDownContext';

interface ListsProps {
className?:string;
}

export const Lists: React.FC<ListsProps> = ({children,className}) => {
    const {isShown} = useContext(DropDownContext);
        return (isShown ?<div className="listItems">{children}</div>:null);
}