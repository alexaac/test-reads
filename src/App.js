import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBooks from './SearchBooks';
import ListBooksContent from './ListBooksContent';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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

  componentDidUpdate() {
    this.reloadBooks();
  }

  // Update book shelf by id
  onUpdateShelf = (book, shelf) => BooksAPI.update(book, shelf);

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListBooksContent
              books={this.state.books}
              onUpdateShelf={this.onUpdateShelf}
            />
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
