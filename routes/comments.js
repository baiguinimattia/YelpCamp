var express = require("express");
var router = express.Router();

var Campground = require("../models/campground"),
    Comment = require("../models/comment");

router.get("/campgrounds/:id/comments/new", isLoggedIn , function(req , res){
    Campground.findById(req.params.id , function(error , campground){
            if(error){
                    console.log(error);
            }
            else{
                    res.render("comments/new" , {campground:campground});
            }
    });
});

router.post("/campgrounds/:id/comments" , isLoggedIn , function(req , res){
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

router.get("/campgrounds/:id/comments/:comment_id/edit" , checkCommentOwnership , function(req , res){
        Comment.findById(req.params.comment_id , function(error , foundComment){
                if(error){
                        res.redirect("back");
                }
                else{
                        res.render("comments/edit" , {campground_id : req.params.id , comment: foundComment});
                }
        })
        
});


router.put("/campgrounds/:id/comments/:comment_id" , checkCommentOwnership , function( req , res){
        Comment.findByIdAndUpdate( req.params.comment_id , req.body.comment , function(error , updatedComment){
                if(error){
                        res.redirect("back");
                }
                else{
                        res.redirect("/campgrounds/" + req.params.id);
                }
        })
});

router.delete("/campgrounds/:id/comments/:comment_id" , checkCommentOwnership , function( req , res){
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

function checkCommentOwnership( req , res , next){
        if(req.isAuthenticated()){
                Comment.findById(req.params.comment_id , function(error , foundComment){
                        if( error){
                                console.log(error);
                                res.redirect("back");

                        }
                        else{
                                if(req.user._id.equals(foundComment.author.id)){
                                        next();
                                }
                                else{
                                        console.log("mars ma nu e al tau");
                                }
                        }
                });
        }
        else{
                res.redirect("back");
        }
};


function isLoggedIn(req , res , next){
    if(req.isAuthenticated()){
            return next();
    }
    res.redirect("/login");
};

module.exports = router;