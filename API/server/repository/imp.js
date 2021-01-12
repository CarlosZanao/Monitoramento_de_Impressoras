
const { response } = require('express');
var fs = require("fs");
const { json } = require('body-parser');
var snmp = require ("net-snmp");

//Metodo responsavel por buscar um ususario de acordo com o id

async function dadoImpressora(imp){
    var promiseSmnp = new Promise(function(resolve, reject){
        var session = snmp.createSession (imp.ip, "public");
        
        var dados =[]
        if(imp.modelo == "m5360"){
            var oids = ["1.3.6.1.2.1.1.5.0","1.3.6.1.2.1.1.6.0","1.3.6.1.2.1.43.11.1.1.8.1.1","1.3.6.1.2.1.43.11.1.1.9.1.1"];
        }else if(imp.modelo == "e50145" || imp.modelo == "e52645"){
            var oids = ["1.3.6.1.2.1.1.5.0","1.3.6.1.2.1.43.5.1.1.4.1","1.3.6.1.2.1.43.11.1.1.8.1.1","1.3.6.1.2.1.43.11.1.1.9.1.1"];
        }else if(imp.modelo == "m404" || imp.modelo == "m428"){
            var oids = ["1.3.6.1.2.1.1.5.0","1.3.6.1.2.1.43.11.1.1.8.1.1","1.3.6.1.2.1.43.11.1.1.9.1.1"];
        }else if(imp.modelo == "c3010"){
            var oids = ["1.3.6.1.2.1.1.5.0","1.3.6.1.2.1.1.6.0","1.3.6.1.2.1.43.11.1.1.8.1.4","1.3.6.1.2.1.43.11.1.1.9.1.4","1.3.6.1.2.1.43.11.1.1.8.1.1","1.3.6.1.2.1.43.11.1.1.9.1.1","1.3.6.1.2.1.43.11.1.1.8.1.2","1.3.6.1.2.1.43.11.1.1.9.1.2","1.3.6.1.2.1.43.11.1.1.8.1.3","1.3.6.1.2.1.43.11.1.1.9.1.3"];
        }else if(imp.modelo == "c911"){
            var oids = ["1.3.6.1.2.1.1.5.0","1.3.6.1.2.1.1.6.0","1.3.6.1.2.1.43.11.1.1.9.1.1","1.3.6.1.2.1.43.11.1.1.9.1.2","1.3.6.1.2.1.43.11.1.1.9.1.3","1.3.6.1.2.1.43.11.1.1.9.1.4"]
        }
        session.get (oids, function (error, varbinds) {
            if (error) {
                reject (error);
            } else {
                for (var i = 0; i < varbinds.length; i++)
                    if (snmp.isVarbindError (varbinds[i])){
                        reject (snmp.varbindError (varbinds[i]))
                    }else{
                        dados.push(varbinds[i].value)
                    }
            }
            session.close ();
        if(dados[0] == null){
            reject (JSON.stringify({
                statusCode: 505,
                msg: 'Erro: impressora não esta respondendo'
                }))
        }else{
            if(imp.modelo == "m5360" || imp.modelo == "e50145" || imp.modelo == "e52645"){
                    //regra de 3
                    var resultado = ((dados[3] * 100) / dados[2])
                    dados[2] = resultado
                    dados[0] = dados[0].toString()
                    dados[1] = dados[1].toString()
                    
                    dados.splice(3,1)

                    resolve (JSON.stringify({
                        "imp":{
                            "local":dados[1],
                            "nome":dados[0],
                            "ip":imp.ip,
                            "black":dados[2],
                        }
                    }))
            }else if(imp.modelo == "m404" || imp.modelo == "m428"){
                //regra de 3
                var resultado = ((dados[2] * 100) / dados[1])
                dados[1] = resultado
                dados[0] = dados[0].toString()

                dados.splice(2,1)
                
                resolve (JSON.stringify({
                    "imp":{
                        "local":"Local",
                        "nome":dados[0],
                        "ip":imp.ip,
                        "black":dados[1],
                    }
                    }))
            }else if(imp.modelo == "c3010"){
                //regra de 3 preto
                var resultadopreto = ((dados[3] * 100) / dados[2])
                //regra de 3 cino
                var resultadociano = ((dados[5] * 100) / dados[4])
                //regra de 3 magenta
                var resultadomagenta = ((dados[7] * 100) / dados[6])
                //regra de 3 yellow
                var resultadoyellow = ((dados[9] * 100) / dados[8])
                dados[2] = resultadopreto
                dados[3] = resultadociano
                dados[4] = resultadomagenta
                dados[5] = resultadoyellow
                dados[0] = dados[0].toString()
                dados[1] = dados[1].toString()
                
                
                resolve (JSON.stringify({
                    "imp":{
                        "local":dados[1],
                        "nome":dados[0],
                        "ip":imp.ip,
                        "black":dados[2],
                        "cyan":dados[3],
                        "magenta":dados[4],
                        "yellow":dados[5],
                    }
                }))
            }else if(imp.modelo == "c911"){
                    dados[0] = dados[0].toString()
                    dados[1] = dados[1].toString()
                    resolve (JSON.stringify({
                        "imp":{
                            "local":dados[1],
                            "nome":dados[0],
                            "ip":imp.ip,
                            "black":dados[2],
                            "cyan":dados[3],
                            "magenta":dados[4],
                            "yellow":dados[5],
                        }
                    }))  
                }       
        }  
        });
    })
    return await promiseSmnp

} 

