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
    window.alert('Пожалуйста, установите MetaMask');

    return new Error('ethereum is undefined');
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');

    await provider.send('eth_requestAccounts', []);

    const signer = provider.getSigner();

    provider.on('network', (newNetwork, oldNetwork) => {
      const isNetworkChanged = oldNetwork !== null;

      if (isNetworkChanged) {
        window.location.reload();
      }
    });

    return { provider, signer };
  } catch (error) {
    return <globalThis.Error>error;
  }
};

export { connectMetaMask };
