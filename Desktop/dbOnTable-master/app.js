const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const api = require('./routes/api');

//database
const db = require('./config/database')


//test db
db.authenticate()
    .then(() =>  console.log('database connected...'))
    .catch(err => console.log(err))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//view engine
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.use('/', api);




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});