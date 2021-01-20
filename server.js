//main
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
//internos
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth');

///////////////////////////////////////////////////////////////////////////

//instancia
const app = express();

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


//routezzzzzzzz
app.use('/api/auth', authRoutes);

//db
connectDB();


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));