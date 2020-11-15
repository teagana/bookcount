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

// does the id autoincrement?
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

const proxy = "https://cors-anywhere.herokuapp.com/";

// bookmooch get book's info
export function getBookInfo(title) {
  return fetch(
    `${proxy}http://api.bookmooch.com/api/search?txt=${encodeURI(
      title
    )}&db=bm&o=json`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  ).then((response) => {
    let responseData = response
      .json()
      .then((books) => {
        let ISBN = books[0].ISBN;
        console.log("books", books, ISBN);

        return fetch(
          `${proxy}http://api.bookmooch.com/api/asin?asins=${ISBN}&o=json`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
      })
      .then((bookResponse) => {
        let bookData = bookResponse.json().then((bookData) => {
          console.log(bookData);
          return bookData;
        });
        return bookData;
      });
    return responseData;
  });
}
