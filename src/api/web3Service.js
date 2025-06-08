import { ethers } from 'ethers';

export const web3Service = {
  async connectMetaMask() {
    if (!window.ethereum) throw new Error('MetaMask не установлен');
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return { signer, address };
  }
};