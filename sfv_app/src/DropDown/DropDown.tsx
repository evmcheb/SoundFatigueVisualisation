import React, {useState} from 'react'
import {Toggle} from './partials/Toggle';
import {Lists} from './partials/Lists';
import {Item} from './partials/Item';
import {DropDownContext} from './partials/DropDownContext'
interface DropDownProps {
    className? :string;
}

export const DropDown: React.FC<DropDownProps> & {
    Toggle: typeof Toggle
    Lists: typeof Lists
    Item: typeof Item
} = ({children,className}) => {

    const [isShown, setIsShown] = useState(false)

        return (

            <div className = {className} >

                <DropDownContext.Provider value = {{
                    isShown,
                    setIsShown
                }}
                >
                {children}
                </DropDownContext.Provider>
            </div>
        );
}

DropDown.Toggle = Toggle;
DropDown.Lists = Lists;
DropDown.Item = Item;