const isError = (val: unknown): val is globalThis.Error => {
  return val instanceof globalThis.Error;
};

export { isError };
