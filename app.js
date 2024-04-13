if(process.env.NODE_ENV != "prduction"){
    require('dotenv').config()
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride= require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


//SETTING UP THE SERVER
const dbUrl = process.env.ATLASDB_URL;

async function  main(){
    await mongoose.connect( dbUrl);
}
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});

//ACCESSING EJS
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

//USING SESSIONS
const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24*3600,
    crypto: {
        secret: process.env.SECRET,
    },
});
store.on("error",(err)=>{
    console.log("ERROR IN MONGO SESSION STORE",err);
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//USING CONNECT-FLASH
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

//DEMO USER
app.get("/demouser", async(req,res)=>{
    let fakeUser = new User({
        email: "abc@gmail.com",
        username: "abc"
    });
    let registeredUser = await User.register(fakeUser,"password");
    res.send(registeredUser);
})

//USING ROUTES
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.get("/home",(req,res)=>{
    res.render("./listings/home.ejs");
});

//ERROR HANDLING MIDDLEWARES
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
});

app.use((err,req,res,next)=>{
    let{statusCode=500, message="Something went wrong!"} = err;
    res.status(statusCode).render("error.ejs",{message});
});

app.listen(8080, ()=>{
    console.log("Server is listening to port 8080.");
});
