
import Web3 from "web3";
import Sintrop from  '../data/contracts/abis/Sintrop.json';
class InspectionsHistoryService {
    constructor(wallet) {
        this.web3 = new Web3(window.ethereum);
        this.wallet = wallet;
        this.sintropDataNetwork = Sintrop.networks["5777"];
        this.sintropContractAddress = this.sintropDataNetwork.address;
        this.sintroptABI = Sintrop.abi;
    }


    // async createInpsection() {

    //     if (this.sintropContractAddress && this.sintropDataNetwork) {
    //         const SintropContract = new this.web3.eth.Contract(this.sintroptABI, this.sintropContractAddress);
    //         await SintropContract.methods.requestInspection().send({ from: this.wallet })
    //             .then(result => console.log(result))
    //             .catch(error => console.log(error));

    //       } 
    // }

    async getAllInspections(){

        if (this.sintropContractAddress && this.sintropDataNetwork) {
            const SintropContract = new this.web3.eth.Contract(this.sintroptABI, this.sintropContractAddress);
            const inspections = await SintropContract.methods.getInspections().call()

            return inspections;
          } 
    }
}



export default InspectionsHistoryService; 