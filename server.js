const http = require('http');
const puppeteer = require('puppeteer')

const server = http.createServer();

server.on('request', function (request, response) {
    let scrape = async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http:/'+request.url);
    
        response.writeHead(200, {'Access-Control-Allow-Origin': '*'});
        response.write(await page.content());
        await browser.close()
        response.end();
    } 
    scrape()  
});
server.listen(3000);
console.log('Server is running...');

//node main.js