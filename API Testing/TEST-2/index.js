const express = require("express");
const app = express();
app.use(express.json());

let games = [
    { id: 1, title: 'The Legend of Zelda', genre: 'Adventure', developer: 'Nintendo' },
    { id: 2, title: 'Super Mario Bros', genre: 'Platformer', developer: 'Nintendo' }
];
  
  let developers = [
    { id: 1, name: 'Nintendo', country: 'Japan' },
    { id: 2, name: 'EA Games', country: 'USA' }
];

async function getAllGames(){
    return games;
}

async function getGameById(id){
    return games.find((game) => game.id === id);
};

async function addGame(data){
    data.id = games.length + 1;
    games.push(data);
    return data;
}

async function getDeveloperById(id){
    return developers.find((developer) => developer.id === id);
}

async function addDeveloper(data){
    data.id = developers.length + 1;
    developers.push(data);
    return data;
}

// get all games
app.get("/games", async (req, res) => {
  const games = await getAllGames();
  res.status(200).json(games);
});

// get a game by ID
app.get("/games/details/:id", async (req, res) => {
   const id = parseInt(req.params.id);
   const game = await getGameById(id);
   if(!games){
      return res.status(404).json({ error: "Game not found." });
   }
   res.status(200).json(game);
});

// add a game
app.post("/games/new", async (req, res) => {
  const newGame = await addGame(req.body);
  res.status(201).json(newGame);
});

// get developer by ID
app.get("/developer/details/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const developer = await getDeveloperById(id);
    if(!developer){
       return res.status(404).json({ error: "Developer not found." }); 
    }
    res.status(201).json(developer);
});

// add developer
app.post("/developer/new", async (req, res) => {
    const newDeveloper = await addDeveloper(req.body);
    res.status(201).json(newDeveloper);
});

module.exports = { app, getAllGames, getGameById, addGame, getDeveloperById, addDeveloper };