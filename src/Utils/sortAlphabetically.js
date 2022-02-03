export function sortAlphabetically(users, filter) {
  const arrayCopy = [...users];
  if (filter === "a-z") {
    return arrayCopy.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
  }
  if (filter === "z-a") {
    return arrayCopy.sort((a, b) =>
      a.name > b.name ? -1 : b.name > a.name ? 1 : 0
    );
  }
  return users;
}
