
import Web3 from "web3";
import Sintrop from  '../data/contracts/abis/Sintrop.json';
import ActivistContract from  '../data/contracts/abis/ActivistContract.json';
import ProducerContract from  '../data/contracts/abis/ProducerContract.json';
class InspectionsHistoryService {
    constructor(wallet) {
        this.web3 = new Web3(window.ethereum);
        this.wallet = wallet;
        console.log(this.wallet)
    }


    async getAllInspections(){
        // const activistAddress = ActivistContract.networks["5777"].address;
        // const producerAddress = ProducerContract.networks["5777"].address;

        
        const sintropDataNetwork = Sintrop.networks["5777"];
        const sintropContractAddress = sintropDataNetwork.address;
        const sintroptABI = Sintrop.abi;

        if (sintropContractAddress && sintropDataNetwork) {
            const SintropContract = new this.web3.eth.Contract(sintroptABI, sintropContractAddress);
            const inspections = await SintropContract.methods.getInspectionsHistory().call()

            return inspections;
          } 
    }
}



export default InspectionsHistoryService; 