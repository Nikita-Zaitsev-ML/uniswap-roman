import { FC } from 'react';
import { useTheme } from '@mui/material';

import { Card, Box, Typography, Button } from 'src/shared/components';

import { Pair } from '../../types';
import { createStyles } from './ViewPairs.style';

type Props = { switchBtn: { value: string; onClick: () => void } };

const ViewPairs: FC<Props> = ({ switchBtn }) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const pairs: Pair[] = [
    { tokens: ['token A', 'token B'], balance: 10 },
    { tokens: ['token C', 'token A'], balance: 20 },
    { tokens: ['token C', 'token B'], balance: 20 },
  ];

  const makeHandleDeleteBtnClick = (pair: Pair['tokens']) => () => {
    console.log(pair);
  };

  return (
    <Card
      css={styles.root()}
      content={{
        children: (
          <>
            <Box css={styles.header()}>
              <Typography css={styles.title()} component="h3" variant="body1">
                Мои пары
              </Typography>
              {switchBtn !== undefined && (
                <Button size="small" onClick={switchBtn.onClick}>
                  {switchBtn.value}
                </Button>
              )}
            </Box>
            <Box css={styles.panel()}>
              {pairs.map(({ tokens, balance }) => (
                <Box css={styles.pair()} key={tokens.toString()}>
                  <Typography
                    css={styles.pairTitle()}
                    component="h4"
                    variant="body1"
                  >
                    {`${tokens.join(' + ')}:`}
                  </Typography>
                  <Typography css={styles.pairBalance()} variant="body2">
                    {balance}
                  </Typography>
                  <Button
                    css={styles.pairDeleteBtn()}
                    size="small"
                    color="error"
                    onClick={makeHandleDeleteBtnClick(tokens)}
                  >
                    Удалить пару
                  </Button>
                </Box>
              ))}
            </Box>
          </>
        ),
      }}
    />
  );
};

export type { Props };

export { ViewPairs };
