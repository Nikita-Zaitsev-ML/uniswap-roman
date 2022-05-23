import { FC, useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { Add, PairForm, Typography } from 'src/shared/components';
import { REQUEST_STATUS } from 'src/shared/helpers/redux';

import { ViewPairs } from './view/containers/ViewPairs/ViewPairs';
import { selectPools, getTokens, addLiquidity } from './redux/slice';
import { ViewType, SubmitButtonValue } from './types';

type Props = {
  userAddress: string | '';
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.providers.JsonRpcSigner | null;
};

const Pools: FC<Props> = ({ userAddress, provider, signer }) => {
  const isAuth = provider !== null && signer !== null;

  const { status, data, error } = useAppSelector(selectPools);
  const { tokens } = data;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (provider !== null && userAddress !== '') {
      dispatch(
        getTokens({
          userAddress,
          provider,
        })
      );
    }
  }, [dispatch, provider, userAddress]);

  const [viewType, setViewType] = useState<ViewType>('edit');

  const handleSwitchBtnClick = () => {
    if (viewType === 'edit') {
      setViewType('view');
    } else {
      setViewType('edit');
    }
  };

  const [tokensMax, setTokensMax] = useState<[number, number]>([0, 0]);

  const [submitValue, setSubmitValue] =
    useState<SubmitButtonValue>('Подключите кошелек');

  if (submitValue === 'Подключите кошелек' && isAuth) {
    setSubmitValue('Выберите токены');
  }

  const isSubmitDisabled =
    submitValue === 'Подключите кошелек' || submitValue === 'Выберите токены';

  const handlePairFormPairSet: Parameters<
    typeof PairForm
  >['0']['onPairSet'] = ({ pair, isSet }) => {
    console.log('t', pair, isSet);

    if (isAuth) {
      setSubmitValue(isSet ? 'Добавить пару' : 'Выберите токены');
    } else {
      setSubmitValue(isSet ? 'Добавить пару' : 'Подключите кошелек');
    }

    const tokensMaxToSet = pair.map(({ name }) => {
      if (name === '') {
        return 0;
      }

      const tokenData = tokens.find((token) => token.name === name);

      return tokenData?.userBalance || 0;
    }) as [number, number];

    setTokensMax(tokensMaxToSet);
  };

  const onSubmit: Parameters<typeof PairForm>['0']['onSubmit'] = (
    submission
  ) => {
    console.log('d: ', submission, tokens);
    const { theFirstItem, theSecondItem } = submission;
    const tokenIn = tokens.find((token) => token.name === theFirstItem);
    const tokenOut = tokens.find((token) => token.name === theSecondItem);

    const tokenInAddress = tokenIn?.address;
    const tokenInValue = Number(submission.theFirstItemValue);
    const tokenInDecimals = tokenIn?.decimals;
    const tokenOutAddress = tokenOut?.address;
    const tokenOutValue = Number(submission.theSecondItemValue);
    const tokenOutDecimals = tokenOut?.decimals;

    const areOptionsValid =
      tokenInAddress !== undefined &&
      tokenInDecimals !== undefined &&
      tokenOutAddress !== undefined &&
      tokenOutDecimals !== undefined &&
      provider !== null &&
      signer !== null;

    if (areOptionsValid) {
      dispatch(
        addLiquidity({
          tokenInAddress,
          tokenInValue,
          tokenInDecimals,
          tokenOutAddress,
          tokenOutValue,
          tokenOutDecimals,
          provider,
          signer,
        })
      );
    }
  };

  switch (status) {
    case REQUEST_STATUS.idle:
    case REQUEST_STATUS.pending:
    case REQUEST_STATUS.fulfilled: {
      return viewType === 'edit' ? (
        <PairForm
          title="Добавить ликвидность"
          actionIcon={<Add />}
          switchBtn={{
            value: 'Мои пары',
            onClick: handleSwitchBtnClick,
          }}
          items={tokens}
          itemText={'токен'}
          max={tokensMax}
          submitValue={submitValue}
          isSubmitDisabled={isSubmitDisabled}
          onPairSet={handlePairFormPairSet}
          onSubmit={onSubmit}
        />
      ) : (
        <ViewPairs
          switchBtn={{ value: 'Добавить пару', onClick: handleSwitchBtnClick }}
        />
      );
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

export { Pools };
