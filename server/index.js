const express = require('express');
const app = express();
const {port} = require('./config/config');

app.listen(port, ()=>{
    console.log(`listening at port ${port}`)
});