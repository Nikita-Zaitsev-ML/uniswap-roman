import { FC, useState } from 'react';
import { ethers } from 'ethers';
import { useTheme } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  ArrowDownward,
  PairForm,
  Box,
  Typography,
} from 'src/shared/components';
import {
  divDecimals,
  mulDecimals,
} from 'src/shared/helpers/blockchain/numbers';

import { selectContainer, swapIn } from '../../../redux/slice';
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

  const { data } = useAppSelector(selectContainer);
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
          const maxToken1 = divDecimals(
            token0.userBalance,
            existedPair.proportion,
            existedPair.decimals,
            existedPair.decimals
          );

          const token1MaxToSet = ethers.BigNumber.from(maxToken1).gt(
            ethers.BigNumber.from(token1.userBalance)
          )
            ? token1.userBalance
            : maxToken1;

          return token1MaxToSet;
        }

        const maxToken0 = mulDecimals(
          token1.userBalance,
          existedPair.proportion,
          existedPair.decimals,
          existedPair.decimals
        );
        const token0MaxToSet = ethers.BigNumber.from(maxToken0).gt(
          ethers.BigNumber.from(token0.userBalance)
        )
          ? token0.userBalance
          : maxToken0;

        return token0MaxToSet;
      });

      const shouldReverse =
        token0.address === tokenOutData?.address &&
        token1.address === tokenInData?.address;

      if (shouldReverse) {
        setProportion({
          value: divDecimals(
            `1${'0'.repeat(existedPair.decimals)}`,
            existedPair.proportion,
            existedPair.decimals,
            existedPair.decimals
          ),
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
              : divDecimals(
                  ethers.BigNumber.from(
                    ethers.utils.parseUnits(value, proportion.decimals)
                  ).toString(),
                  proportion.value,
                  proportion.decimals,
                  proportion.decimals
                );

          setTokenValues([
            ethers.utils.parseUnits(value, proportion.decimals).toString(),
            computedValue,
          ]);

          break;
        }
        case 'theSecond': {
          const computedValue =
            proportion.value === 'any'
              ? tokenValues[0]
              : mulDecimals(
                  ethers.BigNumber.from(
                    ethers.utils.parseUnits(value, proportion.decimals)
                  ).toString(),
                  proportion.value,
                  proportion.decimals,
                  proportion.decimals
                );

          setTokenValues([
            computedValue,
            ethers.utils.parseUnits(value, proportion.decimals).toString(),
          ]);

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
      const percentZeros = '00';

      const bTokenOutValue = ethers.utils.parseUnits(
        tokenOutValue,
        tokenOutDecimals
      );
      const bFee = bTokenOutValue
        .mul(ethers.BigNumber.from(fee.value))
        .div(
          ethers.BigNumber.from(`1${'0'.repeat(fee.decimals)}${percentZeros}`)
        );
      const bTokenOutWithFee = bTokenOutValue.sub(bFee);

      const slippage = '5';
      const slippageDecimals = 2;
      const bSlippage = bTokenOutWithFee
        .mul(ethers.BigNumber.from(slippage))
        .div(
          ethers.BigNumber.from(
            `1${'0'.repeat(slippageDecimals)}${percentZeros}`
          )
        );
      const bTokenOutMin = bTokenOutWithFee.sub(bSlippage);

      console.log(
        bTokenOutValue.toString(),
        bTokenOutWithFee.toString(),
        bTokenOutMin.toString()
      );

      await dispatch(
        swapIn({
          tokenInAddress,
          tokenInValue: ethers.utils
            .parseUnits(tokenInValue, tokenInDecimals)
            .toString(),
          tokenOutAddress,
          tokenOutMin: bTokenOutMin.toString(),
          provider,
          signer,
        })
      );

      // window.location.reload();
    }
  };

  const commissionHint =
    fee.value === ''
      ? `комиссия: ${ethers.utils.formatUnits(fee.value, fee.decimals)}%`
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
      proportionHint = `пропорция: ${ethers.utils.formatUnits(
        proportion.value,
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
      values={tokenValues.map((val) =>
        val === '' ? val : ethers.utils.formatUnits(ethers.BigNumber.from(val))
      )}
      onValueChange={onValueChange}
      max={tokensMax.map((max) =>
        ethers.utils.formatUnits(ethers.BigNumber.from(max))
      )}
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
