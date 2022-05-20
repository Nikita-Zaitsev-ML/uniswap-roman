import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import type { Header } from 'src/modules/shared/components';

const useAuth = () => {
  const [connection, setConnection] = useState<{
    provider: ethers.providers.Web3Provider;
    signer: ethers.providers.JsonRpcSigner;
  } | null>(null);
  const [user, setUser] = useState<{
    address: string;
    balance: string;
  } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      if (connection !== null) {
        const address = await connection.signer.getAddress();

        const balance = await connection.provider.getBalance('ethers.eth');
        const formattedBalance = `${ethers.utils.formatEther(balance)}`;

        setUser({ address, balance: formattedBalance });
      }
    })();
  }, [connection]);

  const handleHeaderOnAuth: Parameters<typeof Header>['0']['onAuth'] = async (
    metaMaskConnection
  ) => {
    if (metaMaskConnection instanceof Error) {
      setError(metaMaskConnection.message);
    } else {
      setConnection(metaMaskConnection);
    }
  };

  return { connection, user, error, handleHeaderOnAuth };
};

export { useAuth };
