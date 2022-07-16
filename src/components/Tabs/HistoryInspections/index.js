import React , { useEffect, useState } from "react";
import InspectionsService from "../../../services/inspectionsHistoryService";



function HistoryInspections({ walletAddress } ) {
    const [inspections, setInspections ] = useState([]);
    const inspection = new InspectionsService(walletAddress);
    useEffect(() => {
        setInspections(inspection.getAllInspections())
    }, [])


  return (
    <ul>
        {inspections.map(item  => <li key={item.id}> {item.id} </li> )}
    </ul>
  )
}

export default HistoryInspections;
