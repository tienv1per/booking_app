const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const hotelsRoute = require('./routes/hotels');
const roomsRoute = require('./routes/rooms');

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const MONGO = process.env.MONGO;

const connect = async () => {
    try {
        await mongoose.connect(MONGO);
        console.log("Connected to mongoDB");
    }
    catch(err) {
        console.log(err.message);
        throw err;
    }
}

// middlewares
app.use(express.json());

app.use((req, res, next) => {
    next();
})


app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Error bitch";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
    // next();
})

app.listen(PORT, (req, res) => {
    connect();
    console.log("Connect backend at port ", PORT);
})