import React , { useEffect, useState } from "react";
import InspectionsService from "../../../services/inspectionsHistoryService";
import './history.css'


function HistoryInspections({ walletAddress } ) {
    const [inspections, setInspections ] = useState([]);
    const inspection = new InspectionsService(walletAddress);
    useEffect(() => {
        inspection.getAllInspections().then( res => {
          console.log(res)
          setInspections(res);
        });
    }, [])
    
    const handleInspected = () => {
      inspection.createInspection()
    }
  return (
    <div className="container">
    <button onClick={handleInspected}>Load Inspections</button>
    <div className="table">
    <table>
      <thead>

      <tr>
        <th>Requested</th>
        <th>Inspected By</th>
        <th>Created At</th>
        <th>Expires In</th>
        <th>Status</th>
        <th>Inspected In</th>
        <th>Score</th>
      </tr>
      </thead>
      <tbody>
        <tr>
        { inspections.length > 0 ? inspections.map(item  => <td key={item.id}> {item.createdBy} </td> ) 
        
        : (
            <td>Sem Inspeções</td>
          )}
            </tr>
        </tbody>
    </table>
    </div>
    </div>
  )
}

export default HistoryInspections;
