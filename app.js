var  express = require("express"),
     app = express(),
     bodyParser = require("body-parser"),
     mongoose = require("mongoose"),
     Campground = require("./models/campground"),
     Comment = require("./models/comment"),
     passport = require("passport"),
     localStrategy = require("passport-local"),
     User = require("./models/user"),
     seedDB = require("./seeds"),
     methodOverride = require("method-override"),
     flash = require("connect-flash");

var     commentRoutes = require("./routes/comments"),
     campgroundRoutes = require("./routes/campgrounds")    ,
           authRoutes = require("./routes/index");


mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });  
app.use(bodyParser.urlencoded({ extended : true}));
app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


// seedDB();

//PASSPORT config

app.use(require("express-session")({
        secret : "The jungle is mine",
        resave: false,
        saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req , res , next){
        res.locals.currentUser = req.user;
        res.locals.error = req.flash("error");
        res.locals.success = req.flash("success");
        next();
});

//ROUTES

app.use(authRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);


app.listen(3000 , function(){
     console.log("Server is listening");
});