import { validateAccessCode } from './AccessCode';

beforeEach(() => {
  process.env.ACCESS_CODE = 's3cret';
});

afterEach(() => {
  process.env.ACCESS_CODE = undefined;
});

test('Validate the access code', () => {
  expect(validateAccessCode({})).toBe(
    'Er is iets fout gegaan met de toegangscode',
  );
  expect(validateAccessCode('')).toBe('De code is verplicht');
  expect(validateAccessCode('s3cret')).toBe(undefined);
});
