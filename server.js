const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongo = require('./mongo');
const { User } = require('./schema');
const mongoose = require('mongoose');
const { render } = require('ejs');
const db = mongo.db;
const port = 8080;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    if (req.query.code === '1') {
        res.render('login', { checkUser: 'Incorrect username or password' });
    } else {
        res.render('login', { checkUser: '' });
    }
});

app.post('/login', async (req, res) => {
    const exists = await db.userExists({ username: req.body.username });
    if (exists.username) {
        const userID = await db.getUserID(req.body.username);
        const user = await db.getUser(userID);
        if (user.password !== req.body.password) {
            res.redirect('/?code=1');
        } else {
            res.redirect(`/account?id=${userID}&code=0`);
        }
    } else {
        res.redirect('/?code=1');
    }
});

app.get('/signup', (req, res) => {
    const code = req.query.code;
    if (code === '1') {
        res.render('signup', { checkUser: 'Username already exists' });
    } else if (code === '2') {
        res.render('signup', { checkUser: 'Email already exists' });
    } else {
        res.render('signup', { checkUser: '' });
    }
});

app.post('/createAccount', async (req, res) => {
    const exists = await db.userExists({ username: req.body.username, email: req.body.email });
    if (exists.username) {
        res.redirect('/signup?code=1');
    } else if (exists.email) {
        res.redirect('/signup?code=2');
    } else {
        db.createUser(req.body);
        res.redirect('/');
    }
});

app.get('/account', async (req, res) => {
    const account = await db.getUser(req.query.id);
    if (account === null) {
        res.redirect('/error', {content: 'Not Found', code: 404});
    } else {
        const code = req.query.code;
        if (code === '1') {
            res.render('account', {
                username: account.username,
                password: account.password,
                email: account.email,
                state: account.state,
                zip: account.zip,
                checkUser: 'Username already exists',
                currentUser: req.query.id
            });
        } else if (code === '2') {
            res.render('account', {
                username: account.username,
                password: account.password,
                email: account.email,
                state: account.state,
                zip: account.zip,
                checkUser: 'Email already exists',
                currentUser: req.query.id
            });
        } else {
            res.render('account', {
                username: account.username,
                password: account.password,
                email: account.email,
                state: account.state,
                zip: account.zip,
                checkUser: '',
                currentUser: req.query.id
            });
        }
    }
});

app.post('/save', async (req, res) => {
    const userID = req.query.id;
    const exists = await db.userExists({ username: req.body.username, email: req.body.email }, { exclude: true, id: userID });
    if (exists.username) {
        res.redirect(`/account?id=${userID}&code=1`);
    } else if (exists.email) {
        res.redirect(`/account?id=${userID}&code=2`);
    } else {
        await db.updateUser(req.body, userID);
        res.redirect(`/account?id=${userID}&code=0`);
    }
});

app.post('/delete', (req, res) => {
    db.deleteUser(req.query.id);
    res.redirect('/');
});

app.get('/error', (req, res) => {
    res.render('error', {content: req.query.content, code: req.query.code});
});

app.get('/admin', (req, res) => {
    res.render('admin', {
        id: '',
        username: '',
        email: '',
        password: '',
        state: '',
        zip: ''
    });
});

app.get('/search', async (req, res) => {
    const userInfo = await db.searchUser(req.query.search, req.query.filter);
    if (userInfo === null) {
        res.redirect('/error?code=404&content=User Not Found');
    }
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Listening on port ${port}`);
});