export interface EnumKV<K = string, T = string> {
  key: K | string;
  value: T;
}

export const stringEnumToArray: <T extends object>(e: T) => Array<EnumKV<keyof T, T[keyof T]>> = (
  e
) => {
  return Object.entries(e).map(([k, v]) => ({ key: k, value: v }));
};
