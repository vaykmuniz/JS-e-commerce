const express = require('express');
const connectDB = require('./database/db');

const app = express();

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));