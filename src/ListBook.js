import React, { Component } from 'react';
import { withRouter } from 'react-router';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';

class ListBook extends Component {
  state = {
    book: {},
  };

  // Get book from API and refresh state
  componentDidMount() {
    BooksAPI.get(this.props.match.params.bookId).then((book) =>
      this.setState(() => ({
        book,
      }))
    );
  }

  gotoHomepage = () => {
    this.props.history.push('/');
  };

  render() {
    const { shelves, onUpdateShelf } = this.props;

    const book = this.state.book || {};

    return (
      <div id="main">
        <button className="go-home" onClick={this.gotoHomepage}>
          Close
        </button>
        <div className="row">
          <div className="column">
            <div className="book wide">
              <div className="book-top">
                <Link to={`/books/${book && book.id}`}>
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book &&
                        book.imageLinks &&
                        book.imageLinks.thumbnail})`,
                    }}
                  />
                </Link>
                <div className="book-shelf-changer">
                  <select
                    value={book ? book.shelf : 'undefined'}
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
            </div>
          </div>
          <div className="column">
            <div className="title-details">
              <h1
                aria-label={`Title details for ${book.title}`}
                tabIndex="-1"
                lang="en"
              >
                {book.title}
              </h1>
              <div className="book-authors">
                {book && book.authors && book.authors.join(',')}
              </div>
              <div>
                <h2 tabIndex="-1">Categories</h2>
                <p>
                  {book &&
                    book.categories &&
                    book.categories.map((category) => (
                      <a
                        key={category}
                        role="button"
                        className="category-btn"
                        href="/"
                      >
                        Fiction
                      </a>
                    ))}
                </p>
              </div>
            </div>
            <article>
              <span tabIndex="0">
                <b>Publisher: </b>
                {book && book.publisher}
              </span>

              <ul>
                <li tabIndex="0" aria-label={`${book && book.publishedDate}`}>
                  <b>Release date:</b> {book && book.publishedDate}
                </li>
              </ul>

              <h2 tabIndex="0" aria-label="printType">
                Print Type
              </h2>

              <ul>
                <li
                  tabIndex="0"
                  aria-label={`${book && book.industryIdentifiers}`}
                >
                  <b>ISBN:</b>{' '}
                  {book && book.industryIdentifiers
                    ? book.industryIdentifiers
                        .map((elem) => elem.type)
                        .join(', ')
                    : ''}
                </li>

                <li tabIndex="0" aria-label={`${book && book.pageCount}`}>
                  <b>Page Count:</b> {`${book && book.pageCount}`}
                </li>
              </ul>

              <h2 tabIndex="0" aria-label="printType">
                Description
              </h2>
              <p>{book.description}</p>
            </article>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ListBook);
