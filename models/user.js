const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        min: 0,
        required: true
    }
});



const User = mongoose.model('User', userSchema);

const customer1 = new User({
  name:"John clark",
  email:"johnclark12@gmail.com",
  credits:25000
});

const customer2 = new User({
  name:"Smith watson",
  email:"smitwatson123@gmail.com",
  credits:50000
});
const customer3 = new User({
  name:"Rani jha",
  email:"ranijha1234@gmail.com",
  credits:100000
});
const customer4 = new User({
  name:"Ram mewada",
  email:"rammewada@gmail.com",
  credits:26000
});
const customer5 = new User({
  name:"Sai sonar",
  email:"saisonar12@gmail.com",
  credits:31000
});
const customer6 = new User({
  name:"Daniel Rose",
  email:"daniel12@gmail.com",
  credits:12000
});
const customer7 = new User({
  name:"Anu mishra",
  email:"anumishra@gmail.com",
  credits:23000
});
const customer8 = new User({
  name:"Radha sonawane",
  email:"radhasonawane@gmail.com",
  credits:20000
});
const customer9 = new User({
  name:"Sushant patil",
  email:"sushantpatil@gmail.com",
  credits:35000
});
const customer10 = new User({
  name:"Johny watt",
  email:"johnywatt@gmail.com",
  credits:15000
});
const defaultcustomers = [customer1,customer2,customer3,customer4,customer5,customer6,customer7,customer8,customer9,customer10];
User.find({},function(err, foundItem){
  if (foundItem.length===0) {
    User.insertMany(defaultcustomers, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("succesfully added default items");
      }
    });
  }
});
module.exports = User;
