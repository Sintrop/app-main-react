import Web3 from "web3";
import ProducerContract from "../data/contracts/abis/ProducerContract.json";
import ActivistContract from "../data/contracts/abis/ActivistContract.json";
import { toast } from 'react-toastify';


class RegisterService { 
  constructor(wallet){
    this.web3 = new Web3(window.ethereum);
    this.address = wallet;
  }

   async addActivist (
    name,
    document,
    documentType,
    country,
    state,
    city,
    cep
  
  ){
    const activistDataNetwork = ActivistContract.networks["5777"];
    const activistContractAddress = activistDataNetwork.address;
    const activistABI = ActivistContract.abi;
    if (activistContractAddress && activistDataNetwork) {
      const activistContract =  new this.web3.eth.Contract(
        activistABI,
        activistContractAddress
      );
      
      if(activistContract){
        await activistContract.methods.addActivist(
          name,
          document,
          documentType,
          country,
          state,
          city,
          cep
        ).send( { from: this.address }).on('error', (error, receipt ) => console.log(error, receipt))
      }
    }
  }


  async addProducer (
    name,
    document,
    documentType,
    country,
    state,
    city,
    cep
  
  ) {
    const producerDataNetwork = ProducerContract.networks["5777"];
    const producerContractAddress = producerDataNetwork.address;
    console.log(producerContractAddress)
    const producerABI = ProducerContract.abi;
    if (producerContractAddress && producerDataNetwork) {
      const producerContract =  new this.web3.eth.Contract(
        producerABI,
        producerContractAddress
      );
      
      if(producerContract){
      
        producerContract.methods.addProducer(
          name,
          document,
          documentType,
          country,
          state,
          city,
          cep
        ).send( { from: this.address }, (err, result) => {
          console.log(err, result)
        });
      }
    }
  };

}

export default RegisterService;







