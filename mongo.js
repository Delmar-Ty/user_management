const { resolveInclude } = require('ejs');
const mongoose = require('mongoose');
const { User } = require('./schema');
const URL = 'mongodb://localhost:27017/test';

const db = {
    createUser: function(data) {
        mongoose.connect(URL, (err) => {
            if (err) throw err;
        });
        
        try {
            const doc = new User({
                username: data.username,
                password: data.password,
                email: data.email,
                dob: data.DOB,
                zip: data.zip
            });
            
            doc.save();
        } catch (error) {
            throw error;
        }  
    },
    updateUser: function(data, userID) {
        mongoose.connect(URL, (err) => {
            if (err) throw err;
        });

        try {
            const currentUser = User.findById({ id: userID });
            currentUser.set({
                username: data.username,
                password: data.password,
                email: data.email,
                dob: data.DOB,
                zip: data.zip
            });
            currentUser.save();
        } catch (error) {
            throw error;
        }
    },
    deleteUser: function(id) {
        mongoose.connect(URL, () => {
            if (err) throw err
        });

        try {
            User.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    },
    getUser: function(id) {
        mongoose.connect(URL, (err) => {
            
            try {
                
            } catch (error) {
                throw error;
            }
        });
    },
    getUserID: function(userName) {
        mongoose.connect(URL, (err) => {
            if (err) throw err
        });

        try {
            const promise = new Promise((res, rej) => {
                User.findOne({ username: userName }, (err, doc) => {
                    if (err) throw err;
                    mongoose.connection.close();
                    res(doc._id);
                });
            });
            return promise;
        } catch (error) {
            throw error;
        }

    }, 
    userExists: function(data) {
        mongoose.connect(URL, (err) => {
            if (err) throw err;
        });

        try {
            const promise = new Promise((res, rej) => {
                User.findOne({ $or: [{username: data.username}, {email: data.email}] }, (err, doc) => {
                    if (err) throw err;
                    const tf = (doc)? true: false;
                    mongoose.connection.close();
                    res(tf);
                });
            });
            return promise;
        } catch (error) {
            throw error;
        }
    },
    closeDB: function() {
        mongoose.connection.close();
    }
}

exports.db = db;