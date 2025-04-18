const mongoose = require("mongoose");
let express = require('express');
let app = express();

module.exports = app;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create default instance
const createAndSavePerson = (done) => {
    var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});
  
    janeFonda.save(function(err, data) {
      if (err) return console.error(err);
      done(null, data)
    });
  };

// Create many people with array of objects
  let arrayOfPeople = [
    {name: 'Murilo', age: 22, favoriteFoods: ['cheese', 'meat']},
    {name: 'Ojuara', age: 60, favoriteFoods: ['pork', 'salad']}
  ];
  const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, function (err, people) {
      if (err) return console.log(err);
      done(null, people);
    });
  };

// Find all people with a certain name
let personName = 'Murilo';
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data){
    if (err) return console.error(err);
    done(null, data)
  })
};

// If you dont pass the callback for the find method, it will return a Query object. You can use the exec method to execute the query and get the result as a promise.
const queryChain = (done) => {
    const foodToSearch = "burrito";

    // the find method returns a Query object, so you can chain methods on it!
    var findQuery = Person.find({favoriteFoods: foodToSearch})
                    .sort({name: 1}) // 1 is ascending, -1 is descending
                    .limit(2)
                    .select('name'); // select only the name field

    // the .exec method executes the query returning an array of documents!
    findQuery.exec(function(err, data){
        done(null /*, data*/);
    });

    // Or, you can use the .then method to handle the result as a Promise.
    // findQuery.exec.then(function(data){
    //     console.log(data);
    // });

    query.sort({name: 1}).limit(2).select('-age');
};

// Find one(first) person with a certain food
// see the search options here: https://mongoosejs.com/docs/api.html#model_Model.findOne
let food = 'meat';
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data){
    if (err) console.error(err);
    done(null, data);
  })
};

// Find one person with a certain id
// see the search options here: https://mongoosejs.com/docs/api.html#model_Model.findById
let personId = 1
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data){
    if (err) console.error(err);
    done(null, data);
  });
};

// Update a person's and returning the updated document:
const findEditThenSave = (personId, done) => {
    const foodToAdd = 'hamburger';
    
    Person.findById(personId, (err, person) => {
        if(err) return console.log(err); 
        
        person.favoriteFoods.push(foodToAdd);
        
        person.save((err, updatedPerson) => {
            if(err) return console.log(err);
            done(null, updatedPerson)
        })
    })
};

// the model.update() method works as well, but it doesn't return the updated document
// this method returns the unmodified document, so you have to set the new option to true on the third argument to return the updated version.
const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
    Person.findByIdAndUpdate({name: personName}, function(err, data){
      data.age = 20
      done(null, data);
    }, {new: 1} )
};

const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, function(err, data){
      if (err) console.error(err)
  
      done(null ,data);
    })
  };
  
  const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.remove({name: nameToRemove}, function(err, data){
      if (err) console.error(err)
      done(null, data);
    });
  };