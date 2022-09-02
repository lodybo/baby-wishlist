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

export function currentPasswordDiffersFromNew(
  currentPassword: unknown,
  newPassword: unknown,
) {
  if (currentPassword === newPassword) {
    return 'Het huidige en nieuwe wachtwoord mogen niet hetzelfde zijn';
  }
}

export function validateNewPassword(
  currentPassword: unknown,
  newPassword: unknown,
) {
  const passwordsAreNotDifferent = currentPasswordDiffersFromNew(
    currentPassword,
    newPassword,
  );
  if (passwordsAreNotDifferent) return passwordsAreNotDifferent;

  const newPasswordIsInvalid = validatePassword(newPassword);
  if (newPasswordIsInvalid) return newPasswordIsInvalid;
}

export function validateVerifiedNewPassword(
  newPassword: unknown,
  verifyNewPassword: unknown,
) {
  const verifiedPasswordIsInvalid = validatePassword(verifyNewPassword);
  if (verifiedPasswordIsInvalid) return verifiedPasswordIsInvalid;

  if (newPassword !== verifyNewPassword) {
    return 'De nieuwe wachtwoorden zijn niet gelijk aan elkaar';
  }
}
