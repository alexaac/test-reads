### Date created

2021-06-31

### Project Title

MyReads 

### Description

A bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read.

## Project Setup

1. clone the Project - `git clone https://github.com/alexaac/test-reads.git`
2. `cd test-reads`
3. install the dependencies - `npm install`
4. start the project on localhost:3000 - `npm start`

## Testing
* test - `npm test`
## Files
```bash
.
├── package.json # npm package manager file
├── package-lock.json
├── public
│   ├── favicon.ico
│   └── index.html
├── README.md
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms
└── src
    ├── AddBookButton.js # Component to link to the Search page
    ├── App.css # Styles for the app
    ├── App.js # This is the root of the app
    ├── App.test.js
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend
    ├── icons # Helpful images
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles
    ├── index.js # DOM rendering
    ├── ListBook.js # Component to list book by bookId
    ├── ListBooksContent.js # Component to list all books content on the main page
    ├── ListBooks.js # Component to list books by category
    └── SearchBooks.js # Component to search books by title or author
```


## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

### Credits

Alexa Cristina | Udacity