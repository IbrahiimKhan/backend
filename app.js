const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const expressValidator = require("express-validator")
const cors = require('cors')
require ('dotenv').config();
// const path = require("path")


// importing routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const brainTreeRoutes = require("./routes/braintree")
const orderRoutes = require("./routes/order")
// db
const db = process.env.DATABASE;
// our app
const app = express();

// db
mongoose.connect(process.env.DATABASE,{

}).then(()=>{
    console.log('db connected');
})
// morgan middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1, "../frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname1, "../frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }


app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',brainTreeRoutes)
app.use('/api',orderRoutes)

port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
})

