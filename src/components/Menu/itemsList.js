import React from 'react';
import './menu.css';

export default function ItemsList({data, changeTab}){
    const {id, title, icon, action} = data;
    return(
        <div className='container-item-list' onClick={() => changeTab(id)}>
            <img className='icon-list' src={icon}/>
            <p>{title}</p>
        </div>
    )
}