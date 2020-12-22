const express = require('express');

//const { route } = require('../config/express');
//importando o controler de usuarios
const imp = require('../controller/imp');

const router = express.Router();

//Rota para buscar as informaçoes da impressora
router.route('/').post(imp.post);

module.exports = router;