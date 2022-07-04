import React from 'react';
import './headerAccount.css'

export default function HeaderAccount({wallet}){
    return(
        <div className='container-header-account'>
            <p>ACCOUNT: {wallet}</p>
            <p>icon</p>
        </div>
    )
}