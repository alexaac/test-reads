import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListBooks extends Component {
  render() {
    const { books, shelves, onUpdateShelf } = this.props;

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books &&
            books.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <Link to={`/books/${book.id}`}>
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${book.imageLinks &&
                            book.imageLinks.thumbnail})`,
                        }}
                      />
                    </Link>
                    <div className="book-shelf-changer">
                      <select
                        value={book.shelf || 'undefined'}
                        onChange={(event) =>
                          event.target.value !== 'none'
                            ? onUpdateShelf(book, event.target.value)
                            : {}
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
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {book.authors && book.authors.join(',')}
                  </div>
                </div>
              </li>
            ))}
        </ol>
      </div>
    );
  }
}

export default ListBooks;
