import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks';
import ListBooksContent from './ListBooksContent';
import ListBook from './ListBook';
import AddBookButton from './AddBookButton';

const BooksApp = () => {
  const [books, setBooks] = useState([]);

  const shelves = {
    currentlyReading: 'Currently Reading',
    wantToRead: 'Want To Read',
    read: 'Read',
    none: 'None',
  };

  // Get books from API and refresh state
  const reloadBooks = () => BooksAPI.getAll().then((books) => setBooks(books));

  useEffect(() => {
    reloadBooks();
  });

  // Update book shelf by id
  const onUpdateShelf = (book, shelf) =>
    BooksAPI.update(book, shelf).then(() => reloadBooks());

  return (
    <div className="app">
      <Route
        exact
        path="/"
        render={({ history }) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListBooksContent
              books={books}
              shelves={shelves}
              onUpdateShelf={onUpdateShelf}
            />
            <AddBookButton history={history} />
          </div>
        )}
      />
      <Route
        path="/search"
        render={({ history }) => (
          <SearchBooks
            books={books}
            shelves={shelves}
            onUpdateShelf={onUpdateShelf}
            history={history}
          />
        )}
      />
      <Route
        path="/books/:bookId"
        render={({ history, match }) => (
          <ListBook
            shelves={shelves}
            onUpdateShelf={onUpdateShelf}
            history={history}
          />
        )}
      />
    </div>
  );
};

export default BooksApp;
