const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config()
const app = express()

mongoose.connect(process.env.MURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})
.then(() => console.log("Database Connected"))
.catch(err => console.log(err));

//middleware
app.use(bodyParser.json({limit: "2mb"}));
app.use(cors());

//routes
app.get('/', (req, res) => {
    res.json({
        data: "hello world"
    });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Server Started");
});