const express = require('express');
const connectDB = require('./database/db');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//db
connectDB();

//routezzzzzz

app.get('/', (req, res) => {
    res.send("we r in guys");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));