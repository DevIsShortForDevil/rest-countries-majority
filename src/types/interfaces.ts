export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export interface IconProps {
  color?: string;
  bgColor?: string;
  width?: number;
  height?: number;
  fill?: string;
  strokeWidth?: number;
}

export interface CountryName {
  common: string;
  official: string;
  nativeName?: {
    [key: string]: Omit<CountryName, 'nameName'>;
  };
}

export interface Currency {
  name: string;
  symbol: string;
}
export interface Country {
  name: CountryName;
  cca2: string;
  independant: boolean;
  unmember: boolean;
  currencies: { [key: string]: Currency };
  capital: string[];
  region: string;
  languages: { [key: string]: string };
  flag: string;
  population: number;
  timezones: string[];
  flags: { [key: string]: string };
  translations: { [key: string]: CountryName };
  area: number;
  maps: { [key: string]: string };
  idd: { root: string; suffixes: string[] };
}
