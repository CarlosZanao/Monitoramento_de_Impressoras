const express = require('express');

//const { route } = require('../config/express');
//importando o controler de usuarios
const imp = require('../controller/imp');

const router = express.Router();

//Rota para buscar as informaçoes da impressora
router.route('/').post(imp.post);
//Rota para obter lista de impressoras
router.route('/impressoras').get(imp.getIMPs);

module.exports = router;