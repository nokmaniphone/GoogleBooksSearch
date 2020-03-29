import axios from 'axios';

const Book = {
  read: () => axios.get('/api/books'),
  create: book => axios.post('/api/books', book),
  delete: (id, index) => axios.delete(`/api/books/${id}`)
}

export default Book;