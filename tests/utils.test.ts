import { formatDate } from '../src/utils/helpers/index';

describe('Test formatDate function helper', () => {
  it('should return dd/mm/yyyy', () => {
    const result = formatDate('2022-09-07T09:30:54.000+00:00');
    expect(result).toBe('07/09/2022');
  });

  it('should return error', () => {
    const result = formatDate(undefined);
    expect(result).toBeInstanceOf(Error);
  });

  it('should return proper value with custom options argument', () => {
    const customOptions: Intl.DateTimeFormatOptions = {
      year: '2-digit',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
    };
    const result = formatDate('2022-09-07T09:30:54.000+00:00', customOptions);
    expect(result).toBe('07 September 22, 16');
  });
});
