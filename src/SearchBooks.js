import React, { Component } from 'react';
import ListBooks from './ListBooks';

class SearchBooks extends Component {
  state = {
    query: '',
  };

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
  };

  render() {
    const { query } = this.state;
    const { books, onUpdateShelf } = this.props;

    const filteredBooks =
      query === ''
        ? books
        : books.filter(
            (book) =>
              book.title.toLowerCase().includes(query.toLowerCase()) ||
              book.authors.filter((author) =>
                author.toLowerCase().includes(query.toLowerCase())
              ).length > 0
          );

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => this.setState({ showSearchPage: false })}
          >
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
          <ListBooks books={filteredBooks} onUpdateShelf={onUpdateShelf} />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
