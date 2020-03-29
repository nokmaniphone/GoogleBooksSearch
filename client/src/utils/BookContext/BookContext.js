import React, { createContext } from 'react';

const BookContext = createContext({
  books: [],
  query: '',
  input: '',
  book: {},
  handleInputChange: () => { },
  handleSearchBook: () => { },
  handleSaveBook: (i) => { }
});

export default BookContext;