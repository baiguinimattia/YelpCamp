var express = require("express");
var router = express.Router();

var Campground = require("../models/campground"),
    middleware = require("../middleware/index.js");


router.get("/campgrounds" , function( req , res){

    Campground.find({} , function(error , campgrounds){
            if(error){
                    console.log(error);
            }
            else{
                    res.render("campgrounds/index" , { campgrounds : campgrounds , currentUser : req.user});
            }
    });
});

router.post("/campgrounds" , middleware.isLoggedIn , function( req , res){
    var name = req.body.name;
    var price = req.body.price
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id : req.user._id,
        username : req.user.username
    };
    var newCampground = {name:name , price : price , image:image , description: description , author : author}
    Campground.create(newCampground,function( error, newCampground){
            if(error){
                    console.log(errpr);
            }
            else{
                    req.flash("success" , "The new Campground was created.");
                    res.redirect("/campgrounds");
            }
    });
    
});



router.get("/campgrounds/new" , middleware.isLoggedIn ,  function( req, res){
    res.render("campgrounds/new.ejs");
});

router.get("/campgrounds/:id" , function( req , res){
    var currentID = req.params.id;
    Campground.findById(currentID).populate("comments").exec(function( error , foundCampground){
            if(error){
                    console.log(error);
            }
            else{
                   if (!foundCampground) {
                        req.flash("success" , "The Campground was not found.");
                        res.redirect("back")
                    }
                    res.render("campgrounds/show" , {campground : foundCampground});
            }
    });

});


//edit campground route

router.get("/campgrounds/:id/edit" ,middleware.checkCampgroundOwnership ,  function( req , res){
                Campground.findById(req.params.id , function(error , foundCampground){
                                        res.render( "campgrounds/edit" , {campground : foundCampground});

                });
        });                

//update campground route

router.put("/campgrounds/:id" , middleware.checkCampgroundOwnership ,function(req , res){
        //find and update the correct campground 
        //redirect to show page

        Campground.findByIdAndUpdate( req.params.id , req.body.campground , function( error , updatedCampground){
                if ( error){
                        console.log(error);
                }
                else{
                        req.flash("success" , "The Campground was succesfully edited.");
                        res.redirect("/campgrounds/" + req.params.id);
               }
        });
});

router.delete("/campgrounds/:id"  , middleware.checkCampgroundOwnership , function( req , res){
        Campground.findByIdAndRemove( req.params.id , function( error){
                if(error){
                        console.log(error);
                        res.redirect("/campgrounds");
                }
                else{
                        req.flash("success" , "The Campground was succesfully deleted.");
                        res.redirect("/campgrounds");
                }
        });
});

router.get("/campgrounds/*" , function(req , res){
        res.redirect("/campgrounds");
})

module.exports = router;