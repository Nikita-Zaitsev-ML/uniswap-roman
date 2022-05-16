import { Head } from 'src/modules/shared/components';
import type { NextPageWithLayout } from 'src/shared/types';
import { useTimeoutRedirect } from 'src/shared/helpers/react';
import { Typography } from 'src/shared/components';

const NotFound: NextPageWithLayout = () => {
  const redirectTimeout = useTimeoutRedirect();

  return (
    <>
      <Head
        title="Интегратор - страница не найдена"
        keywords=""
        description=""
      />
      <Typography variant="body1" color="initial">
        Страница не найдена, перенаправление на главную страницу через{' '}
        {redirectTimeout} секунд...
      </Typography>
    </>
  );
};

export { NotFound };
