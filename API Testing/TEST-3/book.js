let books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'Brave New World', author: 'Aldous Huxley' },
    { id: 3, title: "Pride and Prejudice", author: "Jane Austen" },
    { id: 4, title: "To Kill a Mockingbird", author: "Harper Lee" }
  ];
  
  let reviews = [{id: 1, bookId: 1, content: "Great Writing!"}];

async function getBooks(){
    return books;
}

async function getBookById(id){
    return books.find((book) => book.id === id); 
}

async function getReviews(){
    return reviews;
}

async function getReviewById(id){
    return reviews.find((review) => review.id === id);
}

module.exports = {
    getBooks, 
    getBookById, 
    getReviews,
    getReviewById
};