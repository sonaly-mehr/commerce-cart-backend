const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");
require('dotenv').config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.slxtz.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

// routes
// const userRoutes = require('./routes/user')
// const adminRoutes = require('./routes/admin')
// const categoryRoutes = require('./routes/category')
// const cartRoutes = require('./routes/cart')

const productRoutes = require('./routes/product')
const userRoutes = require('./routes/user')
const orderRoutes= require('./routes/order')

//Database Connection

mongoose.connect(url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Connected to database !!');
    })
    .catch((err)=>{
      console.log('Connection failed !!'+ err.message);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', orderRoutes);


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });

app.get('/', (req, res)=> {
  res.send("db is working!!");
})
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server Started Sucessfully on ${PORT}`)
});