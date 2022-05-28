const isNotNull = <T>(val: T): val is Exclude<T, null> => {
  return val !== null;
};

export { isNotNull };
