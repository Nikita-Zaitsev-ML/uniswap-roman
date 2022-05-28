import { FC, useState } from 'react';
import { ethers } from 'ethers';
import { useTheme } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { ArrowDownward, Box, Typography } from 'src/shared/components';
import { BigNumber, parseUnits } from 'src/shared/helpers/blockchain/numbers';

import { selectProvider, swapIn } from '../../../redux/slice';
import { PairForm } from '../../components/PairForm/PairForm';
import { SubmitButtonValue } from './types';
import { createStyles } from './Swap.style';

type Props = {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.providers.JsonRpcSigner | null;
};

const Swap: FC<Props> = ({ provider, signer }) => {
  const isAuth = provider !== null && signer !== null;

  const theme = useTheme();
  const styles = createStyles(theme);

  const [tokenValues, setTokenValues] = useState<string[]>(['', '']);
  const [proportion, setProportion] = useState<{
    value: string | 'any' | '';
    decimals: number;
  }>({ value: '', decimals: 0 });
  const [tokensMax, setTokensMax] = useState<string[]>(['0', '0']);
  const [submitValue, setSubmitValue] =
    useState<SubmitButtonValue>('Подключите кошелек');

  const { data } = useAppSelector(selectProvider);
  const { tokens, pairs, fee } = data;
  const dispatch = useAppDispatch();

  if (submitValue === 'Подключите кошелек' && isAuth) {
    setSubmitValue('Выберите токены');
  }

  const canSwap = !(proportion.value === '' || proportion.value === 'any');
  const isSubmitDisabled =
    !canSwap ||
    submitValue === 'Подключите кошелек' ||
    submitValue === 'Выберите токены';

  const handlePairFormPairSet: Parameters<
    typeof PairForm
  >['0']['onPairSet'] = ({ pair, isSet }) => {
    if (isAuth) {
      setSubmitValue(isSet ? 'Обменять' : 'Выберите токены');
    } else {
      setSubmitValue(isSet ? 'Обменять' : 'Подключите кошелек');
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

    if (existedPair !== undefined) {
      const {
        tokens: [token0, token1],
      } = existedPair;

      const tokensMaxToSet = pair.map(({ name }, index) => {
        if (name === '' || existedPair.proportion === 'any') {
          return '0';
        }

        if (index === 1) {
          const maxToken1 = new BigNumber(token0.userBalance)
            .div(existedPair.proportion)
            .toString();

          const token1MaxToSet = new BigNumber(maxToken1).gt(token1.userBalance)
            ? token1.userBalance
            : maxToken1;

          return token1MaxToSet;
        }

        const maxToken0 = new BigNumber(token1.userBalance)
          .times(existedPair.proportion)
          .toString();
        const token0MaxToSet = new BigNumber(maxToken0).gt(token0.userBalance)
          ? token0.userBalance
          : maxToken0;

        return token0MaxToSet;
      });

      const shouldReverse =
        token0.address === tokenOutData?.address &&
        token1.address === tokenInData?.address;

      if (shouldReverse) {
        setProportion({
          value: new BigNumber('1').div(existedPair.proportion).toString(),
          decimals: existedPair.decimals,
        });

        setTokenValues(tokenValues.reverse());
        setTokensMax(tokensMaxToSet.reverse());
      } else {
        setProportion({
          value: existedPair.proportion,
          decimals: existedPair.decimals,
        });
        setTokensMax(tokensMaxToSet);
      }
    } else {
      setProportion({
        value: '',
        decimals: 0,
      });
      setTokenValues(['', '']);
      setTokensMax(['0', '0']);
    }
  };

  const onValueChange: Parameters<typeof PairForm>['0']['onValueChange'] = (
    event
  ) => {
    if (event !== undefined && proportion.value !== '') {
      const { field, value } = event;

      if (value === undefined || value === '') {
        setTokenValues(['', '']);

        return;
      }

      switch (field) {
        case 'theFirst': {
          const computedValue =
            proportion.value === 'any'
              ? tokenValues[1]
              : new BigNumber(value).div(proportion.value).toString();

          setTokenValues([value, computedValue]);

          break;
        }
        case 'theSecond': {
          const computedValue =
            proportion.value === 'any'
              ? tokenValues[0]
              : new BigNumber(value).times(proportion.value).toString();

          setTokenValues([computedValue, value]);

          break;
        }
        // no default
      }
    }
  };

  const onSubmit: Parameters<typeof PairForm>['0']['onSubmit'] = async (
    submission
  ) => {
    const { theFirstItem, theSecondItem } = submission;
    const tokenIn = tokens.find((token) => token.name === theFirstItem);
    const tokenOut = tokens.find((token) => token.name === theSecondItem);
    const tokenInAddress = tokenIn?.address;
    const tokenInValue = submission.theFirstItemValue;
    const tokenInDecimals = tokenIn?.decimals;
    const tokenOutAddress = tokenOut?.address;
    const tokenOutValue = submission.theSecondItemValue;
    const tokenOutDecimals = tokenOut?.decimals;

    const areOptionsValid =
      tokenInAddress !== undefined &&
      tokenInDecimals !== undefined &&
      tokenOutAddress !== undefined &&
      tokenOutDecimals !== undefined &&
      provider !== null &&
      signer !== null;

    if (areOptionsValid) {
      const tokenOutFeeAmount = new BigNumber(tokenOutValue).times(fee.value);
      const tokenOutValueMinusFee = new BigNumber(tokenOutValue)
        .minus(tokenOutFeeAmount)
        .toString();

      console.log(tokenOutValue.toString(), tokenOutValueMinusFee.toString());

      await dispatch(
        swapIn({
          tokenInAddress,
          tokenInValue: parseUnits(tokenInValue, tokenInDecimals),
          tokenOutAddress,
          tokenOutMin: parseUnits(tokenOutValueMinusFee, tokenOutDecimals),
          provider,
          signer,
        })
      );
    }
  };

  const commissionHint =
    fee.value === ''
      ? `комиссия: ${new BigNumber(fee.value).toFixed(fee.decimals)}%`
      : '';
  let proportionHint = '';

  switch (proportion.value) {
    case 'any': {
      proportionHint = 'В системе недостаточно ликвидности';

      break;
    }
    case '': {
      proportionHint = '';

      break;
    }
    default: {
      proportionHint = `пропорция: ${new BigNumber(proportion.value).toFixed(
        proportion.decimals
      )}`;

      break;
    }
  }

  return (
    <PairForm
      title={'Обменять'}
      hint={
        <Box css={styles.hint()}>
          {proportionHint && (
            <Typography css={styles.proportion()}>{proportionHint}</Typography>
          )}
          <Typography css={styles.commission()}>{commissionHint}</Typography>
        </Box>
      }
      actionIcon={<ArrowDownward />}
      items={tokens}
      itemText={'токен'}
      values={tokenValues}
      onValueChange={onValueChange}
      max={tokensMax}
      isMaxSync
      submitValue={submitValue}
      isSubmitDisabled={isSubmitDisabled}
      onPairSet={handlePairFormPairSet}
      onSubmit={onSubmit}
    />
  );
};

export type { Props };

export { Swap };
