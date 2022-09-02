import { validateEmail } from './Email';

test('Validate email', () => {
  expect(validateEmail({})).toBe('Er is iets fout gegaan met het e-mailadres');
  expect(validateEmail('')).toBe('E-mailadres is verplicht');
  expect(validateEmail('te')).toBe('E-mailadres is te kort');
  expect(validateEmail('test')).toBe('E-mailadres is ongeldig');
  expect(validateEmail('test@example')).toBe('E-mailadres is ongeldig');
  expect(validateEmail('test@example.com')).toBe(undefined);
});
