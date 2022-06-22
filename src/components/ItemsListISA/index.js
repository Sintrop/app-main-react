import React, {useState, useEffect} from 'react';
import './itemsListIsa.css';

//components
import DetailsCategoryIsa from '../DetailsCategoryIsa';

export default function ItemsListISA({data}){
    const [showDetails, setShowDetails] = useState(false);

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
                <button>+ Vote</button>
            </td>

            {showDetails && (
                <DetailsCategoryIsa 
                    data={data}
                    close={() => setShowDetails(false)}
                />
            )}
        </tr>
    )
}