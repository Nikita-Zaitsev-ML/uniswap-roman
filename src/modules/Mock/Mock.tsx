import { Head } from 'src/modules/shared/components';
import type { NextPageWithLayout } from 'src/shared/types';
import { Typography } from 'src/shared/components';

const Mock: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Заглушка" keywords="" description="" />
      <Typography variant="body1" color="initial">
        Этой страницы не должно быть в работающем приложении, обратитесь в
        техническую поддержку.
      </Typography>
    </>
  );
};

export { Mock };
