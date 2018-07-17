var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/" , function ( req , res){
    res.render("landing");
});

//ROUTES for AUTHENTICATION

router.get("/register" , function(req , res){
    res.render("register");
});

router.post("/register" , function(req , res){
  var newUser =  new User({username:req.body.username});
  User.register(newUser , req.body.password , function(error , user){
            if(error){
                  console.log(error);
                  req.flash("error" , error.message);
                  res.redirect("back");
            }
            passport.authenticate("local")(req , res , function(){
                req.flash("success" , "You have registered succesfully!");
                 res.redirect("/campgrounds");
            })
  });
});


//login form

router.get("/login" , function(req , res){
    res.render("login");
});

router.post("/login" , passport.authenticate("local" , {successRedirect : "/campgrounds" , failureRedirect : "/Login"}), function(req , res ){

});


router.get("/logout" , function(req , res){
    req.logout();
    req.flash("error" , "Logged you out!");
    res.redirect("/campgrounds");
})

module.exports = router;