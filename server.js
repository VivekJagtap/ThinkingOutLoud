const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');

/**
 * Property file having all properties/configuration values required for running the app.
 */
const properties = require('./Server/server.properties');

/**
 * Initialize express app.
 */
const app = express();

/**
 * app should use the body-parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/**
 * To create a session we need the Session Object.
 */
app.use(session({
        secret:`${properties.session.secret}`,
        resave: `${properties.session.resave}`,
        saveUninitialized: `${properties.session.saveUninitiated}`,
        cookie:`${properties.session.cookie}`
    }
));

const api = require('./Server/Resources/api');

/**
* Dont really know why this is taken.
*/
app.use(express.static(path.join(__dirname,'dist')));

/**
* Our app should use api from 'api' variable
* we can change '/api' to something else.
*/
app.use('/api',api);

/**
* All the other requests which are not specified in the api.js will automatically get redirected to index page.
*/
app.get('*',(req,res)=>{
   res.sendFile(path.join(__dirname,`${properties.dist}`));
});

/**
 * Create mongoose connection for querying on MongoDB.
 */
const mongoose = require('mongoose');
mongoose.connect(`mongodb://127.0.0.1:${properties.db.port}/${properties.db.name}`,{useMongoClient:true});

/**
 * Create app server on port:properties.port 
 */
app.set('port',properties.port);
const server =http.createServer(app);


/**
 * Listen on properties.port.
 */
server.listen(properties.port,()=>{
    console.log(`Server running on port : ${properties.port}..`);
});