export function validatePassword(password: unknown) {
  if (typeof password !== 'string') {
    return 'Er is iets fout gegaan met het wachtwoord';
  }

  if (password.length === 0) {
    return 'Wachtwoord is verplicht';
  }

  if (password.length < 8) {
    return 'Het wachtwoord is te kort';
  }
}
