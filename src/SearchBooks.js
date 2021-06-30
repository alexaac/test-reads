import React, { useState, useCallback, useMemo, useEffect } from 'react';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import debounce from 'lodash.debounce';

const SearchBooks = (props) => {
  const [rawBooks, setRawBooks] = useState([]);
  const [query, setQuery] = useState('');

  const gotoHomepage = () => {
    props.history.push('/');
  };

  const updateQuery = useCallback(
    (query, books) =>
      BooksAPI.search(query.trim()).then((rawBooks) => {
        let updatedBooks = [];

        if (rawBooks !== undefined && !rawBooks.error) {
          // not empty search result

          updatedBooks = rawBooks.map((rawBook) => {
            const filteredBooks = books.filter(
              (book) => book.id === rawBook.id
            );
            rawBook.shelf = filteredBooks[0] ? filteredBooks[0].shelf : 'none';

            return rawBook;
          });
        }
        setRawBooks(updatedBooks);
        setQuery(query);
      }),
    []
  );

  const handleChange = (query, books) => {
    setQuery(query);
    debouncedCallback(query, books);
  };

  const debouncedCallback = useMemo(
    () =>
      debounce((query, books) => {
        updateQuery(query, books);
      }, 500),
    [updateQuery]
  );

  const updateShelf = async (book, shelf) => {
    await props.onUpdateShelf(book, shelf);

    updateQuery(query, props.books);
  };

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedCallback.cancel();
      setQuery('');
    };
  }, [debouncedCallback]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="go-home" onClick={gotoHomepage}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          {}
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={(event) => handleChange(event.target.value, props.books)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ListBooks
          books={rawBooks}
          shelves={props.shelves}
          onUpdateShelf={updateShelf}
        />
      </div>
    </div>
  );
};

export default SearchBooks;