async function post (imp) {
    
    return await dadoImpressora(imp)

}
// busca as impressoras cadastradas
async function getIMPs() {
    var jsonData = await fs.readFileSync(__dirname+"/imps.json","utf-8");
    return await jsonData
}

// adiciona noca impressora
async function postAdd(imp) {
    var impressoras = []
    var maiorID = 0
    jsonData = await fs.readFileSync(__dirname+"/imps.json","utf-8");
    arr = jsonData.replace(/\[/,"")
    arr = arr.replace(/\]/,"")
    arr = arr.replace(/},/g,"}&&")
    arr =arr.split("&&")
    for (let i = 0; i < arr.length; i++) {
        const imp = arr[i];
        impressoras.push(JSON.parse(imp))
    }
    //maior id
    for (let i = 0; i < impressoras.length; i++) {
        const id = impressoras[i].id;
        if(id > maiorID){
            maiorID = parseInt(id)
        }
    }
    maiorID = maiorID+1
    imp.id = maiorID.toString()
    impressoras.push(imp)
    fs.writeFileSync(__dirname+"/imps.json",JSON.stringify(impressoras))
    
    //var jsonData = await fs.readFileSync(__dirname+"/imps.json","utf-8");*/
    return await "OK"
}
// adiciona noca impressora
async function postRm(imp) {
    var impressoras = []
    jsonData = await fs.readFileSync(__dirname+"/imps.json","utf-8");
    arr = jsonData.replace(/\[/,"")
    arr = arr.replace(/\]/,"")
    arr = arr.replace(/},/g,"}&&")
    arr =arr.split("&&")
    for (let i = 0; i < arr.length; i++) {
        const im = arr[i];
        impressoras.push(JSON.parse(im))
    }

    for (let i = 0; i < impressoras.length; i++) {
        const im = impressoras[i];
        if(im.id == imp.id){
            impressoras.splice(i,1)
        }    
    }
    fs.writeFileSync(__dirname+"/imps.json",JSON.stringify(impressoras))
    
    //var jsonData = await fs.readFileSync(__dirname+"/imps.json","utf-8");*/
    return await "OK"
}


//exportar todos os modulos para poderem ser usados em outros arquivos
module.exports = {post,getIMPs,postAdd,postRm};