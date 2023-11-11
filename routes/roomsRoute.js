const express = require('express');
const router = express.Router();
const User = require("../models/user");
const jwt = require('jsonwebtoken');

 async function verifyToken ( req, res, next) {

  const token = req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.userId;
      const email = decoded.email;
  
      const user = await User.findById(userId);
  
      if (user && user.isAdmin) {
        req.userId = userId; 
        req.email = email;
        next();
      }
      else{
        res.status(401).json({ message: 'Access denied'});
      }
     
  } catch (error) {
    res.status(403).json({ message: 'Invalid token.' });
  }
}

const Room= require('../models/room');
router.get("/getallrooms",verifyToken,async(req,res) => {
    try{
        const rooms=await Room.find({})
        res.send(rooms);
    } catch(error){
        return res.status(400).send({message: error});
    }
});

router.post("/getroombyid",async(req,res) => {
    const roomid = req.body.roomid;
    try{
        const room=await Room.findOne({_id : roomid});
        res.send(room);
    } catch(error){
        return res.status(400).send({message: error});
    }
});
router.post("/addroom",verifyToken, async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.send("New room added successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;