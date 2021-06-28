import React, { Component } from 'react';

class AddBookButton extends Component {
  gotoSearch = () => {
    this.props.history.push('/search');
  };

  render() {
    return (
      <div className="open-search">
        <button onClick={this.gotoSearch}>Add a book</button>
      </div>
    );
  }
}

export default AddBookButton;
