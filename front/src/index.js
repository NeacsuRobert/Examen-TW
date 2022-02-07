import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HashRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard';
import ViewShelves from './ViewShelves'
import CreateShelf from './CreateShelf'
import AddBook from './AddBook'
import BookForm from './BookForm'
import ShelfModifyForm from './ShelfModifyForm'
import BookModifyForm from './BookModifyForm'

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/viewShelves" element={<ViewShelves />} />
      <Route path="/createShelf" element={<CreateShelf />} />
      <Route path="/addBook" element={<AddBook />} />
      <Route path="/shelves/:shelfId/addBook" element={<BookForm />} />
      <Route path="/shelves/:shelfId/modify" element={<ShelfModifyForm />} />
      <Route path="/books/:bookId" element={<BookModifyForm />} />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);
