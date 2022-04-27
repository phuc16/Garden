const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/db_dev');
        console.log('Successfully connected')
    }
    catch(e){
        console.log('Error connecting')
    }
}

module.exports = { connect }