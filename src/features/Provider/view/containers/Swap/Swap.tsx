import { FC, useState } from 'react';
import { ethers } from 'ethers';
import { useTheme } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { ArrowDownward, Box, Typography } from 'src/shared/components';
import { BigNumber, parseUnits } from 'src/shared/helpers/blockchain/numbers';

import { selectProvider, setFeeAmount, swapIn } from '../../../redux/slice';
import { PairForm } from '../../components/PairForm/PairForm';
import { calculateSwap } from '../../../utils';
import { SubmitButtonValue } from './types';
import { createStyles } from './Swap.style';

type Props = {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.providers.JsonRpcSigner | null;
  disabled?: boolean;
};

const Swap: FC<Props> = ({ provider, signer, disabled }) => {
  const isAuth = provider !== null && signer !== null;

  const theme = useTheme();
  const styles = createStyles(theme);

  const [tokenValues, setTokenValues] = useState<
    { amount: string; decimals: number }[]
  >([
    { amount: '', decimals: 0 },
    { amount: '', decimals: 0 },
  ]);
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

      const tokenValuesToSet = tokenValues.map((value, index) => {
        if (index === 1) {
          return { ...value, decimals: token1.decimals };
        }

        return { ...value, decimals: token0.decimals };
      });

      const shouldReverse =
        token0.address === tokenOutData?.address &&
        token1.address === tokenInData?.address;

      if (shouldReverse) {
        setTokenValues(tokenValues.reverse());
        setProportion({
          value: new BigNumber('1').div(existedPair.proportion).toString(),
          decimals: existedPair.decimals,
        });
        setTokensMax(tokensMaxToSet.reverse());
      } else {
        setTokenValues(tokenValuesToSet);
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
      setTokenValues([
        { amount: '', decimals: 0 },
        { amount: '', decimals: 0 },
      ]);
      setTokensMax(['0', '0']);
      dispatch(setFeeAmount('0'));
    }
  };

  const onValueChange: Parameters<typeof PairForm>['0']['onValueChange'] = (
    event
  ) => {
    if (event !== undefined && proportion.value !== '') {
      const { field, value } = event;

      if (value === undefined || value === '') {
        setTokenValues([
          { amount: '', decimals: 0 },
          { amount: '', decimals: 0 },
        ]);

        return;
      }

      const [tokenIn, tokenOut] = tokenValues;
      let computedValue;

      switch (field) {
        case 'theFirst': {
          computedValue =
            proportion.value === 'any'
              ? tokenValues[1].amount
              : new BigNumber(value).div(proportion.value).toString();

          setTokenValues([
            { ...tokenIn, amount: value },
            { ...tokenOut, amount: computedValue },
          ]);

          break;
        }
        case 'theSecond': {
          computedValue =
            proportion.value === 'any'
              ? tokenValues[0].amount
              : new BigNumber(value).times(proportion.value).toString();

          setTokenValues([
            { ...tokenIn, amount: computedValue },
            { ...tokenOut, amount: value },
          ]);

          break;
        }
        // no default
      }

      const computedValueFeeAmount = new BigNumber(computedValue)
        .times(fee.value)
        .toString();

      dispatch(setFeeAmount(computedValueFeeAmount));
    }
  };

  const onSubmit: Parameters<typeof PairForm>['0']['onSubmit'] = async (
    submission
  ) => {
    const { theFirstItem, theSecondItem } = submission;
    const tokenIn = tokens.find((token) => token.name === theFirstItem);
    const tokenOut = tokens.find((token) => token.name === theSecondItem);
    const tokenInValue = submission.theFirstItemValue;

    const areOptionsValid =
      tokenIn?.address !== undefined &&
      tokenIn?.decimals !== undefined &&
      tokenIn.userBalance !== undefined &&
      tokenOut?.address !== undefined &&
      tokenOut?.decimals !== undefined &&
      tokenOut.userBalance !== undefined &&
      provider !== null &&
      signer !== null;

    if (areOptionsValid) {
      const tokenOutMin = calculateSwap({
        amountIn: parseUnits(tokenInValue, tokenIn.decimals),
        balanceIn: parseUnits(tokenIn.userBalance, tokenIn.decimals),
        balanceOut: parseUnits(tokenOut.userBalance, tokenOut.decimals),
        fee: {
          amount: parseUnits(fee.value, fee.decimals),
          decimals: fee.decimals,
        },
        decimals: Math.max(tokenIn.decimals, tokenOut.decimals),
      });

      await dispatch(
        swapIn({
          tokenInAddress: tokenIn.address,
          tokenInValue: parseUnits(tokenInValue, tokenIn.decimals),
          tokenOutAddress: tokenOut.address,
          tokenOutMin: parseUnits(tokenOutMin, tokenOut.decimals),
          provider,
          signer,
        })
      );
    }
  };

  const [, tokenOut] = tokenValues;
  const commissionPercentHint =
    fee.value === '0'
      ? ''
      : `комиссия платформы: ${new BigNumber(fee.value).toFixed(
          fee.decimals
        )}%`;
  let commissionAmountHint = '';
  let proportionHint = '';

  commissionAmountHint = `вы получите меньше на: ${new BigNumber(
    fee.value
  ).toFixed(tokenOut.decimals)}`;

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
            <Typography css={styles.proportion()} variant="caption">
              {proportionHint}
            </Typography>
          )}
          <Typography css={styles.commission()} variant="caption">
            {commissionPercentHint}
          </Typography>
          <Typography css={styles.commission()} variant="caption">
            {commissionAmountHint}
          </Typography>
        </Box>
      }
      actionIcon={<ArrowDownward />}
      items={tokens}
      itemText={'токен'}
      values={tokenValues.map(({ amount }) => amount)}
      onValueChange={onValueChange}
      max={tokensMax}
      isMaxSync
      submitValue={submitValue}
      disabled={disabled}
      isSubmitDisabled={isSubmitDisabled || disabled}
      onPairSet={handlePairFormPairSet}
      onSubmit={onSubmit}
    />
  );
};

export type { Props };

export { Swap };
