const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let authors =  [
    { authorId: 1, name: 'George Orwell', book: '1984' },
    { authorId: 2, name: 'Aldous Huxley', book: 'Brave New World' },
    { authorId: 3, name: 'Ray Bradbury', book: 'Fahrenheit 451' }
  ];

  function getAuthors() {
    return authors;
  }

  function getAuthorById(id){
    return authors.find((author) => author.id === id);
  }

  function addAuthor(author){
    authors.push(author);
    return author;
  }

app.get("/authors", (req, res) => {
    const authors = getAuthors();
    return res.status(200).json(authors);
});

app.get("/authors/details/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let author = getAuthorById(id);
  if(!author){
     return res.status(404).json({ error: "Author not found." });
  }
  return res.status(200).json(author);
});

app.post("/authors/new", (req, res) => {
   let authorId = parseInt(req.query.authorId);
   let name = req.query.name;
   let book = req.query.book;
   let addedAuthor = addAuthor({ authorId, name, book });
   res.status(201).json(addedAuthor);
});

module.exports = { app, getAuthors, getAuthorById, addAuthor };

  



