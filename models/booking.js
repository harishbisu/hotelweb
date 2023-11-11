const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    room: {
        type: String,
        required: true
      },
      roomid : {
        type: String,
        required: true
      },
      user_id: {
        type: String,
        required: true
      },
      fromdate: {
        type: String,
        required: true
      },
      todate: {
        type: String,
        required: true
      },
      totalamount: {
        type: Number,
        required: true
      },
      totaldays: {
        type: Number,
        required: true
      },
      transactionId: {
        type: String,
        required: true
      },
      status: {
        type : String,
        required: true,
        default:'booked'
      },
      rating:{
        type: Number,
        default:0
      }
},{timestamps : true,})

const bookingModel = mongoose.model('bookings',bookingSchema);

module.exports=bookingModel;