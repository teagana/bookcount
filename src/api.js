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
    let responseData = response.json().then((books) => {
      let ISBN = books[0].ISBN;
      console.log("books", books, ISBN);
      return books[0];
    });
    return responseData;
  });
}

// get all the info necessary to render the home page
export function getHomePageInfo() {
  let totalBooks = 0;
  let totalPages = 0;

  // get all the books ever read and loop through them
  return getAllBooks().then((books) => {
    totalBooks = books.length;
    console.log(books);

    let today = new Date(Date.now());
    // determine current year
    let currentYear = today.getFullYear();

    let booksThisYear = 0;
    let pagesThisYear = 0;
    let booksPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let pagesPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // determine most common genre
    let genres = new Map();

    // loop through all books
    // if from this year, put into month arrays
    books.forEach((book) => {
      let bookEntryDate = new Date(book.timestamp);
      console.log("book date", bookEntryDate);

      // always add to total pagecount, no matter the year
      totalPages += Number(book.pagecount);

      // if the book is from this year, increment the month count
      // and add to the pagecount
      // also, add to this year total of books and pages
      if (bookEntryDate.getFullYear() === currentYear) {
        booksPerMonth[bookEntryDate.getMonth()]++;
        booksThisYear++;

        pagesPerMonth[bookEntryDate.getMonth()] += Number(book.pagecount);
        pagesThisYear += Number(book.pagecount);
      }

      // if the genre key already exists in the map, add to its value
      if (genres.has(book.genre)) {
        genres.set(book.genre, genres.get(book.genre) + 1);
      }
      // otherwise, add the genre to the map
      else {
        genres.set(book.genre, 1);
      }
    });

    console.log("books this year", booksPerMonth, pagesPerMonth);
    console.log("genres", genres);

    let mostReadGenre = "";
    let maxGenreOccurrence = 0;

    // find the genre that occurs the most
    genres.forEach((value, key) => {
      if (value > maxGenreOccurrence) {
        mostReadGenre = key;
        maxGenreOccurrence = value;
      }
    });

    console.log("most common genre", mostReadGenre);

    // get the goals to return to home page
    return getAllGoals().then((goals) => {
      let info = {
        totalBooks,
        booksThisYear,
        booksThisMonth: booksPerMonth[today.getMonth()],
        mostReadGenre,
        totalPages,
        pagesThisYear,
        pagesThisMonth: pagesPerMonth[today.getMonth()],
        goals,
      };

      return info;
    });
  });
}
