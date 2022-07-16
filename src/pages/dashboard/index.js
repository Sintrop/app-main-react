import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import './dashboard.css';

//Components
import Menu from '../../components/Menu';
import HeaderAccount from '../../components/HeaderAccount';
import TabIndicator from '../../components/TabIndicator';

//Tabs
import Register from '../../components/Tabs/Register';
import ISA from '../../components/Tabs/ISA';

//Services
import CheckUserRegister from '../../services/checkUserRegister';
import HistoryInspections from '../../components/Tabs/HistoryInspections';

export default function Dashboard(){
    const navigate = useNavigate();
    const {walletAddress} = useParams();
    const [activeTab, setActiveTab] = useState('isa');
    const {user} = CheckUserRegister({walletAddress: walletAddress});

    useEffect(() => {
        async function checkConnection(){
            if(window.ethereum){
                await window.ethereum.request({
                    method: 'eth_accounts'
                })
                .then((accounts) => {
                    if(accounts.length == 0){
                        navigate('/')
                    }else{
                        if(accounts[0] != walletAddress){
                            navigate('/')
                        }
                    }
                })
                .catch(() => {
                    console.log('error')
                })
            }
        }
        checkConnection();
    },[]);

    useEffect(() => {
        if(user == 0){
            setActiveTab('register');
            return;
        }
        setActiveTab('isa');
    }, [user]);

    return(
        <div className='container-dashboard'>
            <Menu 
                changeTab={(tab) => setActiveTab(tab)}
            />

            <div className='content-dashboard'>
                <HeaderAccount wallet={walletAddress}/>
                <TabIndicator activeTab={activeTab} wallet={walletAddress}/>

                {activeTab === 'register' && (
                    <Register wallet={walletAddress}/>
                )}

                {activeTab === 'isa' && (
                    <ISA user={user} walletAddress={walletAddress}/>
                )}

                {activeTab === 'inspections' && (
                    <HistoryInspections walletAddress={walletAddress} />
                )}
            </div>
        </div>
    )
}