const express = require("express");
const Bookmark = require("../models/bookmark");
const router = express.Router();

// Get all bookmarks
router.get("/", async (req, res) => {
  try{
   const bookmarks = await Bookmark.findAll();
   return res.status(200).json(bookmarks); 
  } catch(error){
     return res.status(500).json({ message: "Error fetching bookmarks", error: error.message });
  }
});

// Add a new bookmark
router.post("/", async (req, res) => {
  try{
    const { url, title, description } = req.body;
    const newBookmark = await Bookmark.create({ url, title, description });
    return res.status(201).json(newBookmark);
  } catch(error){
     return res.status(500).json({ message: "Error adding a bookmark", error: error.message });
  }
});

// Update bookmark (mark as favorite read, archived)
router.patch("/:id", async (req, res) => {
  try{
    const { id } = req.params;
    const { favorite, read, archived } = req.body;

    const bookmark = await Bookmark.findByPk(id);
    if(!bookmark) return res.status(404).json({ error: "Bookmark not found" });
    
    if(favorite !== undefined) bookmark.favorite = favorite;
    if(read !== undefined) bookmark.read = read;
    if (archived !== undefined) bookmark.archived = archived;

    await bookmark.save();
    return res.status(200).json(bookmark);
  } catch(error){
     return res.status(500).json({ message: "Error updating a bookmark", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try{
    const { id } = req.params;
    const bookmark = await Bookmark.findByPk(id);
    if(!bookmark) return res.status(404).json({ message: "Bookmark not found", error: error.message });
    
    await Bookmark.destroy();
    return res.status(204).json({ message: "Bookmark deleted successfully." });
  } catch(error){
     return res.status(500).json({ message: "Error deleting bookmarks", error: error.message });
  }
});

module.exports = router;