export function validateName(name: unknown) {
  if (typeof name !== 'string') {
    return 'Er is iets fout gegaan met de naam';
  }

  if (name.length === 0) {
    return 'Naam is verplicht';
  }
}
