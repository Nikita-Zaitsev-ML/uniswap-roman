import { DefaultLayout } from 'src/modules/shared/pageTemplates';
import { Head } from 'src/modules/shared/components';
import type { NextPageWithLayout } from 'src/shared/types';
import { Box, Container } from 'src/shared/components';

import { createStyles } from './Pools.style';

const Pools: NextPageWithLayout = () => {
  const styles = createStyles();

  return (
    <>
      <Head title="Пулы" keywords="" description="" />
      <Container>
        <Box css={styles.root()} component="main">
          <Box css={styles.grid()}></Box>
        </Box>
      </Container>
    </>
  );
};

Pools.getLayout = (page) => {
  return <DefaultLayout withHeader>{page}</DefaultLayout>;
};

export { Pools };
