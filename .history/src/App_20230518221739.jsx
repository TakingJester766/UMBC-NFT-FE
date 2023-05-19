import React, { useState } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = "<Your Contract Address>";
const ABI = "<Your Contract ABI>"; // use the ABI from your compiled contract

const MintNFT = () => {
  const [userAccount, setUserAccount] = useState(null);
  const [status, setStatus] = useState("");
  
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function mintNft(url) {
    if (!url) return;
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const transaction = await contract.mintNFT(userAccount, url);
      setStatus('Minting...');
      await transaction.wait();
      setStatus('Minted successfully');
    }
  }

  async function checkWallet() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setUserAccount(account);
    }
  }

  return (
    <div>
      <div className="container">
        <button onClick={checkWallet}>Check Wallet Connection</button>
        <p>{`Wallet Address: ${userAccount}`}</p>
        <input onChange={e => setUrl(e.target.value)} placeholder="Asset URL" />
        <button onClick={mintNft}>Mint NFT</button>
        <p>{`Minting Status: ${status}`}</p>
      </div>
    </div>
  );
}

export default MintNFT;
