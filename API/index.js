const app = require('./server/config/express');
const config = require('./server/config/env');

app.listen(config.portApi,() =>{
    console.log(
        `API Esta rodando na porta ${config.portApi} (${config.env})`
    );
});
//https://helpdevs.net/2019/12/20/criar-api-nodejs/
module.exports = app;