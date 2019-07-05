// require 
const pg = require( 'pg' );

//globals
const Pool = pg.Pool;

// Both local & Heroku database config
let config = {};

if ( process.env.DATABASE_URL ) {
    // Heroku config
    const url = require('url'); // need to npm install url
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');
       config = {
        // Heroku put security on our database. 
            user: auth[0],
            password: auth[1],
            // Get the database name by splitting the pathname 
            // and taking 2nd part (array item 1)
            database: params.pathname.split('/')[1],
             // Need to get remote server & port
            host: params.hostname,
            port: params.port,
            // Last two items don't change
            max: 12,
            idleTimeOutMillis: 30000
}
}
else {

config ={
        database: 'playfair_inventory',
        host: 'localhost',
        port: 5432,
        max: 12,
        idleTimeOutMillis: 30000
    } // end config
    } //end config
const pool = new Pool( config );

// db connection
pool.on( 'connect', ()=>{
    console.log( 'connected to db' );
}) // end db error

pool.on( 'error', ( err )=>{
    console.log( 'ERROR connecting to BD:', err );
}) //end db error

// exports
module.exports = pool;