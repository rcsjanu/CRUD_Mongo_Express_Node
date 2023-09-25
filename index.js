const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser")
const cors = require("cors")
const mongoDbConnect = require('./config/dbConnect')
const routes = require('./routes/routes');


mongoDbConnect(process.env.DATABASE_URL);
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/home', (req, res) => {
    res.send("Welcome to NODE EXPRESS application...!!!")
})
app.use('/', routes)

app.listen(2000, () => {
    console.log(`Server Started at 2000 `)
})