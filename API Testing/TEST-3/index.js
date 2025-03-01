const {  getBooks, 
    getBookById, 
    getReviews,
    getReviewById } = require("./book.js");

const express = require("express");
const app = express();
app.use(express.json());

// API to get all books
app.get("/api/books", async (req, res) => {
  try{
   const books = await getBooks();
   if(books.length === 0){
      return res.status(404).json({ error: "No books found." });
   }
   return res.status(200).json(books);
  } catch(error){
     res.status(500).json({ error: "Internal server error" });
  }
});

// API to get book by ID
app.get("/api/books/:id", async (req, res) => {
   try{
     const id = parseInt(req.params.id);
     const book = await getBookById(id);
     if(!book){
        return res.status(404).json({ error: "Book not found" }); 
     }
     return res.status(200).json(book);
   } catch(error){
      res.status(500).json({ error: "Internal server error" }); 
   }
});

// API to get all reviews
app.get("/api/reviews", async (req, res) => {
   try{
    const reviews = await getReviews();
    if(reviews.length === 0){
       return res.status(404).json({ error: "No reviews found" }); 
    }
   return res.status(200).json(reviews);
   } catch(error){
     res.status(500).json({ error: "Internal server error" });
   }
});

// API to get review by ID
app.get("/api/reviews/:id", async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const review = await getReviewById(id);
    if(!review){
       return res.status(404).json({ error: "Review not found." }); 
    }
    res.status(200).json(review);
  } catch(error){
     res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { app };