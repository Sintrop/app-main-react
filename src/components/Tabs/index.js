import React from 'react';
import './tabs.css';

export default function Tabs({activeTab, wallet}){
    return(
        <div className='container-tabs'>
            <a href={`/dashboard/${wallet}`}>dashboard </a>
            <p> | {activeTab}</p>
        </div>
    )
}