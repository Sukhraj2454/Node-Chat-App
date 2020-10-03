const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const publicpath = path.join(__dirname, '/../public');

app.use(express.static(publicpath));


app.listen(PORT, ()=>{console.log('Server is Listening on Port:'+PORT)});
