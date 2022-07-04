import React, {useState, useEffect} from 'react';
import '../CreateCategory/createCategory.css';
import './voteCategory.css';

//components
import Loading from '../../Loading';

//services
import {Vote, GetTokensBalance} from '../../../services/voteService';

export default function VoteCategory({close, walletAddress, data, reloadCategories}){
    const [tokensBalance, setTokensBalance] = useState(0);
    const [sendTokens, setSendTokens] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getBalance();
    }, [])

    async function getBalance(){
        const balance = await GetTokensBalance(walletAddress);
        setTokensBalance(balance);
    }

    function validatesAmount(){
        if(sendTokens > parseFloat(tokensBalance) || sendTokens < 1){
            alert('Invalid value!');
        }else{
            vote();
        }
    }

    async function vote(){
        setLoading(true);
        await Vote(data.id, parseFloat(sendTokens), walletAddress);
        setLoading(false);
        reloadCategories();
        close();
    }
    return(
        <div className="container-create-category">
            <div className="card-vote-category">
                <div className="header-create-category">
                    <p className='tit-categories-isa'>Vote of Category</p>
                    <button
                        className="btn-close-create-category"
                        onClick={() => close()}
                    >
                        X
                    </button>
                </div>
                <div>
                    <p className='tit-your-balance'>Your balance: {tokensBalance} SAC Tokens</p>

                    <input 
                        type='number' 
                        value={sendTokens}
                        onChange={(e) => setSendTokens(e.target.value)}
                        placeholder='Amount of tokens'
                    />

                    <button
                        className='btn-vote-of-category'
                        onClick={() => validatesAmount()}
                    >
                        Vote
                    </button>
                </div>
            </div>

            {loading && (
                <Loading/>
            )}
        </div>
    );
}