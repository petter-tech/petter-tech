export type ResultState<T> =
  | { type: "success"; data: T }
  | { type: "error"; message: string };
