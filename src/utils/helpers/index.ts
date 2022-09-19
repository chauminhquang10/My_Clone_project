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
  formatOptions: Intl.DateTimeFormatOptions,
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

export const objectKeys = <T extends {}>(obj: T): (keyof T)[] => Object.keys(obj) as (keyof T)[];
