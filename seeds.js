var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment  = require("./models/comment");

var data = [
    {
        name : "Cloud's Rest",
        image : "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350",
        description : "Lorem Ipsum este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective. Nu doar că a supravieţuit timp de cinci secole, dar şi a facut saltul în tipografia electronică practic neschimbată. A fost popularizată în anii '60 odată cu ieşirea colilor Letraset care conţineau pasaje Lorem Ipsum, iar mai recent, prin programele de publicare pentru calculator, ca Aldus PageMaker care includeau versiuni de Lorem Ipsum."
    },
    {
        name : "Desert Sahara",
        image : "https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&h=350",
        description : "Lorem Ipsum este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective. Nu doar că a supravieţuit timp de cinci secole, dar şi a facut saltul în tipografia electronică practic neschimbată. A fost popularizată în anii '60 odată cu ieşirea colilor Letraset care conţineau pasaje Lorem Ipsum, iar mai recent, prin programele de publicare pentru calculator, ca Aldus PageMaker care includeau versiuni de Lorem Ipsum."
    },
    {
        name : "Canyon Floor",
        image : "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&h=350",
        description : "Lorem Ipsum este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective. Nu doar că a supravieţuit timp de cinci secole, dar şi a facut saltul în tipografia electronică practic neschimbată. A fost popularizată în anii '60 odată cu ieşirea colilor Letraset care conţineau pasaje Lorem Ipsum, iar mai recent, prin programele de publicare pentru calculator, ca Aldus PageMaker care includeau versiuni de Lorem Ipsum."
    }

];


function seedDB(){
    Campground.remove({} , function(error){
        if(error){
            console.log(error);
        }   
        else{
            console.log("Removed Campgrounds")
            data.forEach(function(seed){
                Campground.create(seed , function(error , campground){
                    if(error){
                        console.log(error);
                    }
                    else{
                        console.log("Added a campground");
                        Comment.create({
                            text: "This place is great",
                            author : "Homer"
                        } , function(error , comment){
                            if(error){
                                console.log(error);
                            }
                            else{
                                // console.log(comment);
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                            
                        })
                    }
                })
            });
        }
    });


}

module.exports = seedDB;