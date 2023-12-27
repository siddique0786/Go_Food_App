const express = require('express');
const cors = require('cors');
const app = express()
const port = 5000
const mongoDB = require("./db")

// app.use(cors());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})



mongoDB();
app.use(express.json());
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));
// console.log('Middleware function:', yourMiddlewareFunction);
// app.use(yourMiddlewareFunction);


app.get('/',(req,res) => {
    res.send('hello world')
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})