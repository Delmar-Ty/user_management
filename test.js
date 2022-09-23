const mongoose = require('mongoose');
const mongo = require('./mongo');
const db = mongo.db;

async function test() {
    const x = await db.getUserID('username');
    const user = await db.getUser(x);
    console.log(x, user);
}

test();