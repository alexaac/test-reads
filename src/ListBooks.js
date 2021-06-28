import React, { Component } from 'react';

class ListBooks extends Component {
  render() {
    const { books, shelves, onUpdateShelf } = this.props;

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`,
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf}
                      onChange={(event) =>
                        onUpdateShelf(book, event.target.value)
                      }
                    >
                      <option value="move" disabled>
                        Move to...
                      </option>
                      {Object.keys(shelves).map((shelf) => (
                        <option key={shelf} value={shelf}>
                          {shelves[shelf]}
                        </option>
                      ))}
                      {/* TODO: treat none shalf value */}
                      <option value="none">None</option>{' '}
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors.join(',')}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListBooks;
