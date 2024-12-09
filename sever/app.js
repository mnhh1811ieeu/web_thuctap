const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
//import axios from "axios";
require('dotenv/config');
const authJwt = require('./helper/jwt.js');

app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(express.json());
// app.use(authJwt());
//routes
const categoryRoutes=require('./routes/categories');
const productRoutes=require('./routes/products');
const productSizeRoutes = require('./routes/productSIZE.js');

const userRoutes= require('./routes/user.js');
const cart = require('./routes/cart');


const productReviewRoutes= require('./routes/productReviews.js');
// app.use(authJwt());
app.use("/uploads",express.static("uploads"));
app.use(`/api/category`,categoryRoutes);
app.use(`/api/products`,productRoutes);
app.use(`/api/productSIZE`,productSizeRoutes);
app.use(`/api/user`,userRoutes);
app.use(`/api/cart`, cart);

app.use(`/api/productReviews`,productReviewRoutes)
//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
 .then(()=>{
    console.log('database connection is ready...')
    //sever
    app.listen(process.env.PORT, () => {
        console.log(`sever is running http://localhost:${process.env.PORT}`);
    })

 }  )
 .catch((err)=>{
    console.log(err);
 } 
)


