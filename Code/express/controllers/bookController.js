// import Book from "../models/book.js"

const store = [];

export async function getAllBooks(req, res, next) {
  return res.send(store);
}
export async function getBookById(req, res, next) {
  return res.send("Not implemented yet.");
}
export async function addNewBook(req, res, next) {
  try {
    const { body } = req;

    store.push(body);

    return res.status(201).json(body);
  } catch (error) {
    next(error);
  }
}
export async function deleteBookById(req, res, next) {
  return res.send("Not implemented yet.");
}
export async function updateBook(req, res, next) {
  return res.send("Not implemented yet.");
}
export async function getBookByRating(req, res, next) {
  return res.send("Not implemented yet.");
}
