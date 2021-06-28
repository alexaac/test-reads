import React from 'react';
import ListBooks from './ListBooks';

const ListBooksContent = (props) => {
  const { books, onUpdateShelf } = props;

  const makeTitle = (shelf) => {
    const shelfTitle = shelf.split(/(?=[A-Z])/).join(' ');
    return shelfTitle.charAt(0).toUpperCase() + shelfTitle.slice(1);
  };

  const shelves = books.reduce((accum, curr) => {
    accum[curr.shelf] = makeTitle(curr.shelf);
    return accum;
  }, {});

  return (
    <div className="list-books-content">
      <div>
        {Object.keys(shelves).map((shelf) => {
          const filteredBooks = books.filter(
            (book) => book.shelf.toLowerCase() === shelf.toLowerCase()
          );

          return (
            <div className="bookshelf" key={shelf}>
              <h2 className="bookshelf-title">{shelves[shelf]}</h2>
              <ListBooks books={filteredBooks} shelves={shelves} onUpdateShelf={onUpdateShelf} />
            </div>
          );
        })}
      </div>
    </div>
    
  );
};

export default ListBooksContent;
