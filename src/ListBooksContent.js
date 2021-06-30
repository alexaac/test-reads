import React from 'react';
import ListBooks from './ListBooks';

const ListBooksContent = (props) => {
  const { books, shelves, onUpdateShelf } = props;

  return (
    <div className="list-books-content">
      <div>
        {Object.keys(shelves).map((shelf) => {
          if (shelf === 'none') return '';

          const filteredBooks = books.filter(
            (book) => book.shelf.toLowerCase() === shelf.toLowerCase()
          );

          return (
            <div className="bookshelf" key={shelf}>
              <h2 className="bookshelf-title">{shelves[shelf]}</h2>
              <ListBooks
                books={filteredBooks}
                shelves={shelves}
                onUpdateShelf={onUpdateShelf}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListBooksContent;
