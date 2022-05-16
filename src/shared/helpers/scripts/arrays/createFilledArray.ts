const createFilledArray = <TItem>(
  arrayLength: number,
  callbackFn: (value: TItem, index: number) => TItem
) => Array.from(Array(arrayLength), callbackFn);

export { createFilledArray };
