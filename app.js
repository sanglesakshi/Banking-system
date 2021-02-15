const { concatSeries } = require('async');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();
const User = require('./models/user');
const Transaction = require('./models/transaction');

const databaseConnnection = process.env.DATABASE_CONNECTION;
const mongoDB = databaseConnnection;
mongoose.connect("mongodb+srv://admin-sakshi:Sakshi2001@cluster0.kcw3k.mongodb.net/mongoDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

mongoose.set('useFindAndModify', false);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.render("index");
});

app.get("/allAccount", async (req, res)=>{
    const users = await User.find({})
    res.render("allAccount", {users});
});

app.get("/transfer/:id", async(req, res) =>{
    const { id } = req.params;
    const customer = await User.findById(id);
    const users = await User.find({})
    res.render("send", {customer, users});
});

app.get("/transfer/:id1/:id2", async(req, res) =>{
    const {id1, id2} = req.params;
    const fromUser = await User.findById(id1);
    const toUser = await User.findById(id2);
    res.render("form", {fromUser, toUser});
});

app.put("/transfer/:id1/:id2", async(req, res) =>{
    const {id1, id2} = req.params;
    const credit = parseInt(req.body.credit);
    const fromUser = await User.findById(id1);
    const toUser = await User.findById(id2);

    if(credit <= fromUser.credits && credit>0){

        let fromCreditsNew = fromUser.credits - credit;
        let toCreditsNew = parseInt(toUser.credits + credit);
        await User.findByIdAndUpdate(id1, {credits : fromCreditsNew}, { runValidators: true, new: true });
        await User.findByIdAndUpdate(id2, {credits : toCreditsNew}, { runValidators: true, new: true });

        let newTransaction = new Transaction();
        newTransaction.sendersName = fromUser.name;
        newTransaction.recieversName = toUser.name;
        newTransaction.amount = credit;
        await newTransaction.save();

        res.redirect("/allAccount");
    }
    else{
        res.render('error');
    }
});

app.get("/transactions", async(req, res)=>{
    const transactions = await Transaction.find({});
    res.render("transactions", {transactions});
});
app.listen(process.env.PORT || 3000, ()=>{
  console.log("SERVER STARTED !");
});
