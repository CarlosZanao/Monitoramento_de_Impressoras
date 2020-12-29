//Importando o serviço de impressoras
const imp = require('../service/imp');


//Metodo que retorna as infromaçoes das impressoras 
async function post (req, res) {
    return await imp
        .post(req.body.imp)
        .catch(err => {
            res.status(err.statusCode || 500).send(err);
        })
        .then(q => {
            return res.status(200).send(q);
        });
}
//Metodo que retorna a lista de impressoras
async function getIMPs (req, res) {
    return await imp
        .getIMPs()
        .catch(err => {
            res.status(err.statusCode || 500).send(err);
        })
        .then(q => {
            return res.status(200).send(q);
        });
}
//Metodo para adicionar nova impressora
async function postAdd (req, res) {
    return await imp
        .postAdd(req.body)
        .catch(err => {
            res.status(err.statusCode || 500).send(err);
        })
        .then(q => {
            return res.status(200).send(q);
        });
}


//exportar todos os metodos para poder acessar em outros arquivos 
module.exports = {post,getIMPs,postAdd};