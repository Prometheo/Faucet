import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Abi from './contractAbi.json';



function App() {

  const minterAddress = "0x316748158Bf8a5C50cfF39aef9AC44aD0a9579B6";
  const [address, setAddresss] = useState('')
  const [error, setError] = useState('')
  const [errorState, setErrorState] = useState('hidden')
  const displays = {
    display: errorState
  };

  async function faucet() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(minterAddress, Abi.abi, signer);
      try {
        await contract.mint(address);
        alert("Token sent, check your wallet, Contract address: 0x316748158Bf8a5C50cfF39aef9AC44aD0a9579B6")
      } catch (error) {
        console.log(error)
        setErrorState('none')
        setError(error.data.message)
      }
      
    } else {
      alert('download Metamask')
    }
  }

  const handleAddress = (evt) => {
    evt.preventDefault();
    try {
      let validatedAddress = ethers.utils.getAddress(evt.target.value)
      setAddresss(validatedAddress);
      setErrorState('hidden')
    } catch (e) {
      console.log(e)
      let err = e.value !== '' ? "invalid Address" : '';
      setError(err)
      setAddresss(evt.target.value)
      setErrorState(e.value==='' ? 'hidden' : 'none')
    }
    
    console.log(evt.target.value)
  }


  return (
    <div className="text-center w-max sm:w-screen align-center gap-40 py-5 h-screen flex flex-col justify-start bg-main">
        <div className="flex flex-row sm:space-x-80 ">
          <div className="flex">
            <a href="/">
              <img className="h-9 w-auto" src="https://res.cloudinary.com/zerubbabel/image/upload/v1630013463/mpicon.svg" alt="" />
            </a>
          </div>
          <div>
          <p className="mt-2 text-3xl leading-8 text-center font-extrabold tracking-tighter text-gray-900 sm:text-4xl">
            Minority Governace Token
          </p>
          <p className="mt-4 max-w-2xl text-xl text-center tracking-tight text-gray-100 lg:mx-auto">
            Note: To be eligible for the governance token, you must possess a minority token in your wallet. each wallet is entitled to only one governance token request.
          </p>
          </div>
        </div>

        <div>
          <input type="text" value={address} onChange={handleAddress} placeholder="Enter your address" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border-0 shadow outline-none w-80 h-8 focus:outline-none focus:ring"></input>
          <p className={` ${displays.display} items-center text-red-500 text-1xl mt-1 ml-1`}>
            {error}
          </p>
          <p>
          <button onClick={faucet} className="text-pink-500 bg-transparent mt-3 border border-solid border-pink-500 hover:bg-pink-500 hover:text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
              >
          Send My Token
        </button>
          </p>
          
          
        </div>
        


          
    </div>

  );
}

export default App;
