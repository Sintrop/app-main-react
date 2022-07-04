import React, {useState, useEffect} from 'react';
import './itemsListIsa.css';

//components
import DetailsCategoryIsa from '../DetailsCategoryIsa';
import VoteCategory from '../VoteCategory';
import Loading from '../../Loading';

//services
import {IsVoted, Unvote} from '../../../services/voteService';

export default function ItemsListISA({data, walletAddress, reloadCategories}){
    const [showDetails, setShowDetails] = useState(false);
    const [showVoteCard, setShowVoteCard] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryVoted, setCategoryVoted] = useState(false);

    useEffect(() => {
        checkIsVoted();
    },[])

    async function checkIsVoted(){
        const response = await IsVoted(walletAddress, data.id);
        if(parseFloat(response) > 0){
            setCategoryVoted(true);
        }else{
            setCategoryVoted(false);
        }
    }

    async function testUnvote(){
        const response = await Unvote(data.id, walletAddress);
        console.log(response)
    }

    return(
        <tr key={data.id}>
            <td id='createdByContentIsa'>
                <button
                    onClick={() => setShowDetails(true)}
                >
                    ...
                </button>
                <p>{data.createdBy}</p>    
            </td>
            <td>
                <p>
                    {data.name}
                </p>
            </td>
            <td>
                <p>{data.description}</p>    
            </td>
            <td>{data.votesCount}</td>
            <td id='td-vote-table-isa'>
                {categoryVoted && (
                    <button
                        onClick={() => testUnvote()}
                        className='btn-unvote'
                    >
                        - Unvote
                    </button>
                )}
                <button
                    onClick={() => setShowVoteCard(true)}
                    className='btn-vote'
                >
                    + Vote
                </button>
            </td>

            {showDetails && (
                <DetailsCategoryIsa 
                    data={data}
                    close={() => setShowDetails(false)}
                />
            )}

            {showVoteCard && (
                <VoteCategory
                    close={() => setShowVoteCard(false)}
                    walletAddress={walletAddress}
                    data={data}
                    reloadCategories={() => reloadCategories()}
                />
            )}

            {loading && (
                <Loading/>
            )}
        </tr>
    )
}