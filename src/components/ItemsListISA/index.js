import React, {useState, useEffect} from 'react';
import './itemsListIsa.css';

//Contract
import Web3 from 'web3';
import CategoryContract from '../../data/contracts/abis/CategoryContract.json';

//components
import DetailsCategoryIsa from '../DetailsCategoryIsa';
import Loading from '../Loading';

export default function ItemsListISA({data, walletAddress, reloadCategories}){
    const [showDetails, setShowDetails] = useState(false);
    const [loading, setLoading] = useState(false);

    async function vote(){
        setLoading(true);
        const contractAddress = CategoryContract.networks[5777].address;
        const web3js = new Web3(window.ethereum);
        const contract = new web3js.eth.Contract(CategoryContract.abi, contractAddress);
        contract.methods.vote(parseInt(data.id), 50).send({from: walletAddress})
        .on('transactionHash', (hash) => {
            setLoading(false);
            reloadCategories();
        })
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
                <button
                    onClick={() => vote()}
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

            {loading && (
                <Loading/>
            )}
        </tr>
    )
}