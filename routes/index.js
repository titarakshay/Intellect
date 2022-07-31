var express= require("express");
var dayjs=require("dayjs")
const reservation = require("../models/reservation");
const session = require("../models/session");
var router= express.Router();

router.post("/",async(req,res,next)=>{
    try {
        req.body.dateTime=dayjs(`${req.body.dateTime} ${req.body.slot}`).format("YYYY-MM-DD HH:mm");
        let isdateTimeValid= dayjs(req.body.dateTime, 'YYYY-MM-DD HH:mm', true).isValid(); 
        if(!isdateTimeValid){
        res.status(200).json("Please enter Valid Date")
        }
    // req.body.date=new Date(req.body.date).toDateString()
    let minuteTime=dayjs(req.body.dateTime).get('minute')
    let slotTIme;
    if(minuteTime >15 && minuteTime<45){
        slotTIme=dayjs(req.body.dateTime).minute(30)
        req.body.dateTime=slotTIme
    }else{
        if(minuteTime <15){
            slotTIme=dayjs(req.body.dateTime).minute(00)
            req.body.dateTime=slotTIme

        }else{
            slotTIme=dayjs(req.body.dateTime).minute(60)
            req.body.dateTime=slotTIme

        }
        
    }

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
    let reservationsData=reservations.map(val=>{
           val.dateTime=new Date(val.dateTime).toLocaleDateString()
           let slot =new Date(val.dateTime).toLocaleTimeString()
           console.log(val.dateTime,slot,"value");
           return val    
    })
    res.status(201).json(reservationsData)

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
// {
//     title: 'Mental-Health',
//     sections: [ { content: [Array] }, { quetions: [Array] } ]
//   }

router.post("/session",async (req,res,next)=>{
    try {
        let {title}=req.body
        let {sections: {content,quetions}}=req.body;
        console.log(title,content,quetions,"data");
        let ischeckSession=session.find({title:req.body.title})
       
        let newSession=await session.create(req.body)
        console.log(newSession,"session");
        res.status(201).json(newSession)

    } catch (error) {
        next(error)
    }
})
module.exports=router;

// imp notes
// new Date("12-07-2022").toDateString()
// {"$gte": new Date(2012, 7, 14), "$lt": new Date(2012, 7, 15)}

// let pastDatetime=dayjs(req.body.dateTime).minute(-pastTime)
//     console.log(pastDatetime,"pastDatetime");
//     let newTime=dayjs(req.body.dateTime).get('minute')+30
//     // console.log;
//     let fututeDatetime=dayjs(req.body.dateTime).minute(newTime)
//     console.log(new Date(fututeDatetime),"fututeDatetime");
//     console.log(new Date(pastDatetime),"time");
// if(minuteTime <=30){
//     let bufferTime=30-minuteTime
//     if(bufferTime <15 ){
//         let newTime=dayjs(req.body.dateTime).get('minute')+bufferTime
//         console.log(newTime,"00");
//         prevSlotTime= dayjs(req.body.dateTime).minute(newTime-30)
//         nextSlotTime=dayjs(req.body.dateTime).minute(newTime)
//         console.log(prevSlotTime,"prev",nextSlotTime,"next");
//     }else{
//         let newTime=dayjs(req.body.dateTime).get('minute')+bufferTime
//         console.log(newTime,"30");
//         prevSlotTime= dayjs(req.body.dateTime).minute(newTime-30)
//         nextSlotTime=dayjs(req.body.dateTime).minute(newTime)
//         console.log(prevSlotTime,"prev",nextSlotTime,"next");

//     }
    
// }else{
//  let bufferTime=60-minuteTime
//  console.log(bufferTime,"buffer");
//  if(bufferTime <15 ){
//     let newTime=dayjs(req.body.dateTime).get('minute')+bufferTime
//     console.log(newTime,"00");
//     prevSlotTime= dayjs(req.body.dateTime).minute(newTime-30)
//     nextSlotTime=dayjs(req.body.dateTime).minute(newTime)
//     console.log(prevSlotTime,"prev",nextSlotTime,"next");
// }else{
//     let newTime=dayjs(req.body.dateTime).get('minute')+bufferTime
//     console.log(newTime,"30");
//     prevSlotTime= dayjs(req.body.dateTime).minute(newTime-30)
//     nextSlotTime=dayjs(req.body.dateTime).minute(newTime)
//     console.log(prevSlotTime,"prev",nextSlotTime,"next");

// }}

    // let checkReservations=await reservation.find({dateTime:{"$gte": new Date(prevSlotTime), "$lt": new Date(nextSlotTime)}})
