
const { response } = require('express');
const puppeteer = require('puppeteer')
var fs = require("fs");

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
        await page.goto('http://'+imp.ip+'/sws/app/information/home/home.json');
    }else if(imp.modelo == "c911"){
        await page.goto('http://'+imp.ip+'/status.htm');
    }else if(imp.modelo == "m404"){
        await page.goto('http://'+imp.ip+'/DevMgmt/ConsumableConfigDyn.xml');
        const page2 = await browser.newPage();
        await page2.goto('http://'+imp.ip+'/IoMgmt/IoConfig.xml');
        var conteudo2 = await page2.content();
    }else if(imp.modelo == "e50145" || imp.modelo == "e52645"){
        await page.goto('https://'+imp.ip+'/hp/device/DeviceStatus/Index');
        const page2 = await browser.newPage();
        await page2.goto('https://'+imp.ip+'/hp/device/DeviceInformation/View');
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
        
        var toners = conteudo.match(/<font id="smsz">\d\d/g)
        
        for (let index = 0; index < 4; index++) {
            toners[index] = toners[index].match(/\d\d/g)	
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
        var porcentagem = conteudo.match(/<span id="SupplyPLR0" class="plr">\d*/g)
        var porcentagem = porcentagem[0].replace(/<span id="SupplyPLR0" class="plr">/,"")
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

async function getIMPs() {
    var jsonData = fs.readFileSync(__dirname+"/imps.json", "utf8");
    return JSON.stringify(jsonData)
}
//exportar todos os modulos para poderem ser usados em outros arquivos
module.exports = {post,getIMPs};