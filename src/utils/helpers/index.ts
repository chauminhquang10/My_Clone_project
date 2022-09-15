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
