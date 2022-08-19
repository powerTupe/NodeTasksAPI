require('dotenv').config(); 
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const router = require('./routes/products');

const notFoundMiddleWare = require('./middleware/not-found');
const errorMiddleWare = require('./middleware/error-handler');

//middleware
app.use(express.json());

//routes
app.get('/', (req, res)=> {
    res.send('<h1>Store Api</h1><a href="/api/v1/products">products route </a1>')
});

app.use('/api/v1/products', router);

app.use(notFoundMiddleWare);
app.use(errorMiddleWare);

const port = 3000;

const start = async() => {
    try {
        //connectDB
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening on port : ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start();