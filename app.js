// - require in express, hbs, mongoose, & body-parser 
// - use mongoose to connect to your database (create a new DB for this project)

const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/fish-app');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));

const fishSchema = new Schema({
    type: String,
    favoriteFood: String
});

const Fish = mongoose.model('Fish', fishSchema);

app.get('/fishes', (req, res, next) => {
    Fish.find()
        .then((listOfFish) => {
            res.render('fishes', { fishArray: listOfFish });
        })
        .catch((err) => {
            red.send(err);
        });
});

app.get('/fishes/:id', (req, res, next) => {
    const theID = req.params.id;

    Fish.findById(theID)
        .then((theFish) => {
            res.render('singleFish', { fish: theFish });
        })
        .catch((err) => {
            res.send(err);
        });
});

app.get('/', (req, res, next) => {
    res.render('index'); 
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
