const isNotError = <T>(val: T): val is Exclude<T, globalThis.Error> => {
  return !(val instanceof globalThis.Error);
};

export { isNotError };
