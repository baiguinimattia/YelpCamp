var express = require("express");
var router = express.Router();

var Campground = require("../models/campground");

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

router.post("/campgrounds" , isLoggedIn , function( req , res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id : req.user._id,
        username : req.user.username
    };
    var newCampground = {name:name , image:image , description: description , author : author}
    Campground.create(newCampground,function( error, newCampground){
            if(error){
                    console.log(errpr);
            }
            else{
                    res.redirect("/campgrounds");
            }
    });
    
});



router.get("/campgrounds/new" , isLoggedIn ,  function( req, res){
    res.render("campgrounds/new.ejs");
});

router.get("/campgrounds/:id" , function( req , res){
    var currentID = req.params.id;
    Campground.findById(currentID).populate("comments").exec(function( error , foundCampground){
            if(error){
                    console.log(error);
            }
            else{
                    res.render("campgrounds/show" , {campground : foundCampground});
            }
    });

});


//edit campground route

router.get("/campgrounds/:id/edit" , isLoggedIn , function( req , res){
        Campground.findById(req.params.id , function(error , foundCampground){
                if(error){
                        console.log(error);
                        res.redirect("/campgrounds");
                }
                else{
                        res.render( "campgrounds/edit" , {campground : foundCampground});
                }
        });
        
});

//update campground route

router.put("/campgrounds/:id" , isLoggedIn ,function(req , res){
        //find and update the correct campground 
        //redirect to show page

        Campground.findByIdAndUpdate( req.params.id , req.body.campground , function( error , updatedCampground){
                if ( error){
                        console.log(error);
                }
                else{
                        res.redirect("/campgrounds/" + req.params.id);
               }
        });
});

router.delete("/campgrounds/:id"  , isLoggedIn , function( req , res){
        Campground.findByIdAndRemove( req.params.id , function( error){
                if(error){
                        console.log(error);
                        res.redirect("/campgrounds");
                }
                else{
                        res.redirect("/campgrounds");
                }
        });
});

function isLoggedIn(req , res , next){
    if(req.isAuthenticated()){
            return next();
    }
    res.redirect("/login");
};

function isAuthor( req , res , next){
       console.log(req.body) ;
       return next();
}

module.exports = router;