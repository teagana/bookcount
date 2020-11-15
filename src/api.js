// responsible for fetching api data from db.json

export function getAllBooks() {
  return fetch("/api/books").then((response) => {
    return response.json();
  });
}

// delete a book
export function destroyBook(id) {
  return fetch(`/api/books/${id}`, {
    method: "DELETE",
  });
}

export function getAllGoals() {
  return fetch("/api/goals").then((response) => {
    return response.json();
  });
}

// pass in goals in correct format and save
export function saveGoals(goals) {
  return fetch("/api/goals", {
    method: "PATCH",
    body: JSON.stringify(goals),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

// does the id autoincrement
export function createBook(book) {
  return fetch("/api/books", {
    method: "POST",
    body: JSON.stringify(book),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}
