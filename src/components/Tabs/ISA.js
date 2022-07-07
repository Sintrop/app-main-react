import React, {useState, useEffect} from 'react';
import './isa.css';

import Web3 from 'web3';
import CategoryContract from '../../data/contracts/abis/CategoryContract.json';

//components
import CreateCategory from '../IsaPageComponents/CreateCategory';
import ItemsListISA from '../IsaPageComponents/ItemsListISA';
import Loading from '../Loading';

export default function ISA({user, walletAddress}){
    const [categories, setCategories] = useState([]);
    const [isCreateCategory, setIsCreateCategory] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCategories()
    },[])

    function getCategories(){
        setLoading(true);
        const contractAddress = CategoryContract.networks[5777].address;
        const web3js = new Web3(window.ethereum);
        const contract = new web3js.eth.Contract(CategoryContract.abi, contractAddress)
        contract.methods.getCategories().call({from: contractAddress})
        .then((res) => {
            setCategories(res);
            setLoading(false);
        })
    }

    return(
        <div className='container-isa-page'>
            <div className='header-isa'>
                <h1>Sustainable Agriculture Index</h1>
                <div className='area-btn-header-isa-page'>
                    {user == 2 && (
                        <button
                            className='btn-new-category-isa'
                            onClick={() => setIsCreateCategory(true)}
                        >
                            Create New Category
                        </button>
                    )}
                    <button
                        className='btn-load-categories-isa'
                        onClick={() => getCategories()}
                    >
                        Load Categories
                    </button>
                </div>
            </div>

            <div className='area-categories-isa'>
                <p className='tit-categories-isa'>Categories</p>
                {categories.length === 0 ? (
                    <h1>No category registered</h1>
                ) : (
                    <div className='container-table-categories'>
                        <table>
                            <thead>
                                <th id='createdByIsaTable'>Created By</th>
                                <th id='categories-isa-table'>Categories</th>
                                <th>Description</th>
                                <th id='votes-isa-table'>Number Of Votes</th>
                                <th id='config-isa-table'>Config</th>
                            </thead>
                            <tbody>
                                {categories.map(item => {
                                    return(
                                        <ItemsListISA 
                                            data={item} 
                                            key={item.id} 
                                            walletAddress={walletAddress}
                                            reloadCategories={() => getCategories()}
                                        />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
           
            {isCreateCategory && (
                <CreateCategory 
                    closeCreateCategory={() => setIsCreateCategory(false)}
                    walletAddress={walletAddress}
                    reloadCategories={() => getCategories()}
                />
            )}

            {loading && (
                <Loading/>
            )}
        </div>
    )
}