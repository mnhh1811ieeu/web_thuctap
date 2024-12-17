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
const paymentRoutes = require('./routes/payment');
const userRoutes= require('./routes/user.js');
const myListSchema = require('./routes/myList.js')
const cart = require('./routes/cart');
const search = require('./routes/search.js')
const orderRoutes = require('./routes/order.js')


const productReviewRoutes= require('./routes/productReviews.js');
// app.use(authJwt());
app.use("/uploads",express.static("uploads"));
app.use(`/api/category`,categoryRoutes);
app.use(`/api/products`,productRoutes);
app.use(`/api/productSIZE`,productSizeRoutes);
app.use(`/api/user`,userRoutes);
app.use(`/api/my-list`,myListSchema); 
app.use(`/api/cart`, cart);
app.use(`/api/payment`, paymentRoutes);
app.use(`/api/productReviews`,productReviewRoutes)
app.use(`/api/search`, search);
app.use(`/api/order`, orderRoutes );
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
app.post("/callback", async (req, res) => {
    console.log("callback: ");
    console.log(req.body);
    return res.status(200).json(req.body);
})


