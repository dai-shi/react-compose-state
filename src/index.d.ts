type Mapper<I, O> = (input: I) => O;
type Updater<T> = (f: ((v: T) => T) | T) => void;
type Options = { setters: any };
type GetterProps<S> =  {[K in keyof S]: S[K]};
type SetterProps = any;
export type ComposeWithState =
  <P extends {}, S extends {}>(initialState: S | Mapper<P, S>, options?: Options) =>
    (base: React.ComponentType<P>) =>
      React.ComponentType<P & GetterProps<S> & SetterProps>;
export const composeWithState: ComposeWithState;
