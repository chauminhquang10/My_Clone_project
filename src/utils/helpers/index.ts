import { v4 as uuid } from 'uuid';

export function isMinimumCharacter(str: string, num: number): boolean {
  return str.length >= num;
}

export function isContainLowerCase(str: string): boolean {
  const len = str.length;
  for (let i = 0; i < len; i++) {
    const c = str.charAt(i);
    if (!isNaN(+c)) continue;
    if (c.toLowerCase() === c) return true;
  }

  return false;
}

export function isContainUpperCase(str: string): boolean {
  const len = str.length;
  for (let i = 0; i < len; i++) {
    const c = str.charAt(i);
    if (!isNaN(+c)) continue;
    if (c.toUpperCase() === c) return true;
  }

  return false;
}

export function isContainNumber(str: string) {
  return /\d/.test(str);
}

export function isContainSpecialLetter(str: string) {
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
}

export const formatDate: (
  date: string | number | undefined,
  formatOptions?: Intl.DateTimeFormatOptions,
) => Error | string = (
  date: string | number | undefined,
  formatOptions = { day: 'numeric', month: 'numeric', year: 'numeric' },
) => {
  if (typeof date === 'string' || typeof date === 'number') {
    return new Date(date).toLocaleDateString('en-GB', formatOptions);
  }

  return new Error('date should be string or number');
};

export const genKey = () => uuid();
export function formatPhoneNumber(str: string) {
  const first = str.slice(0, 4);
  const second = str.slice(4, 7);
  const third = str.slice(7);

  return `${first} ${second} ${third}`;
}

export const objectKeys = <T extends Object>(obj: T): (keyof T)[] =>
  Object.keys(obj) as (keyof T)[];

export function validateEmail(mail: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return true;
  return false;
}
const R = 6371e3;

export const distanceBetweenLocations = (
  [lat1, lon1]: [number, number],
  [lat2, lon2]: [number, number],
) => {
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const checkFormFieldsEmpty = (fields: Record<string, string | undefined>) =>
  objectKeys(fields).some((key) => !fields[key]);
