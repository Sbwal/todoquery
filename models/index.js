const mongoose = require('mongoose');
const config = require('../config/default');

mongoose.set("strictQuery", false);

function connect() {
    const dbURI = 'mongodb://' + config.mongoConfig.host + ':' + config.mongoConfig.mongoPort + '/' + config.mongoConfig.dbName;
    console.log('Connecting to MongoDB...')
    mongoose.connect(dbURI).then(() => {
        console.log('Connection to MongoDB established')
    }).catch((err) => {
        console.log('Connection to MongoDB falied', err)
    })
}

function mongooseConnection() {
    return mongoose.connection.readyState == 1;
}

module.exports = {
    connect,
    mongooseConnection
}
