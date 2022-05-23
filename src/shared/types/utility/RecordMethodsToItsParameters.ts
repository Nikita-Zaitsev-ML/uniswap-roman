type RecordMethodsToItsParameters<Type> = {
  [key in keyof Type]: Type[key] extends (...args: any[]) => any
    ? Parameters<Type[key]>
    : never;
};

export type { RecordMethodsToItsParameters };
