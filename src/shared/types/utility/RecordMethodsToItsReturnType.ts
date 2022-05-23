type RecordMethodsToItsReturnType<Type> = {
  [key in keyof Type]: Type[key] extends (...args: any[]) => any
    ? ReturnType<Type[key]>
    : never;
};

export type { RecordMethodsToItsReturnType };
