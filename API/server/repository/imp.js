
const { response } = require('express');
const puppeteer = require('puppeteer')
var fs = require("fs");
const { json } = require('body-parser');


//Metodo responsavel por buscar um ususario de acordo com o id
async function post (imp) {
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless:true,
        args: [
            '--ignore-certificate-errors',
            '--no-sandbox', 
            '--disable-setuid-sandbox',   
        ],
        slowMo:200
    });
    const page = await browser.newPage();
    if(imp.modelo == "c3010"){
        try {
            await page.goto('http://'+imp.ip+'/sws/app/information/home/home.json',{timeout: 30000}, (err, data) => {
                // Mistaken assumption: throwing here...
                if (err) {
                throw err;
                }
            });
            } catch (err) {
            // This will not catch the throw!
            await browser.close()
            }            
    }else if(imp.modelo == "c911"){    
        try {
            await page.goto('http://'+imp.ip+'/status.htm',{timeout: 30000}, (err, data) => {
                // Mistaken assumption: throwing here...
                if (err) {
                throw err;
                }
            });
        } catch (err) {
        // This will not catch the throw!
        await browser.close()
        
        }
        
    }else if(imp.modelo == "m404"){

        try {
            await page.goto('http://'+imp.ip+'/DevMgmt/ConsumableConfigDyn.xml',{timeout: 30000}, (err, data) => {
                // Mistaken assumption: throwing here...
                if (err) {
                throw err;
                }
            });
        } catch (err) {
        // This will not catch the throw!
        await browser.close()
        
        }
        
        const page2 = await browser.newPage();
        
        try {
            await page2.goto('http://'+imp.ip+'/IoMgmt/IoConfig.xml',{timeout: 30000}, (err, data) => {
                // Mistaken assumption: throwing here...
                if (err) {
                throw err;
                }
            });
        } catch (err) {
        // This will not catch the throw!
        await browser.close()
        
        }
        var conteudo2 = await page2.content();


    }else if(imp.modelo == "e50145" || imp.modelo == "e52645"){
        
        try {
            await page.goto('https://'+imp.ip+'/hp/device/DeviceStatus/Index',{timeout: 30000}, (err, data) => {
                // Mistaken assumption: throwing here...
                if (err) {
                throw err;
                }
            });
        } catch (err) {
        // This will not catch the throw!
        await browser.close()
        
        }
        
        const page2 = await browser.newPage();
        
        try {
            await page2.goto('https://'+imp.ip+'/hp/device/DeviceInformation/View',{timeout: 30000}, (err, data) => {
                // Mistaken assumption: throwing here...
                if (err) {
                throw err;
                }
            });
        } catch (err) {
        // This will not catch the throw!
        await browser.close()
        
        }
        var conteudo2 = await page2.content();
    }
    var conteudo = await page.content();
    await browser.close()
    
    if(imp.modelo == "c3010"){
        conteudo =conteudo.split(",")
        var local =conteudo[8].replace(/\n.*location:."/g,'')
        local =local.replace(/"/g,'')
        var nome =conteudo[6].match(/PRN.../)
        var ip =conteudo[10].replace(/\n.*ip_addr: "/g,'')
        ip = ip.replace(/"/g,'')
        var black =conteudo[18].replace(/\D/gim, '')
        var cyan =conteudo[22].replace(/\D/gim, '')
        var magenta =conteudo[26].replace(/\D/gim, '')
        var yellow =conteudo[30].replace(/\D/gim, '')

        return await JSON.stringify({
            "imp":{
                "local":local,
                "nome":nome,
                "ip":ip,
                "black":black,
                "cyan":cyan,
                "magenta":magenta,
                "yellow":yellow,
            }
        })  
    }else if(imp.modelo == "c911"){
        var filtro = conteudo.match(/width="180">.*/g)
        var local = filtro[2].replace(/width="180">/,"")
        local = local.replace(/<\/td>/,"")
        var nome = filtro[0].replace(/width="180">/,"")
        nome = nome.replace(/<\/td>/,"")
        
        var toners = conteudo.match(/<font id="smsz">\d\d*/g)
        
        for (let index = 0; index < 4; index++) {
            toners[index] = toners[index].match(/\d\d*/g)	
        }
        return await JSON.stringify({
            "imp":{
                "local":local,
                "nome":nome,
                "ip":imp.ip,
                "black":toners[3],
                "cyan":toners[0],
                "magenta":toners[1],
                "yellow":toners[2],
            }
        })
    }else if(imp.modelo == "m404"){
        var porcentagem = conteudo.match(/<dd:ConsumablePercentageLevelRemaining>\d*/g)
        var porcentagem = porcentagem[0].replace(/<dd:ConsumablePercentageLevelRemaining>/,"")
        var nome = conteudo2.match(/<dd3:Hostname>.*/g)
        var nome = nome[0].replace(/<dd3:Hostname>/,"")
        var nome = nome.replace(/<\/dd3:Hostname>/,"")

        return await JSON.stringify({
            "imp":{
                "local":"local",
                "nome":nome,
                "ip":imp.ip,
                "black":porcentagem,
            }
        })
    }else if(imp.modelo == "e50145" || imp.modelo == "e52645"){
        
        if (conteudo.match(/<span id="SupplyPLR0" class="plr">&lt;\d\d*/g) == null) {
            var porcentagem = conteudo.match(/<span id="SupplyPLR0" class="plr">\d\d*/g)
            var porcentagem = porcentagem[0].replace(/<span id="SupplyPLR0" class="plr">/,"")
        } else {
            var porcentagem = conteudo.match(/<span id="SupplyPLR0" class="plr">&lt;\d\d*/g)
            var porcentagem = porcentagem[0].replace(/<span id="SupplyPLR0" class="plr">/,"")
        }

        var nome = conteudo.match(/<p class="device-name" id="HomeDeviceName">.*/g)
        var nome = nome[0].replace(/<p class="device-name" id="HomeDeviceName">/,"")
        var nome = nome.replace(/<\/p>/,"")
        var local = conteudo2.match(/<p id="DeviceLocation">.*/g)
        var local = local[0].replace(/<p id="DeviceLocation">/,"")
        var local = local.replace(/<\/p>/,"")
        
        return await JSON.stringify({
            "imp":{
                "local":local,
                "nome":nome,
                "ip":imp.ip,
                "black":porcentagem,
            }
        })
    }
        return {
            statusCode: 505,
            msg: 'Erro: impressora não esta respondendo'
        }
    

    
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