import { safeRedirect, formatAmount } from './utils';

test('Safe redirect should return a safe redirection URL at all times', () => {
  const fd = new FormData();
  fd.set('redirectURL', '/admin');

  expect(safeRedirect('/profiel')).toBe('/profiel');
  expect(safeRedirect(undefined)).toBe('/');
  expect(safeRedirect(null, '/profiel')).toBe('/profiel');
  expect(safeRedirect(undefined, '/profiel')).toBe('/profiel');
  expect(safeRedirect(fd.get('redirectUrl'), '/profiel')).toBe('/profiel');
  expect(safeRedirect(fd.get('adminURL'))).toBe('/');
  expect(safeRedirect('//')).toBe('/');
});

test('Amounts should be formatted in Dutch locale', () => {
  expect(formatAmount('25')).toBe('€\xa025,00'); // Including non-breaking space
  expect(formatAmount('25.59')).toBe('€\xa025,59'); // Including non-breaking space
});
