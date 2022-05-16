import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { MS_IN_A_SECOND } from 'src/shared/helpers/scripts/datetime';

const useTimeoutRedirect = ({ path = '/' } = {}) => {
  const router = useRouter();
  const [counter, setCounter] = useState(3000);
  const counterStep = MS_IN_A_SECOND;

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCount) => prevCount - counterStep);

      if (counter <= 0) {
        clearInterval(interval);
      }
    }, counterStep);

    const timeout = setTimeout(() => {
      router.push(path);
    }, counter);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [path, counter, counterStep, router]);

  const secToRedirect = counter / MS_IN_A_SECOND;

  return secToRedirect;
};

export { useTimeoutRedirect };
