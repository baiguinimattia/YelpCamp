var express = require("express");
var router = express.Router();

var Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware/index.js");

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn , function(req , res){
    Campground.findById(req.params.id , function(error , campground){
            if(error){
                    console.log(error);
            }
            else{
                    res.render("comments/new" , {campground:campground});
            }
    });
});

router.post("/campgrounds/:id/comments" , middleware.isLoggedIn , function(req , res){
    Campground.findById( req.params.id , function(error , campground){
            if(error){
                    console.log(error);
                    res.redirect("/campgrounds");
            }
            else{
                    Comment.create(req.body.comment , function(error , comment){
                            if(error){
                                    console.log(error);
                            }
                            else{
                                    comment.author.id = req.user._id;
                                    comment.author.username = req.user.username;

                                    comment.save();

                                    
                                    campground.comments.push(comment);
                                    campground.save();
                                    res.redirect("/campgrounds/" + campground._id);
                            }
                    });
            }
    });
});

router.get("/campgrounds/:id/comments/:comment_id/edit" , middleware.checkCommentOwnership , function(req , res){
        Comment.findById(req.params.comment_id , function(error , foundComment){
                if(error){
                        res.redirect("back");
                }
                else{
                        res.render("comments/edit" , {campground_id : req.params.id , comment: foundComment});
                }
        })
        
});


router.put("/campgrounds/:id/comments/:comment_id" , middleware.checkCommentOwnership , function( req , res){
        Comment.findByIdAndUpdate( req.params.comment_id , req.body.comment , function(error , updatedComment){
                if(error){
                        res.redirect("back");
                }
                else{
                        res.redirect("/campgrounds/" + req.params.id);
                }
        })
});

router.delete("/campgrounds/:id/comments/:comment_id" , middleware.checkCommentOwnership , function( req , res){
        Comment.findByIdAndRemove(req.params.comment_id , function(error){
                if(error){
                        console.log(req.params.comment_id);
                        res.redirect("back");
                }
                else{
                        res.redirect("/campgrounds/" + req.params.id);
                }
        });
});

module.exports = router;