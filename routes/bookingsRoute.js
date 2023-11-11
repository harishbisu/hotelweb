const express = require('express');
const router = express.Router();
const Room = require("../models/room");
const Booking = require("../models/booking");
const Rating = require("../models/rating");
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

  const token = req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if(decoded.user_id===req.user_id)
    {
      next();
    }
    else{
      res.status(401).json({ message: 'Access denied'});
    }
     
  } catch (error) {
    res.status(403).json({ message: 'Invalid token.' });
  }
}

router.post("/bookroom", verifyToken , async (req, res) => {
  const {
    room,
    user_id,
    fromdate,
    todate,
    totalamount,
    totaldays
  } = req.body;

 

  try {
    const newbooking = new Booking({
      room: room.name,
      roomid: room._id,
      user_id,
      fromdate: fromdate,
      todate: todate,
      totalamount,
      totaldays,
      transactionId: '123453'
    });

    const booking = await newbooking.save();
    const roomtemp = await Room.findOne({ _id: room._id });
    roomtemp.currentbookings.push({ bookingid: booking._id, fromdate: fromdate, todate: todate, userid: user_id, status: booking.status });
    await roomtemp.save();
    res.send('Room booked successfully');
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getbookingbyuserid" , verifyToken ,async(req,res)=>{
  const userid=req.body.userid;
  try {
    const bookings = await Booking.find({user_id : userid});
    res.send(bookings);
  } catch (error) {
      return res.status(400).json({message:error});
  }
});

router.post("/cancelBooking" , verifyToken ,async(req,res)=>{
  const {bookingid,roomid}=req.body;
  try {
    
  const bookingitem =await Booking.findOne({_id:bookingid});
  bookingitem.status = 'cancelled';
  await bookingitem.save();
  const room = await Room.findOne({_id : roomid});
  const bookings = room.currentbookings;
  const temp=bookings.filter(booking=>booking.bookingid.toString()!==bookingid)
  room.currentbookings=temp;
  await room.save();
  res.send("Your booking got cancelled, Successfully")
  } catch (error) {
    return res.status(400).json({error});
  }
});

router.get("/getallbookings" , verifyToken ,async(req,res)=>{
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({error});
  }
});

router.post("/rateroom" , verifyToken , async (req, res) => {
  try {
    const { roomId, value, bookingId } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { rating: value }, { new: true });

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    const existingRating = await Rating.findOne({ roomId });

    if (existingRating) {
      const updatedValue = (existingRating.value * existingRating.count + value) / (existingRating.count + 1);

      await Rating.updateOne(
        { roomId },
        {
          value: updatedValue,
          $inc: { count: 1 },
        }
      );
    } else {
      const newRating = new Rating({
        roomId,
        value,
        count: 1,
      });

      await newRating.save();
    }

    res.status(201).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({ error: 'An error occurred while submitting the rating' });
  }
});

router.get("/fetchrating/:roomId" ,  async (req, res) => {
  try {
    const roomId = req.params.roomId; 
    const rating = await Rating.findOne({ roomId });

    if (rating) {
      res.status(200).json({ value: rating.value, count: rating.count });
    } else {
      res.status(200).json({ value: 0, count: 0 });
    }
  } catch (error) {
    console.error('Error fetching rating:', error);
    res.status(500).json({ error: 'An error occurred while fetching the rating' });
  }
});




module.exports = router;
