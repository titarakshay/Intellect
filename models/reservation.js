var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var reservationSchema = new Schema(
  {
    customerName:{
      type:String,
      required:true
    },
    dateTime:{
      type:Date,
      required:true
    },
    
    contact:Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
