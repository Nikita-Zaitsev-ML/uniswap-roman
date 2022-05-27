import { FC, useEffect } from 'react';
import { ethers } from 'ethers';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { LinearProgress, Typography } from 'src/shared/components';
import { REQUEST_STATUS } from 'src/shared/helpers/redux';

import { getData, selectContainer } from './redux/slice';
import { Pools, Swap } from './view/containers';

type Props = {
  userAddress: string | '';
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.providers.JsonRpcSigner | null;
  view: 'Pools' | 'Swap';
};

const Container: FC<Props> = ({ userAddress, provider, signer, view }) => {
  const { status, error } = useAppSelector(selectContainer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (provider !== null && userAddress !== '') {
      dispatch(
        getData({
          userAddress,
          provider,
        })
      );
    }
  }, [dispatch, provider, userAddress]);

  switch (status) {
    case REQUEST_STATUS.idle: {
      return null;
    }
    case REQUEST_STATUS.pending: {
      return <LinearProgress position="fixed-top" />;
    }
    case REQUEST_STATUS.fulfilled: {
      switch (view) {
        case 'Pools': {
          return (
            <Pools
              userAddress={userAddress}
              provider={provider}
              signer={signer}
            />
          );
        }
        case 'Swap': {
          return <Swap provider={provider} signer={signer} />;
        }
        default: {
          return null;
        }
      }
    }
    case REQUEST_STATUS.rejected: {
      return <Typography>{error}</Typography>;
    }
    default: {
      return null;
    }
  }
};

export type { Props };

export { Container };
