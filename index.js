const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const connectDB = require('./server/database/');
const dotenv = require('dotenv');
dotenv.config({
  path: 'config.env'
})
const morgan = require('morgan');
const path = require('path');
connectDB();
app.use(express.json());
app.use(morgan('tiny'));
app.disable('etag');
app.use(express.urlencoded({
  extended: true
})) 
app.use('/', require('./server/routes/'))
// app.use(uploads)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});