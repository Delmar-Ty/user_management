const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    res.redirect('/account');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/createAccount', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

app.get('/account', (req, res) => {
    res.render('account');
});

app.post('/save', (req, res) => {
    res.redirect('/account');
});

app.post('/delete', (req, res) => {
    res.redirect('/');
});

app.get('/error', (req, res) => {
    res.render('error', {content: "An Error Ocurred", code: 404});
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Listening on port ${port}`);
});