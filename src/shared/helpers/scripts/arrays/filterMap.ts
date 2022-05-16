const filterMap = <TSource, TTarget>(
  items: TSource[],
  filterFn: (item: TSource) => boolean,
  mapFn: (item: TSource) => TTarget
) =>
  items.reduce((acc, cur): TTarget[] => {
    if (filterFn(cur)) return [...acc, mapFn(cur)];

    return acc;
  }, [] as TTarget[]);

export { filterMap };
