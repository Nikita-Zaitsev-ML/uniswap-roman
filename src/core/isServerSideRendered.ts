const isServerSideRendered = () => {
  return typeof window === 'undefined';
};

export { isServerSideRendered };
