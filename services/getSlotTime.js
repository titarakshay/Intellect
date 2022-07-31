var dayjs=require("dayjs")

function getSlotTime(dateTime){
    let minuteTime=dayjs(dateTime).get('minute')
    if(minuteTime >15 && minuteTime<45){
        slotTIme=dayjs(dateTime).minute(30)
        return slotTIme
    }else{
        if(minuteTime <=15){
            slotTIme=dayjs(dateTime).minute(00)
            return slotTIme
    
        }else{
            slotTIme=dayjs(dateTime).minute(60)
            return slotTIme
    
        }
        
    }}

module.exports=getSlotTime