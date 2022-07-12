import Web3 from 'web3';
import SintropContract from '../data/contracts/abis/Sintrop.json';

export const GetInspections = async () => {
    let inspections = [];
    const web3js = new Web3(window.ethereum);
    const contractAddress = SintropContract.networks[5777].address;
    const contract = new web3js.eth.Contract(SintropContract.abi, contractAddress);
    await contract.methods.getInspections().call({from: contractAddress})
    .then((res) => {
        inspections = res;
    })

    return inspections;
}

export const RequestInspection = async (walletAddress) => {
    const web3js = new Web3(window.ethereum);
    const contractAddress = SintropContract.networks[5777].address;
    const contract = new web3js.eth.Contract(SintropContract.abi, contractAddress);
    await contract.methods.requestInspection().send({from: walletAddress})
    .on('transactionHash', (hash) => {
        if(hash){
            return hash;
        }else{
            return false;
        }
    })
}