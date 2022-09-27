import { validateName } from '~/validations/Name';
import {
  validatePassword,
  currentPasswordDiffersFromNew,
  validateNewPassword,
  validateVerifiedNewPassword,
} from './Password';

test('Validate password', () => {
  expect(validatePassword({})).toBe(
    'Er is iets fout gegaan met het wachtwoord',
  );
  expect(validatePassword('')).toBe('Wachtwoord is verplicht');
  expect(validatePassword('Aké')).toBe('Het wachtwoord is te kort');
  expect(validatePassword('AkéIsAwesome')).toBe(undefined);
});

test('Current and new passwords differ', () => {
  expect(currentPasswordDiffersFromNew('AkéIsCool', 'AkéIsCool')).toBe(
    'Het huidige en nieuwe wachtwoord mogen niet hetzelfde zijn',
  );
  expect(currentPasswordDiffersFromNew('AkéIsCool', 'AkéIsAwesome')).toBe(
    undefined,
  );
});

test('Validate new password', () => {
  const currentPassword = 'AkéIsCool';

  expect(validateNewPassword(currentPassword, currentPassword)).toBe(
    'Het huidige en nieuwe wachtwoord mogen niet hetzelfde zijn',
  );
  expect(validateNewPassword(currentPassword, {})).toBe(
    'Er is iets fout gegaan met het wachtwoord',
  );
  expect(validateNewPassword(currentPassword, '')).toBe(
    'Wachtwoord is verplicht',
  );
  expect(validateNewPassword(currentPassword, 'Aké')).toBe(
    'Het wachtwoord is te kort',
  );
  expect(validateNewPassword(currentPassword, 'AkéIsAwesome')).toBe(undefined);
});

test('Validate verified password', () => {
  const newPassword = 'AkéIsCool';

  expect(validateVerifiedNewPassword(newPassword, {})).toBe(
    'Er is iets fout gegaan met het wachtwoord',
  );
  expect(validateVerifiedNewPassword(newPassword, '')).toBe(
    'Wachtwoord is verplicht',
  );
  expect(validateVerifiedNewPassword(newPassword, 'Aké')).toBe(
    'Het wachtwoord is te kort',
  );
  expect(validateVerifiedNewPassword(newPassword, 'AkéIsAwesome')).toBe(
    'De nieuwe wachtwoorden zijn niet gelijk aan elkaar',
  );
  expect(validateVerifiedNewPassword(newPassword, 'AkéIsCool')).toBe(undefined);
});
