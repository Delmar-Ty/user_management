const { resolveInclude } = require('ejs');
const mongoose = require('mongoose');
const { User } = require('./schema');
const URL = 'mongodb://localhost:27017/test';

const db = {
    createUser: function(data) {
        mongoose.connect(URL, (err) => {
            if (err) throw err;
            try {
                const doc = new User({
                    username: data.username,
                    password: data.password,
                    email: data.email,
                    state: data.state,
                    zip: data.zip
                });
                
                doc.save((err) => {
                    if (err) throw err;
                    db.disconnectDB();
                });
            } catch (error) {
                throw error;
            } 
        }); 
    },
    updateUser: function(data, userID) {
        const promise = new Promise((res, rej) => {
            mongoose.connect(URL, (err) => {
                if (err) throw err;
                try {
                    User.findByIdAndUpdate(userID, {
                        username: data.username,
                        password: data.password,
                        email: data.email,
                        state: data.state,
                        zip: data.zip
                    }, (err) => {
                        if (err) throw err;
                        mongoose.connection.close();
                        res();
                    });
                } catch (error) {
                    throw error;
                }
            });
        });
        return promise;
    },
    deleteUser: function(id) {
        try {
            User.findByIdAndDelete(id, (err) => {
                if (err) throw err;
            });
        } catch (error) {
            throw error;
        }
    },
    getUser: function(id) {
        try {
            const promise = new Promise((res, rej) => {
                mongoose.connect(URL, (err) => {
                    if (err) throw err;
                    User.findById(id, (err, doc) => {
                        if (err) throw err;
                        db.disconnectDB();
                        res(doc);
                    });
                });
            });
            return promise;
        } catch (error) {
            throw error;
        }
    },
    getUserID: function(userName) {
        try {
            const promise = new Promise((res, rej) => {
                mongoose.connect(URL, (err) => {
                    if (err) throw err;
                    User.findOne({ username: userName }, (err, doc) => {
                        if (err) throw err;
                        db.disconnectDB();
                        res(doc._id.toString());
                    });
                });
            });
            return promise;
        } catch (error) {
            throw error;
        }

    }, 
    userExists: function(data, options = { exclude: false, id: '' }) {
        try {
            const query = (!options.exclude)? { $or: [{username: data.username}, {email: data.email}] }: { $and: [{ $or: [{username: data.username}, {email: data.email}] }, {_id: { $nin: [options.id] }}] };
            const promise = new Promise((res, rej) => {
                mongoose.connect(URL, (err) => {
                    User.findOne(query, (err, doc) => {
                        if (err) throw err;
                        if (doc) {
                            const user = (doc.username === data.username)? true: false;
                            const email = (doc.email === data.email)? true: false;
                            res({ username: user, email: email });
                        } else {
                            res({ username: false, email: false });
                        }
                        db.disconnectDB();
                    });
                });
            });
            return promise;
        } catch (error) {
            throw error;
        }
    },
    disconnectDB: function() {
        mongoose.connection.close();
    }
}

exports.db = db;