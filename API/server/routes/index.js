const express = require('express');
var cors = require('cors')
//Importando a rota de Usuarios
const imp = require('./imp');
const app = require('../config/express');
const router = express.Router();

router.use(cors())
//Rota para validar se a api esta atualizada.
router.get('/api-status', (req, res)=>
    res.json({
        status:"ok"
    })
);


//Configuração e mapeamento da rota de usuarios

router.use('/imp', imp);

module.exports = router;