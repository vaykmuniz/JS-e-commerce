const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1/my_database';

const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false,
            //useCreateIndex: true
        });
        console.log(`MongoDB Connected: ${url}! Are you there BOB?`);
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;