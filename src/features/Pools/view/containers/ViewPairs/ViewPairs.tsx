import { FC } from 'react';
import { useTheme } from '@mui/material';
import { ethers } from 'ethers';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { Address } from 'src/shared/api/blockchain/types';
import { Card, Box, Typography, Button } from 'src/shared/components';
import { REQUEST_STATUS } from 'src/shared/helpers/redux';

import { Pair } from '../../../types';
import { selectPools, removeLiquidity } from '../../../redux/slice';
import { createStyles } from './ViewPairs.style';

type Props = {
  userAddress: Address;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.providers.JsonRpcSigner | null;
  switchBtn?: { onClick: () => void };
};

const ViewPairs: FC<Props> = ({ signer, switchBtn }) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const {
    status,
    data: { pairs },
    error,
  } = useAppSelector(selectPools);
  const pairsOfUser = pairs.filter((pair) => pair.userBalance > 0);
  const dispatch = useAppDispatch();

  const makeHandleDeleteBtnClick = (pair: Pair) => () => {
    if (signer !== null) {
      dispatch(removeLiquidity({ pair, signer }));
    }
  };

  switch (status) {
    case REQUEST_STATUS.idle:
    case REQUEST_STATUS.pending:
    case REQUEST_STATUS.fulfilled: {
      return (
        <Card
          css={styles.root()}
          content={{
            children: (
              <>
                <Box css={styles.header()}>
                  <Typography
                    css={styles.title()}
                    component="h3"
                    variant="body1"
                  >
                    Мои пары
                  </Typography>
                  {switchBtn !== undefined && (
                    <Button size="small" onClick={switchBtn.onClick}>
                      Добавить пару
                    </Button>
                  )}
                </Box>
                <Box css={styles.panel()}>
                  {pairsOfUser.length === 0 ? (
                    <Typography variant="body2" align="center">
                      У вас пока нет пар
                    </Typography>
                  ) : (
                    pairsOfUser.map((pair) => (
                      <Box
                        css={styles.pair()}
                        key={pair.tokens.map(({ name }) => name).toString()}
                      >
                        <Typography
                          css={styles.pairTitle()}
                          component="h4"
                          variant="body1"
                        >
                          {`${pair.tokens
                            .map(({ name }) => name)
                            .join(' + ')}:`}
                        </Typography>
                        <Typography css={styles.pairBalance()} variant="body2">
                          {pair.userBalance}
                        </Typography>
                        <Button
                          css={styles.pairDeleteBtn()}
                          size="small"
                          color="error"
                          onClick={makeHandleDeleteBtnClick(pair)}
                        >
                          Удалить пару
                        </Button>
                      </Box>
                    ))
                  )}
                </Box>
              </>
            ),
          }}
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

export { ViewPairs };
