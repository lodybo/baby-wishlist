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
  expect(validatePassword('Cody')).toBe('Het wachtwoord is te kort');
  expect(validatePassword('CodyIsAwesome')).toBe(undefined);
});

test('Current and new passwords differ', () => {
  expect(currentPasswordDiffersFromNew('CodyIsCool', 'CodyIsCool')).toBe(
    'Het huidige en nieuwe wachtwoord mogen niet hetzelfde zijn',
  );
  expect(currentPasswordDiffersFromNew('CodyIsCool', 'CodyIsAwesome')).toBe(
    undefined,
  );
});

test('Validate new password', () => {
  const currentPassword = 'CodyIsCool';

  expect(validateNewPassword(currentPassword, currentPassword)).toBe(
    'Het huidige en nieuwe wachtwoord mogen niet hetzelfde zijn',
  );
  expect(validateNewPassword(currentPassword, {})).toBe(
    'Er is iets fout gegaan met het wachtwoord',
  );
  expect(validateNewPassword(currentPassword, '')).toBe(
    'Wachtwoord is verplicht',
  );
  expect(validateNewPassword(currentPassword, 'Cody')).toBe(
    'Het wachtwoord is te kort',
  );
  expect(validateNewPassword(currentPassword, 'CodyIsAwesome')).toBe(undefined);
});

test('Validate verified password', () => {
  const newPassword = 'CodyIsCool';

  expect(validateVerifiedNewPassword(newPassword, {})).toBe(
    'Er is iets fout gegaan met het wachtwoord',
  );
  expect(validateVerifiedNewPassword(newPassword, '')).toBe(
    'Wachtwoord is verplicht',
  );
  expect(validateVerifiedNewPassword(newPassword, 'Cody')).toBe(
    'Het wachtwoord is te kort',
  );
  expect(validateVerifiedNewPassword(newPassword, 'CodyIsAwesome')).toBe(
    'De nieuwe wachtwoorden zijn niet gelijk aan elkaar',
  );
  expect(validateVerifiedNewPassword(newPassword, 'CodyIsCool')).toBe(
    undefined,
  );
});
