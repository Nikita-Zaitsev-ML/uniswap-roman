import { FC, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useTheme } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { ArrowDownward, Box, Typography } from 'src/shared/components';
import { REQUEST_STATUS } from 'src/shared/helpers/redux';
import { createFilledArray } from 'src/shared/helpers/scripts/arrays';
import { BigNumber, parseUnits } from 'src/shared/helpers/blockchain/numbers';

import {
  selectProvider,
  setFeeValue,
  calculateAmountIn,
  calculateAmountOut,
  swapIn,
} from '../../../redux/slice';
import { Token } from '../../../types';
import {
  calculateMinOut,
  calculateSwapIn,
  getExistedPair,
} from '../../../utils';
import { PairForm } from '../../components/PairForm/PairForm';
import { SubmitButtonValue } from './types';
import { initialState } from './constants';
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
    (Token & { value: string; pairBalance: string })[]
  >([{ ...initialState.tokenValues }, { ...initialState.tokenValues }]);
  const [proportion, setProportion] = useState<{
    pairAddress: string;
    value: string | 'any' | '';
    decimals: number;
  }>(initialState.proportion);
  const [tokensMax, setTokensMax] = useState<string[]>(initialState.tokensMax);
  const [slippage, setSlippage] = useState(initialState.slippage);
  const [submitValue, setSubmitValue] =
    useState<SubmitButtonValue>('Подключите кошелек');

  const { data, calculation, calculationStatus } =
    useAppSelector(selectProvider);
  const { tokens, pairs, fee } = data;
  const dispatch = useAppDispatch();

  if (submitValue === 'Подключите кошелек' && isAuth) {
    setSubmitValue('Выберите токены');
  }

  const canSwap = !(
    new BigNumber(tokenValues['0'].value).eq(0) ||
    proportion.value === '' ||
    proportion.value === 'any'
  );
  const isSubmitDisabled =
    !canSwap ||
    submitValue === 'Подключите кошелек' ||
    submitValue === 'Выберите токены' ||
    calculationStatus === REQUEST_STATUS.pending;

  const handleSlippageChange: Required<
    Parameters<typeof PairForm>['0']
  >['slider']['onChangeCommitted'] = (event, value) => {
    if (typeof value === 'number') {
      setSlippage(value);
    }
  };

  const handlePairFormPairSet: Parameters<
    typeof PairForm
  >['0']['onPairSet'] = ({ pair, isSet }) => {
    if (isAuth) {
      setSubmitValue(isSet ? 'Обменять' : 'Выберите токены');
    } else {
      setSubmitValue(isSet ? 'Обменять' : 'Подключите кошелек');
    }

    const [tokenIn, tokenOut] = pair;
    const { existedPair, tokenInData, tokenOutData } = getExistedPair({
      tokenInName: tokenIn.name,
      tokenOutName: tokenOut.name,
      tokens,
      pairs,
    });

    const arePairTokensDefined =
      existedPair !== undefined &&
      tokenInData !== undefined &&
      tokenOutData !== undefined;

    if (arePairTokensDefined && provider !== null) {
      const {
        tokens: [token0, token1],
      } = existedPair;

      const shouldReverse =
        token0.address === tokenOutData?.address &&
        token1.address === tokenInData?.address;

      const [tokenInPairBalance, tokenOutPairBalance] = shouldReverse
        ? [token0.pairBalance, token1.pairBalance].reverse()
        : [token0.pairBalance, token1.pairBalance];

      const maxTokenIn = BigNumber.min(
        tokenInData.userBalance,
        tokenInPairBalance
      ).toString();

      const tokensMaxToSet = pair.map(({ name }, index) => {
        if (name === '' || existedPair.proportion === 'any') {
          return '0';
        }

        if (index === 1) {
          const tokenOutMaxToSet = calculateSwapIn({
            amountIn: parseUnits(maxTokenIn, tokenInData.decimals),
            balanceIn: parseUnits(tokenInPairBalance, tokenInData.decimals),
            balanceOut: parseUnits(tokenOutPairBalance, tokenOutData.decimals),
            fee: {
              amount: parseUnits(fee.value, fee.decimals),
              decimals: fee.decimals,
            },
            decimals: Math.max(tokenInData.decimals, tokenOutData.decimals),
          });

          return tokenOutMaxToSet;
        }

        const tokenInMaxToSet = maxTokenIn;

        return tokenInMaxToSet;
      });

      const tokenValuesToSet = tokenValues.map((token, index) => {
        if (index === 1) {
          return {
            ...tokenOutData,
            value: '',
            pairBalance: tokenOutPairBalance,
          };
        }

        return {
          ...tokenInData,
          value: '',
          pairBalance: tokenInPairBalance,
        };
      });

      setTokenValues(tokenValuesToSet);
      setTokensMax(tokensMaxToSet);

      if (shouldReverse) {
        setProportion({
          ...proportion,
          pairAddress: existedPair.address,
          decimals: existedPair.decimals,
          value: existedPair.proportion,
        });
      } else {
        setProportion({
          ...proportion,
          pairAddress: existedPair.address,
          decimals: existedPair.decimals,
          value: new BigNumber('1').div(existedPair.proportion).toString(),
        });
      }
    } else {
      setProportion(initialState.proportion);
      setTokenValues(
        tokenValues.map((token) => {
          return {
            ...initialState.tokenValues,
            value: token.value,
          };
        })
      );
      setTokensMax(initialState.tokensMax);
      dispatch(setFeeValue('0'));
    }
  };

  const onValueBlur: Parameters<typeof PairForm>['0']['onValueBlur'] = (
    event
  ) => {
    const isPairSet = event !== undefined && proportion.value !== '';

    if (isPairSet && provider !== null) {
      const { field, value } = event;

      if (value === undefined || value === '') {
        setTokenValues(
          tokenValues.map((token) => {
            return { ...token, value: '' };
          })
        );

        return;
      }

      const [tokenIn, tokenOut] = tokenValues;

      switch (field) {
        case 'theFirst': {
          dispatch(
            calculateAmountOut({
              pairAddress: proportion.pairAddress,
              tokenIn: tokenIn.address,
              tokenOut: tokenOut.address,
              amountIn: parseUnits(value, tokenIn.decimals),
              provider,
            })
          );

          setTokenValues([{ ...tokenIn, value }, tokenOut]);

          break;
        }
        case 'theSecond': {
          dispatch(
            calculateAmountIn({
              pairAddress: proportion.pairAddress,
              tokenIn: tokenIn.address,
              tokenOut: tokenOut.address,
              amountOut: parseUnits(value, tokenOut.decimals),
              provider,
            })
          );

          setTokenValues([tokenIn, { ...tokenOut, value }]);

          break;
        }
        // no default
      }

      const calculateValueFeeAmount = new BigNumber(calculation.value)
        .times(fee.value)
        .toString();

      dispatch(setFeeValue(calculateValueFeeAmount));
    }
  };

  const onSubmit: Parameters<typeof PairForm>['0']['onSubmit'] = (
    submission
  ) => {
    const areOptionsValid = provider !== null && signer !== null;

    if (areOptionsValid) {
      const [tokenIn, tokenOut] = tokenValues;
      const tokenInValue = submission.theFirstItemValue;
      const tokenOutValue = submission.theSecondItemValue;

      dispatch(
        swapIn({
          tokenInAddress: tokenIn.address,
          tokenInValue: parseUnits(tokenInValue, tokenIn.decimals),
          tokenOutAddress: tokenOut.address,
          tokenOutMin: parseUnits(
            calculateMinOut({
              amountOut: tokenOutValue,
              slippage,
              decimals: tokenOut.decimals,
            }),
            tokenOut.decimals
          ),
          provider,
          signer,
        })
      );
    }
  };

  useEffect(() => {
    if (calculationStatus !== REQUEST_STATUS.fulfilled) {
      return;
    }

    const [tokenIn, tokenOut] = tokenValues;

    switch (calculation.action) {
      case 'in': {
        setTokenValues([{ ...tokenIn, value: calculation.value }, tokenOut]);

        break;
      }
      case 'out': {
        setTokenValues([tokenIn, { ...tokenOut, value: calculation.value }]);

        break;
      }
      // no default
    }
  }, [calculationStatus]);

  const [tokenIn, tokenOut] = tokenValues;
  let proportionHint;
  let commissionHint;
  let slippageHint;

  const hasTokens = tokenIn.name !== '' && tokenOut.name !== '';
  const hasValues = tokenIn.value !== '' && tokenOut.value !== '';

  if (hasTokens && hasValues) {
    const swapOutValue = new BigNumber('1')
      .times(proportion.value)
      .toFixed(tokenIn.decimals);

    proportionHint = `1 ${tokenIn.name} = ${swapOutValue} ${tokenOut.name}`;
    commissionHint = `комиссия: ${calculation.fee} ${tokenOut.name}`;
    slippageHint = `минимально получите: ${calculateMinOut({
      amountOut: tokenOut.value,
      slippage,
      decimals: tokenOut.decimals,
    })} ${tokenOut.name}`;
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
          {commissionHint && (
            <Typography css={styles.commission()} variant="caption">
              {commissionHint}
            </Typography>
          )}
          {slippageHint && (
            <Typography css={styles.slippage()} variant="caption">
              {slippageHint}
            </Typography>
          )}
        </Box>
      }
      actionIcon={<ArrowDownward />}
      slider={{
        defaultValue: initialState.slippage,
        min: 5,
        max: 50,
        marks: createFilledArray(50 / 5, (undefinedValue, index) => {
          const minMark = 5;
          const step = 50 / 10;
          const value = minMark + index * step;

          const mark = { value, label: `${value}` };

          return mark;
        }),
        valueLabelDisplay: 'auto',
        onChangeCommitted: handleSlippageChange,
      }}
      items={tokens}
      itemText={'токен'}
      values={tokenValues.map(({ value }) => value)}
      onValueBlur={onValueBlur}
      max={tokensMax}
      isMaxSync
      submitValue={submitValue}
      disabled={disabled || calculationStatus === REQUEST_STATUS.pending}
      isSubmitDisabled={isSubmitDisabled || disabled}
      onPairSet={handlePairFormPairSet}
      onSubmit={onSubmit}
    />
  );
};

export type { Props };

export { Swap };
