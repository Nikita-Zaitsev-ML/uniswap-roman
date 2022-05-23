import { DefaultLayout } from 'src/modules/shared/pageTemplates';
import { Head, Header } from 'src/modules/shared/components';
import { Pools as PoolsFeature } from 'src/features/Pools';
import type { NextPageWithLayout } from 'src/shared/types';
import { Box, Container } from 'src/shared/components';

import { useAuth } from '../shared/hooks';
import { createStyles } from './Pools.style';

const Pools: NextPageWithLayout = () => {
  const styles = createStyles();

  const { connection, user, error, handleHeaderOnAuth } = useAuth();

  return (
    <>
      <Head title="Пулы" keywords="" description="" />
      <DefaultLayout
        header={<Header user={user} onAuth={handleHeaderOnAuth} />}
      >
        <Container>
          <Box css={styles.root()} component="main">
            <Box css={styles.grid()}>
              {error === '' ? (
                <PoolsFeature
                  userAddress={user?.address || ''}
                  provider={connection && connection.provider}
                  signer={connection && connection.signer}
                />
              ) : (
                error
              )}
            </Box>
          </Box>
        </Container>
      </DefaultLayout>
    </>
  );
};

Pools.getLayout = (page) => {
  return page;
};

export { Pools };
