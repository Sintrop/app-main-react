import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

export default function Dashboard(){
    const navigate = useNavigate();
    const {walletAddress} = useParams();

    useEffect(() => {
        async function checkConnection(){
            var i = 0;
            var accountsIndentify = 0;
            
            if(window.ethereum){
                await window.ethereum.request({
                    method: 'eth_accounts'
                })
                .then((accounts) => {
                    if(accounts.length == 0){
                        navigate('/')
                    }else{
                        while(i <= accounts.length){
                            if(accounts[i] === walletAddress){
                                accountsIndentify++
                            }
                            i++
                            if(i > accounts.length && accountsIndentify == 0){
                                navigate('/')
                            }
                        }
                    }
                })
                .catch(() => {
                    console.log('error')
                })
            }
        }
        checkConnection()
    },[])

    return(
        <div>
            <h3>Carteira conectada: {walletAddress}</h3>
        </div>
    )
}