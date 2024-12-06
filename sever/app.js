const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
//import axios from "axios";
require('dotenv/config');

app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json());

//routes
const categoryRoutes=require('./routes/categories');
const productRoutes=require('./routes/products');
const productSizeRoutes = require('./routes/productSIZE.js');
const cart = require('./routes/cart.js');
//const imageUploadRoutes = require('./helper/imageUpload.js');

app.use("/uploads",express.static("uploads"));
app.use(`/api/category`,categoryRoutes);
app.use(`/api/products`,productRoutes);
app.use(`/api/productSIZE`,productSizeRoutes);
app.use(`/api/cart`, cart);
//app.use(`/api/imageUpload`,imageUploadRoutes);
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


