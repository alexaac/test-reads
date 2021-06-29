import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';

class SearchBooks extends Component {
  state = {
    books: [],
  };

  gotoHomepage = () => {
    this.props.history.push('/');
  };

  updateQuery = (query) =>
    BooksAPI.search(query.trim()).then((books) => {
      if (books && books.error) {
        // empty search result
        books = [];
      }

      this.setState(() => ({
        books,
      }));
    });

  componentDidMount() {
    this.updateQuery('');
  }

  render() {
    const { onUpdateShelf, getShelves } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="go-home" onClick={this.gotoHomepage}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            {}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ListBooks
            books={this.state.books}
            shelves={getShelves(this.state.books)}
            onUpdateShelf={onUpdateShelf}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
