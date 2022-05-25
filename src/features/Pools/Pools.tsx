import { FC, useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { Add, PairForm, Typography } from 'src/shared/components';
import { REQUEST_STATUS } from 'src/shared/helpers/redux';

import { ViewPairs } from './view/containers/ViewPairs/ViewPairs';
import { selectPools, getTokens, getPairs, addLiquidity } from './redux/slice';
import { ViewType, SubmitButtonValue } from './types';

type Props = {
  userAddress: string | '';
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.providers.JsonRpcSigner | null;
};

const Pools: FC<Props> = ({ userAddress, provider, signer }) => {
  const isAuth = provider !== null && signer !== null;

  const [viewType, setViewType] = useState<ViewType>('add');
  const [isPairBalanceZero, setIsPairBalanceZero] = useState(false);
  const [tokenValues, setTokenValues] = useState<[string, string]>(['', '']);
  const [proportion, setProportion] = useState<number | 'any' | ''>('');
  const [tokensMax, setTokensMax] = useState<[number, number]>([0, 0]);
  const [submitValue, setSubmitValue] =
    useState<SubmitButtonValue>('Подключите кошелек');

  const { status, data, error } = useAppSelector(selectPools);
  const { tokens, pairs } = data;
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

  useEffect(() => {
    if (provider !== null && userAddress !== '') {
      dispatch(getPairs({ tokens, userAddress, provider }));
    }
  }, [dispatch, tokens, userAddress, provider]);

  useEffect(() => {
    if (viewType === 'remove') {
      setTokensMax([0, 0]);
      setProportion('');
      setIsPairBalanceZero(false);
    }
  }, [viewType]);

  if (submitValue === 'Подключите кошелек' && isAuth) {
    setSubmitValue('Выберите токены');
  }

  const isSubmitDisabled =
    submitValue === 'Подключите кошелек' || submitValue === 'Выберите токены';

  const handleSwitchBtnClick = () => {
    if (viewType === 'add') {
      setViewType('remove');
    } else {
      setViewType('add');
    }
  };

  const handlePairFormPairSet: Parameters<
    typeof PairForm
  >['0']['onPairSet'] = ({ pair, isSet }) => {
    if (isAuth) {
      setSubmitValue(isSet ? 'Добавить пару' : 'Выберите токены');
    } else {
      setSubmitValue(isSet ? 'Добавить пару' : 'Подключите кошелек');
    }

    const [tokenIn, tokenOut] = pair;
    const tokenInData = tokens.find((token) => token.name === tokenIn.name);
    const tokenOutData = tokens.find((token) => token.name === tokenOut.name);
    const existedPair = pairs.find(
      ({ tokens: [token0, token1] }) =>
        (token0.address === tokenInData?.address &&
          token1.address === tokenOutData?.address) ||
        (token1.address === tokenInData?.address &&
          token0.address === tokenOutData?.address)
    );

    if (existedPair?.proportion === 'any') {
      setIsPairBalanceZero(true);
    } else {
      setIsPairBalanceZero(false);
    }

    const tokensMaxToSet = pair.map(({ name }, index) => {
      if (name === '' || existedPair === undefined) {
        return '0';
      }

      const {
        tokens: [token0, token1],
      } = existedPair;

      if (existedPair.proportion === 'any') {
        return index === 0 ? token0.userBalance : token1.userBalance;
      }

      if (index === 0) {
        const maxToken0 = token1.userBalance * existedPair.proportion;

        return maxToken0 > token0.userBalance ? token0.userBalance : maxToken0;
      }

      const maxToken1 = token0.userBalance / existedPair.proportion;

      return maxToken1 > token1.userBalance ? token1.userBalance : maxToken1;
    }) as [number, number];

    setProportion(existedPair?.proportion || '');
    setTokensMax(tokensMaxToSet);
  };

  const onValueChange: Parameters<typeof PairForm>['0']['onValueChange'] = (
    event
  ) => {
    if (event !== undefined && proportion !== '') {
      const { field, value } = event;

      if (value === undefined) {
        setTokenValues(['', '']);

        return;
      }

      switch (field) {
        case 'theFirst': {
          const computedValue =
            proportion === 'any' ? tokenValues[1] : `${value / proportion}`;

          setTokenValues([`${value}`, computedValue]);

          break;
        }
        case 'theSecond': {
          const computedValue =
            proportion === 'any' ? tokenValues[0] : `${value * proportion}`;

          setTokenValues([computedValue, `${value}`]);

          break;
        }
        // no default
      }
    }
  };

  const onSubmit: Parameters<typeof PairForm>['0']['onSubmit'] = (
    submission
  ) => {
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
      let hint;

      switch (proportion) {
        case 'any': {
          hint = 'пропорция любая';

          break;
        }
        case '': {
          hint = '';

          break;
        }
        default: {
          hint = `пропорция: ${proportion}`;

          break;
        }
      }

      return viewType === 'add' ? (
        <PairForm
          title={
            isPairBalanceZero
              ? 'Добавить ликвидность с заданием пропорции'
              : 'Добавить ликвидность'
          }
          hint={hint}
          actionIcon={<Add />}
          switchBtn={{
            value: 'Мои пары',
            onClick: handleSwitchBtnClick,
          }}
          items={tokens}
          itemText={'токен'}
          values={tokenValues}
          onValueChange={onValueChange}
          max={tokensMax}
          isMaxSync={!isPairBalanceZero}
          submitValue={submitValue}
          isSubmitDisabled={isSubmitDisabled}
          onPairSet={handlePairFormPairSet}
          onSubmit={onSubmit}
        />
      ) : (
        <ViewPairs
          userAddress={userAddress}
          provider={provider}
          signer={signer}
          switchBtn={{ onClick: handleSwitchBtnClick }}
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
