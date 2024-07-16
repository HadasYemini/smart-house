const Router = require("express").Router;
const roomsRouter = Router();
const { roomsModel } = require("../db");

roomsRouter.post("/saveRooms", async (req, res) => {
  const { rooms } = req.body;

  try {
    const result = await roomsModel.findOneAndUpdate(
      {}, // empty filter to match any document
      { rooms },
      {
        upsert: true, // create a new document if one doesn't exist
        new: true, // return the updated document
        setDefaultsOnInsert: true, // if a new document is created, ensure defaults are applied
      }
    );
    res
      .status(201)
      .json({ message: "Rooms saved successfully"});
  } catch (error) {
    console.error("Error saving rooms:", error);
    res.status(500).json({ message: "Failed to save rooms" });
  }
});

roomsRouter.get("/getRooms", async (req, res) => {
  try {
    let rooms = await roomsModel.find({}).select("-_id -__v");
    if (rooms[0]?.rooms) {
    res.json({rooms:rooms[0].rooms});
    }else{
        res.json([])
    }
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Failed to fetch rooms. Please try again." });
  }
});

module.exports = roomsRouter;
