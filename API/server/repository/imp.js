
const { response } = require('express');
const puppeteer = require('puppeteer')

//Metodo responsavel por buscar um ususario de acordo com o id
async function post (imp) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    if(imp.modelo == "c3010"){
        await page.goto('http://'+imp.ip+'/sws/app/information/home/home.json');
    }else if(imp.modelo == "c911"){
        await page.goto('http://'+imp.ip+'/status.htm');
    }else if(imp.modelo == "m404"){
        await page.goto('http://'+imp.ip+'/DevMgmt/ConsumableConfigDyn.xml');
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
        
        return await JSON.stringify({
            "imp":{
                "local":"local",
                "nome":"nome",
                "ip":ip,
                "black":porcentagem,
            }
        })
    }

        return {
            statusCode: 505,
            msg: 'Erro: impressora não esta respondendo'
        }
    

    
}

//exportar todos os modulos para poderem ser usados em outros arquivos
module.exports = {post};