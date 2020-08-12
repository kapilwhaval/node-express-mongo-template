require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api-v1", routes)

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Database connected'))
    .catch(() => console.log('Something went wrong while connecting DB'))

app.listen(process.env.PORT, () => console.log('Server is listening on port', process.env.PORT));