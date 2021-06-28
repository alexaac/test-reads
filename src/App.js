import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBooks from './SearchBooks';
import ListBooksContent from './ListBooksContent';
import { Route } from 'react-router-dom';
import AddBookButton from './AddBookButton';
class BooksApp extends React.Component {
  state = {
    books: [],
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

  render() {
    console.log(this.state.books);
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
                onUpdateShelf={this.onUpdateShelf}
              />
              <AddBookButton history={history} />
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              books={this.state.books}
              onUpdateShelf={this.onUpdateShelf}
            />
          )}
        />
        }
      </div>
    );
  }
}

export default BooksApp;
