import React from 'react';

import { isServerSideRendered } from './isServerSideRendered';

const initAxe = () => {
  const isClient = !isServerSideRendered();
  const shouldLoad = process.env.NODE_ENV !== 'production' && isClient;

  if (shouldLoad) {
    import('react-dom').then((ReactDOM) => {
      import('@axe-core/react').then((axe) => {
        axe.default(React, ReactDOM, 1000);
      });
    });
  }
};

export { initAxe };
