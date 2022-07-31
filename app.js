// requires
var express=require("express");
// var User=require("./models/user");
var mongoose=require("mongoose")
// require routerfile
var indexRouter=require("./routes/index");
const dbConnection=`mongodb+srv://akshaytitar:BulletAt19@cluster0.1ewh1.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(
    dbConnection,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      console.log("connected", err ? err : true);
    }
  );

var app= express();
// http://127.0.0.1:5500'
// middelewares required
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// routing middlewares
app.use("/",indexRouter); 



// error handler 
// 404
app.use((req,res)=>res.status(404).send("Page Not Found"))

// client or server error
app.use((err,req,res,next)=>{
    // res.status(400).json({error:err.message})
    console.log(err)
    if(err.name=="ValidationError"){
       return res.status(400).json({error:err.message})
    }
    res.status(500).json({err})
})
// listner
app.listen(3000,()=>console.log("Server has Started on 3000"))



