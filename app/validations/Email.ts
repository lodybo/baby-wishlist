const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validateEmail(email: unknown) {
  if (typeof email !== 'string') {
    return 'Er is iets fout gegaan met het e-mailadres';
  }

  if (email.length === 0) {
    return 'E-mailadres is verplicht';
  }

  if (email.length < 3) {
    return 'E-mailadres is te kort';
  }

  if (!emailRegex.test(email)) {
    return 'E-mailadres is ongeldig';
  }
}
