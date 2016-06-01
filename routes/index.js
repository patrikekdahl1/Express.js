var express = require('express');
var router = express.Router();

 //GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Yolo Boys Boyband' });
});

//GET Userlist page
router.get('/person', function(req, res, next) {
    var db = req.db;
    var collection = db.get('peoplecollection');
    collection.find({},{},function(e,docs){
        res.render('person', {
            "person" : docs
        });
    });
});

//POST Add Person to db
router.post('/addperson', function(req, res) {
    console.log("HEJ")

    var db = req.db;

    var fName = req.body.fName;
    var lName = req.body.lName;

    var collection = db.get('peoplecollection');

    collection.insert({
        "fName" : fName,
        "lName" : lName,
        "fullName": fName + " " + lName
    }, function (err, doc) {
        if (err) {
            res.send("Ops, något gick snett med databasen!");
        }
        else {
            res.redirect("person");
        }
    });
});

router.get('/searchperson', function(req, res){
    var query = req.query.name;
    var regex = new RegExp("^" + query.toLowerCase(), "i");

    var db = req.db;
    var collection = db.get('peoplecollection');

    collection.find({$or: [ { fName: regex }, { lName: regex }, {fullName : regex } ]}
        , function(e, docs){
        res.send(docs);
    });
});

module.exports = router;
