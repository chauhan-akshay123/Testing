const express = require("express");
const app = express();
const PORT = 3000;
const { getBooks, getBookById, addBook } = require("./book.js");

app.use(express.json());

app.get("/api/books", (req, res) => {
  res.json(getBooks());
});

app.get("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = getBookById(id);
  if(!book) return res.status(404).json({ error: "Book not found" });
  res.status(200).json(book);
});

app.post("/api/books", (req, res) => {
 const book = addBook(req.body);
 res.status(201).json({ messgae: "Book added successfully", book }); 
});

app.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`);
});

module.exports = app;