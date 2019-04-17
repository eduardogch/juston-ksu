const mongoose = require('mongoose');
//specify where to find the schema
const Student = require('./models/student')
// connect and display the status

mongoose.connect('mongodb://localhost:27017/IT6203', { useNewUrlParser: true })
  .then(() => { console.log("connected"); })
  .catch(() => { console.log("error connecting"); });

const express = require('express');
const app = express();
const bodyParser  = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// use the following code on any request that matches the specified mount path
app.use((req, res, next) => {
   console.log('This line is always called');
   res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE'); //allowable methods
   res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
   next();
});
app.get('/students', (req, res, next) => {
  //const students = [
  //   { "id": "1", "ResponseType": "Food", "Feeling": "Happy", "FoodType": "Protein", "FoodName": "BBQ Chicken"},
  //   { "id": "2", "ResponseType": "Food", "Feeling": "Sad", "FoodType": "Protein", "FoodName": "Nuts"},
  //   { "id": "3", "ResponseType": "Food", "Feeling": "Angry", "FoodType": "Protein", "FoodName": "Hot Wings"},
  //   { "id": "4", "ResponseType": "Food", "Feeling": "Proud", "FoodType": "Protein", "FoodName": "Burger"},
  //   { "id": "5", "ResponseType": "Food", "Feeling": "Stressed", "FoodType": "Protein", "FoodName": "Steak"},
  //   { "id": "6", "ResponseType": "Food", "Feeling": "Happy", "FoodType": "Fruit", "FoodName": "Strawberries"},
  //   { "id": "7", "ResponseType": "Food", "Feeling": "Sad", "FoodType": "Fruit", "FoodName": "Cherries"},
  //   { "id": "8", "ResponseType": "Food", "Feeling": "Angry", "FoodType": "Fruit", "FoodName": "Apple"},
  //   { "id": "9", "ResponseType": "Food", "Feeling": "Proud", "FoodType": "Fruit", "FoodName": "Grapes"},
  //   { "id": "10", "ResponseType": "Food", "Feeling": "Stressed", "FoodType": "Fruit", "FoodName": "Fruit Smoothie"},
  //   { "id": "11", "ResponseType": "Food", "Feeling": "Happy", "FoodType": "Vegetable", "FoodName": "Brussel Sprouts"},
  //   { "id": "12", "ResponseType": "Food", "Feeling": "Sad", "FoodType": "Vegetable", "FoodName": "Spinach"},
  //   { "id": "13", "ResponseType": "Food", "Feeling": "Angry", "FoodType": "Vegetable", "FoodName": "Pickle"},
  //   { "id": "14", "ResponseType": "Food", "Feeling": "Proud", "FoodType": "Vegetable", "FoodName": "Spinach"},
  //   { "id": "15", "ResponseType": "Food", "Feeling": "Stressed", "FoodType": "Vegetable", "FoodName": "Vegetable Smoothie"},
  //   { "id": "16", "ResponseType": "Food", "Feeling": "Happy", "FoodType": "Carb", "FoodName": "Mac N Cheese"},
  //   { "id": "17", "ResponseType": "Food", "Feeling": "Sad", "FoodType": "Carb", "FoodName": "Mashed Potatoes"},
  //   { "id": "18", "ResponseType": "Food", "Feeling": "Angry", "FoodType": "Carb", "FoodName": "Crackers"},
  //   { "id": "19", "ResponseType": "Food", "Feeling": "Proud", "FoodType": "Carb", "FoodName": "Loaded Potato"},
  //   { "id": "20", "ResponseType": "Food", "Feeling": "Stressed", "FoodType": "Carb", "FoodName": "Potato Chips"},
  //   { "id": "21", "ResponseType": "Food", "Feeling": "Happy", "FoodType": "Dessert", "FoodName": "Apple Crumble w/ Ice Cream"},
  //   { "id": "22", "ResponseType": "Food", "Feeling": "Sad", "FoodType": "Dessert", "FoodName": "Chocolate Strawberries"},
  //   { "id": "23", "ResponseType": "Food", "Feeling": "Angry", "FoodType": "Dessert", "FoodName": "Chocoloate Fudge Cake"},
  //   { "id": "24", "ResponseType": "Food", "Feeling": "Proud", "FoodType": "Dessert", "FoodName": "Carrot Cake"},
  //   { "id": "25", "ResponseType": "Food", "Feeling": "Stressed", "FoodType": "Dessert", "FoodName": "Blueberry Muffin"}
  // ];
//send the array as the response
   //res.json(students);
  //call mongoose method find (MongoDB db.Students.find())
  Student.find()
    //if data is returned, send data as a response
    .then(data => res.status(200).json(data))
    //if error, send internal server error
    .catch(err => {
    console.log('Error: ${err}');
    res.status(500).json(err);
  });

});



// serve incoming post requests to /students
app.post('/students', (req, res, next) => {
    // create a new student variable and save request’s fields
    const student = new Student({
      Feeling: req.body.Feeling,
      FoodName: req.body.FoodName
    });
    //send the document to the database
    student.save()
      //in case of success
      .then(() => { console.log('Success');})
      //if error
      .catch(err => {console.log('Error:' + err);});

    // const student = req.body;
    // console.log(student.Feeling + " " + student.Food);
    // //sent an acknowledgment back to caller
    // res.status(201).json('Post successful');
  });

//:id is a dynamic parameter that will be extracted from the URL
app.delete("/students/:id", (req, res, next) => {
  Student.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json("Deleted!");
  });
});

app.listen(8000,()=>console.log('Server started at port:8000'));

//to use this middleware in other parts of the application
module.exports=app;
