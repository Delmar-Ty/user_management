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
        const doc = User.findById(id);
        return doc;
    },
    getUserID: function(username) {
        mongoose.connect(URL, () => {
            if (err) throw err
        });

        try {
            const doc = User.find({ username: username });
            mongoose.connection.close();
            return doc._id;
        } catch (error) {
            throw error;
        }

    }, 
    userExists: function(data) {
        const exists = User.exists({ $or : [{ username: data.username }, { email: data.email }] });
        console.log(exists);
        return exists;
    },
    closeDB: function() {
        mongoose.connection.close();
    }
}

exports.db = db;