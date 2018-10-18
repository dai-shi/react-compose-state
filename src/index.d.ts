type mapper<I, O> = (input: I) => O;
type updater<T> = (f: ((v: T) => T) | T) => void;
type getterProps<S> =  {[K in keyof S]: S[K]};
export type composeWithState =
  <P extends {}, S extends {}>(initialState: S | mapper<P, S>, options?: any) =>
    React.ComponentType<P> => React.ComponentType<P & getterProps<S> & any>;
