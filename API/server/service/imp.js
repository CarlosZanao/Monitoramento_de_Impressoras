//Aqui estamos importando o repositorio de usuarios
const imp = require('../repository/imp');



async function post (ip) {
    //Aqui estamos buscando ima impressora
    var im = await imp.post(ip);

    //valida requisição
    if(!im) {
        return {
            statusCode: 400,
            msg: 'Erro: Falha ao obter dados da impressora'
        };
    }

    //Aqui retornamos o usuario encontrado no banco 
    return im;
}

//Exportando todos os metodos que criamos para que consigamos ascesalos em outros arquivos 
module.exports = {post};
