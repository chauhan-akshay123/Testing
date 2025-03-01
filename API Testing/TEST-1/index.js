const express = require("express");
const app = express();

app.use(express.json());


let reviews = [
    { id: 1, content: "Great product!", userId: 1 },
    { id: 2, contect: "Not bad, could be better", userId: 2 },
];

let users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
];

// Functions
async function getAllReviews(){
    return reviews;
}

async function getReviewById(id){
    return reviews.find((review) => review.id === id);
}

async function addReview(data){
    data.id = reviews.length + 1;
    reviews.push(data);
    return data;
}

async function getUserById(id){
    return users.find((user) => user.id === id);
}

async function addUser(data){
    data.id = users.length + 1;
    users.push(data);
    return data;
}

// API Endpoints

// GET all reviews
app.get("/reviews", async (req, res) => {
    const reviews = await getAllReviews();
    res.status(200).json(reviews);
});

// GET review by ID
app.get("/reviews/details/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const review = await getReviewById(id);
    if(!review){
        return res.status(404).json({ error: "Review not found." });
    }
    res.status(200).json(review);
});

// POST Add review
app.post("/reviews/new", async (req, res) => {
    const newReview = await addReview(req.body);
    res.status(201).json(newReview);
});

// GET user by ID
app.get("/users/details/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await getUserById(id);
    if(!user){
       return res.status(404).json({ error: "User not found." }); 
    }
    return res.status(200).json(user);
});

// POST add new user
app.post("/users/new", async (req, res) => {
  const newUser = await addUser(req.body);
  res.status(201).json(newUser);
});

module.exports = {
    app,
    getAllReviews,
    getReviewById,
    addReview,
    getUserById,
    addUser
}