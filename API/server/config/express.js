const express = require('express');
const bodyParce = require('body-parser');
const router = require('../routes');
const consign = require('consign');
const app = express();

consign().include('./server/controller').into(app);

app.use(bodyParce.json());
app.use(bodyParce.urlencoded({extended: true}));

app.use('/api/',router);
module.exports=app;