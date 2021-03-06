var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");
middlewareObj.checkCampgroundOwnership = function(req , res , next){
            if(req.isAuthenticated()){
                    Campground.findById(req.params.id , function(error , foundCampground){
                            if(error){
                                    console.log(error);
                                    res.redirect("back");
                            }
                            else{
                                    if(foundCampground.author.id.equals(req.user._id)){
                                            next();
                                    }
                                    else{
                                            res.redirect("back");
                                    }
                                    
                            }
                        });
                }
                else{
                        res.redirect("back");
                }
};



middlewareObj.checkCommentOwnership = function( req , res , next){
    if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id , function(error , foundComment){
                    if( error){
                            console.log(error);
                            req.flash("error", "Campground not found");
                            res.redirect("back");

                    }
                    else{
                            if (!foundCampground) {
                                req.flash("error", "Item not found.");
                                return res.redirect("back");
                            }

                            if(req.user._id.equals(foundComment.author.id)){
                                    next();
                            }
                            else{
                                    req.flash("error", "You don't have permission to do that");
                            }
                        }
                });
        }
        else{
                req.flash("error", "You need to be logged in to do that");
                res.redirect("back");
        }
};

middlewareObj.isLoggedIn = function( req , res , next){
    if( req.isAuthenticated()){
        return next();
    }
    req.flash("error" , "You need to be logged in to do that.");
    res.redirect("/login");
}

module.exports = middlewareObj;