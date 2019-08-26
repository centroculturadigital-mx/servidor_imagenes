const path = require('path')
const Pug = require('koa-pug');

const pug_load = (app)=>{
    
    const pug = new Pug({
        viewPath: path.resolve(__dirname, './'),
        basedir: path.resolve(__dirname, './'),
        locals: {},
        //    basedir: './views',
        app: app
    });
    
    
    pug.locals.locale = 'es_MX'
    return pug;
    
}

module.exports = pug_load