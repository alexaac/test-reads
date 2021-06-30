import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBooks from './SearchBooks';
import ListBooksContent from './ListBooksContent';
import ListBook from './ListBook';
import { Route } from 'react-router-dom';
import AddBookButton from './AddBookButton';
class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: {
      currentlyReading: 'Currently Reading',
      wantToRead: 'Want To Read',
      read: 'Read',
      none: 'None',
    },
  };

  // Get books from API and refresh state
  reloadBooks = () =>
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });

  componentDidMount() {
    this.reloadBooks();
  }

  // Update book shelf by id
  onUpdateShelf = (book, shelf) =>
    BooksAPI.update(book, shelf).then(() => this.reloadBooks());

  makeTitle = (shelf) => {
    if (shelf === 'none') return 'None';
    const shelfTitle = shelf.split(/(?=[A-Z])/).join(' ');
    return shelfTitle.charAt(0).toUpperCase() + shelfTitle.slice(1);
  };

  render() {
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
                books={this.state.books}
                shelves={this.state.shelves}
                onUpdateShelf={this.onUpdateShelf}
              />
              <AddBookButton history={history} />
            </div>
          )}
        />
        <Route
          path="/search"
          render={({ history }) => (
            <SearchBooks
              books={this.state.books}
              shelves={this.state.shelves}
              onUpdateShelf={this.onUpdateShelf}
              history={history}
            />
          )}
        />
        <Route
          path="/books/:bookId"
          render={({ history, match }) => (
            <ListBook
              shelves={this.state.shelves}
              onUpdateShelf={this.onUpdateShelf}
              history={history}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
