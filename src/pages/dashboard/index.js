import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import './dashboard.css';

import Menu from '../../components/Menu';
import HeaderAccount from '../../components/HeaderAccount';
import Tabs from '../../components/Tabs';

export default function Dashboard(){
    const navigate = useNavigate();
    const {walletAddress} = useParams();
    const [activeTab, setActiveTab] = useState('isa');

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
        checkConnection();
    },[])

    return(
        <div className='container-dashboard'>
            <Menu 
                changeTab={(tab) => setActiveTab(tab)}
            />

            <div className='content-dashboard'>
                <HeaderAccount wallet={walletAddress}/>
                <Tabs activeTab={activeTab} wallet={walletAddress}/>
            </div>
        </div>
    )
}