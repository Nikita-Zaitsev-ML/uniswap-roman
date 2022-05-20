import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum:
      | ethers.providers.ExternalProvider
      | ethers.providers.JsonRpcFetchFunc;
  }
}

const connectMetaMask = async () => {
  if (window?.ethereum === undefined) {
    return new Error('ethereum is undefined');
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send('eth_requestAccounts', []);

    const signer = provider.getSigner();

    return { provider, signer };
  } catch (error: any) {
    return new Error(error.message);
  }
};

export { connectMetaMask };
