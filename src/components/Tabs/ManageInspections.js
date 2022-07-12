import React, {useEffect, useState} from 'react';
import './isa.css';

//components
import Loading from '../Loading';

//services
import {GetInspections, RequestInspection} from '../../services/manageInspectionsService';

export default function ManageInpections({user, walletAddress}){
    const [inspections, setInpections] = useState([{id: 'teste'}])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getInspections();
    }, [])

    async function getInspections(){
        setLoading(true);
        const res = await GetInspections();
        //setInpections(res);
        console.log(res)
        setLoading(false);
    }

    async function requestInspection(){
        setLoading(true);
        const res = await RequestInspection(walletAddress);
        console.log(res);
        setLoading(false);
    }
    return(
        <div className='container-isa-page'>
            <div className='header-isa'>
                <h1>Inspections</h1>
                <div className='area-btn-header-isa-page'>
                    {user == 1 && (
                        <button
                            className='btn-new-category-isa'
                            onClick={() => requestInspection()}
                        >
                            Request New Inspection
                        </button>
                    )}
                    <button
                        className='btn-load-categories-isa'
                        onClick={() => {}}
                    >
                        Load Inspections
                    </button>
                </div>
            </div>
            <div className='area-categories-isa'>
                {inspections.length === 0 ? (
                    <h3>No open inspection</h3>
                ) : (
                    <div className='container-table-categories'>
                        <table>
                            <thead>
                                <th>Requested By</th>
                                <th>Inspected By</th>
                                <th>Created At</th>
                                <th>Expires In</th>
                                <th>Status</th>
                                <th>Isa Score</th>
                                <th>Actions</th>
                            </thead>
                        </table>
                    </div>
                )}
            </div>

            {loading && (
                <Loading/>
            )}
        </div>
    )
}