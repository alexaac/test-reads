import React from 'react';
import { Link } from 'react-router-dom';

const ListBooks = (props) => {
  const { books, shelves, onUpdateShelf } = props;

  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books &&
          books.map((book) => {
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <Link to={`/books/${book.id}`}>
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${
                            book.imageLinks && book.imageLinks.thumbnail
                          })`,
                        }}
                      />
                    </Link>
                    <div className="book-shelf-changer">
                      <select
                        value={book.shelf || 'none'}
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
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {book.authors && book.authors.join(',')}
                  </div>
                </div>
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default ListBooks;
