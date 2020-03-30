import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookContext from './utils/BookContext';
import Search from './components/views/Search';
import Saved from './components/views/Saved';
import Book from './utils/Book';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';



function App() {
  const [bookState, setBookState] = useState({
    userBooks: [],
    input: '',
    searchBooks: []
  })

  bookState.handleInputChange = (event) => {
    setBookState({ ...bookState, [event.target.name]: event.target.value })
  }

  bookState.handleSearchBook = event => {
    event.preventDefault();
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookState.input}&key=AIzaSyBZh-a4x_DWMuMSbODfA2Vh6fsls0dKA7E`)
      .then(({ data: { items } }) => {
        let booksInfo = items.map(elem => elem.volumeInfo);
        setBookState({ ...bookState, input: '', searchBooks: booksInfo });
      })
      .catch(e => console.error(e))
  }

  bookState.handleSaveBook = (index) => {
    let saveBook = JSON.parse(JSON.stringify(bookState.searchBooks[index]));
    let userBooks = JSON.parse(JSON.stringify(bookState.userBooks));
    Book.create(saveBook)
      .then(({ data }) => {
        userBooks.push(data);
        setBookState({ ...bookState, userBooks })
      })
      .catch(e => console.error(e))
  }

  bookState.handleDeleteBook = (id, index) => {
    let userBooks = JSON.parse(JSON.stringify(bookState.userBooks));
    userBooks.splice(index, 1);
    Book.delete(id)
      .then(() => {
        setBookState({ ...bookState, userBooks });
      })
      .catch(e => console.error(e))
  }

  useEffect(() => {
    Book.read()
      .then(({ data }) => {
        setBookState({ ...bookState, userBooks: data })
      })
      .catch(e => console.error(e))
  }, [])

  return (
    <BookContext.Provider value={bookState}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Search />
          </Route>
          <Route exact path="/saved">
            <Saved />
          </Route>
        </Switch>
      </Router>
    </BookContext.Provider>
  );
}

export default App;