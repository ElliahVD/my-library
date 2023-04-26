import { Router } from "express";
import 'express-async-errors'

import rootController from "./controllers/rootController";
import userController from "./controllers/userController";
import bookController from "./controllers/bookController";
import countryController from "./controllers/countryController";
import genderController from "./controllers/genderController";
import authorController from "./controllers/authorController";

const api = () => {
  const routes = Router();

  routes.get('/', rootController.index);

  routes.get('/login', userController.login);
  routes.post('/connect', userController.connect);
  routes.get('/new_user', userController.newUser);

  routes.get('/new_book', bookController.insertBook);

  routes.get('/new_country', countryController.insertCountry);

  routes.get('/users', userController.getAllUsers);
  routes.get('/users/:userId', userController.getUser);
  routes.post('/users', userController.insertUser);
  routes.put('/users/:userId', userController.updateUser);
  routes.delete('/users/:userId', userController.deleteUser);

  routes.get('/books', bookController.getAllBooks);
  routes.get('/books/bookId', bookController.getBook);
  routes.post('/books', bookController.insertBook);
  routes.put('/books/:bookId', bookController.updateBook);
  routes.delete('/books/:bookId', bookController.deleteBook);

  routes.get('/authors', authorController.getAllAuthors);
  routes.get('/authors/authorId', authorController.getAuthor);
  routes.post('/authors', authorController.insertAuthor);
  routes.put('/authors/:authorId', authorController.updateAuthor);
  routes.delete('/authors/:authorId', authorController.deleteAuthor);

  routes.get('/countries', countryController.getAllCountry);
  routes.get('/countries/countryId', countryController.getCountry);
  routes.post('/countries', countryController.insertCountry);
  routes.put('/countries/:countryId', countryController.updateCountry);
  routes.delete('/countries/:countryId', countryController.deleteCountry);

  routes.get('/genders', genderController.getAllGenders);
  routes.get('/genders/genderId', genderController.getGender);
  routes.post('/genders', genderController.insertGender);
  routes.put('/genders/:genderId', genderController.updateGender);
  routes.delete('/genders/:genderId', genderController.deleteGender);

  return routes;
};

export default api;
