var express= require("express");
var dayjs=require("dayjs")
const reservation = require("../models/reservation");
const session = require("../models/session");
let getSlotTime=require("../services/getSlotTime")
var router= express.Router();

router.post("/",async(req,res,next)=>{
    try {
        req.body.dateTime=dayjs(`${req.body.dateTime} ${req.body.slot}`).format("YYYY-MM-DD HH:mm");
        let isdateTimeValid= dayjs(req.body.dateTime, 'YYYY-MM-DD HH:mm', true).isValid(); 
        if(!isdateTimeValid){
        res.status(200).json("Please enter Valid Date")
        }
    let slotTIme=await getSlotTime(req.body.dateTime)
    req.body.dateTime=slotTIme
    let ischeckReservations=await reservation.find({dateTime:slotTIme})
    if(ischeckReservations.length===0){
        let booking= await reservation.create(req.body)
        res.status(201).json(`Your ${booking.customerName} reservation done successfully on ${new Date(booking.dateTime).toLocaleString()}`)
    }
    else if(ischeckReservations){
        res.status(201).json("Table is already booked. pLease pick another time (after 30 minutes)")
    }else{
        console.log("something went wrong");
    }

} catch (error) {
    console.log("error check logs");
        next(error)
}
})
router.get("/",async(req,res,next)=>{
    let reservations=await reservation.find()
    // let reservationsData=reservations.map(val=>{
    //     val.dateTime=new Date(val.dateTime).toLocaleDateString() +" "+new Date(val.dateTime).toLocaleTimeString()
    //     return val
    // })
    res.status(201).json(reservations)

})
router.delete("/",async(req,res,next)=>{
try {
    req.body.dateTime=dayjs(`${req.body.dateTime}`).format("YYYY-MM-DD HH:mm");
    let isdateTimeValid= dayjs(req.body.dateTime, 'YYYY-MM-DD HH:mm', true).isValid(); 
    if(!isdateTimeValid){
        res.status(200).json("Please enter Valid Date")
    }
    let ischeckReservations=await reservation.findOneAndDelete({dateTime:new Date(req.body.dateTime)})
    if(ischeckReservations){
        res.status(203).json(`${ischeckReservations} Deleted successfully`)
    }else{
        res.status(200).json("No reservation was found")

    }

} catch (error) {
    next(error)
}

})

router.post("/session",async (req,res,next)=>{
    try {
            let newSession=await session.create(req.body)
            console.log(newSession,"session");
            res.status(201).json(newSession)
    } catch (error) {
        next(error)
    }
})


module.exports=router;
