export function validateAccessCode(code: unknown) {
  if (typeof code !== 'string') {
    return 'Er is iets fout gegaan met de toegangscode';
  }

  if (!code || code.length === 0) {
    return 'De code is verplicht';
  }

  if (code !== process.env['ACCESS_CODE']) {
    return 'Deze code is niet correct';
  }
}
