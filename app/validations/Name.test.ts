import { validateName } from './Name';

test('Validate name', () => {
  expect(validateName({})).toBe('Er is iets fout gegaan met de naam');
  expect(validateName('')).toBe('Naam is verplicht');
  expect(validateName('Cody')).toBe(undefined);
});
