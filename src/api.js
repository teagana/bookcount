// responsible for fetching api data from db.json

export function getAllBooks() {
  return fetch("/api/books").then((response) => {
    return response.json();
  });
}
