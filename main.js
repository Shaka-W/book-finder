const form = document.querySelector("#form");
const bookSearchInput = document.querySelector("#form__search");
const container = document.querySelector(".container");

form.addEventListener("submit", getBooks);

function getBooks(e) {
  e.preventDefault();

  clearBookResults();

  if (bookSearchInput.value === "") {
    return;
  }

  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${bookSearchInput.value}&key=AIzaSyDjjAQV19cNUPs5sSrC6G4QYo2EIqfI34w`
  )
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.items.length; i++) {
        const title = data.items[i].volumeInfo.title;
        const image = data.items[i].volumeInfo.imageLinks.thumbnail;
        const author = data.items[i].volumeInfo["authors"].toString();
        const publisher = data.items[i].volumeInfo.publisher;
        const publishedDate = data.items[i].volumeInfo.publishedDate;

        const book = Book(title, image, author, publisher, publishedDate);
        displayBooks(book);
      }
    });
}

function Book(title, image, author, publisher, published) {
  return {
    title,
    image,
    author,
    publisher,
    published,
  };
}

function createBook() {
  let div = document.createElement("div");
  div.classList.add("book");
  return div;
}

function createBookImage() {
  let img = document.createElement("img");
  img.classList.add("book__image");
  return img;
}

function createBookTitle() {
  let h3 = document.createElement("h3");
  h3.classList.add("book__title");
  return h3;
}

function createBookAuthor() {
  let author = document.createElement("p");
  author.classList.add("book__author");
  return author;
}

function createBookPublisher() {
  let publisher = document.createElement("p");
  publisher.classList.add("book__publisher");
  return publisher;
}

function createBookPublished() {
  let published = document.createElement("p");
  published.classList.add("book__published");
  return published;
}

function displayBooks(bookObj) {
  let book = createBook();
  let bookTitle = createBookTitle();
  let bookImage = createBookImage();
  let bookAuthor = createBookAuthor();
  let bookPublisher = createBookPublisher();
  let publishedOn = createBookPublished();

  bookTitle.textContent = bookObj.title;
  bookImage.src = bookObj.image;
  bookAuthor.textContent = `Author: ${bookObj.author}`;

  if (bookObj.publisher) {
    bookPublisher.textContent = `Publisher: ${bookObj.publisher}`;
  } else {
    bookPublisher.textContent = `Publisher: `;
  }

  publishedOn.textContent = `Published: ${bookObj.published}`;

  book.append(bookTitle, bookImage, bookAuthor, bookPublisher, publishedOn);
  container.append(book);
}

function clearBookResults() {
  while (container.firstElementChild) {
    container.removeChild(container.firstElementChild);
  }
}
