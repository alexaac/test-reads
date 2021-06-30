import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';

class SearchBooks extends Component {
  state = {
    rawBooks: [],
    query: '',
  };

  gotoHomepage = () => {
    this.props.history.push('/');
  };

  updateQuery = (query, books) =>
    BooksAPI.search(query.trim()).then((rawBooks) => {
      let updatedBooks = [];

      if (rawBooks !== undefined && !rawBooks.error) {
        // not empty search result

        updatedBooks = rawBooks.map((rawBook) => {
          const filteredBooks = books.filter((book) => book.id === rawBook.id);
          rawBook.shelf = filteredBooks[0] ? filteredBooks[0].shelf : 'none';

          return rawBook;
        });
      }

      this.setState(() => ({
        rawBooks: updatedBooks,
        query,
      }));
    });

  updateShelf = async (book, shelf) => {
    await this.props.onUpdateShelf(book, shelf);

    this.updateQuery(this.state.query, this.props.books);
  };

  render() {
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
              onChange={(event) =>
                this.updateQuery(event.target.value, this.props.books)
              }
            />
          </div>
        </div>
        <div className="search-books-results">
          <ListBooks
            books={this.state.rawBooks}
            shelves={this.props.shelves}
            onUpdateShelf={this.updateShelf}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
