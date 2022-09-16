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

export function formatPhoneNumber(str: string) {
  const first = str.slice(0, 4);
  const second = str.slice(4, 7);
  const third = str.slice(7);

  return `${first} ${second} ${third}`;
}
