// includes
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const pool = require( './modules/pool' );

// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

// globals
const port = process.env.PORT || 5000;

// spin up server
app.listen( port, ()=>{
    console.log( 'server up on:', port );
})

// routes
app.delete( '/items/:id', ( req, res )=>{
    console.log( '/items DELETE hit:', req.params.id );
    const query = `DELETE FROM "items" WHERE id=$1;`;
    const values = [ req.params.id ];
    pool.query( query, values ).then( ( response )=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( 'error with DELETE:', err );
        res.sendStatus( 500 );
    })
}) // end /items delete

app.get( '/items', ( req, res )=>{
    console.log( 'in /items GET' );
    const query = `SELECT * from "items";`;
    pool.query( query ).then( ( results )=>{
        res.send( results.rows );
    }).catch( (err )=>{
        console.log( 'ERROR with GET:', err );
        res.sendStatus( 500 );
    })
}) // end /items GET

app.post( '/items', ( req, res )=>{
    console.log( 'in /items POST:', req.body );
    const query = `INSERT INTO "items" ( "size", "color", "name" ) VALUES ( $1, $2, $3 );`;
    const values = [ req.body.size, req.body.color, req.body.name ];
    pool.query( query, values ).then( ( results )=>{
        res.sendStatus( 201 );
    }).catch( ( err )=>{
        console.log( 'ERROR with INSERT:', err );
        res.sendStatus( 500 );
    })
}) //end /items POST

app.put( '/items/:id', ( req, res )=>{
    console.log( '/items PUT:', req.params.id, req.body );
    const query = `UPDATE "items" SET pending=$1 WHERE id=$2;`;
    const values =[ req.body.newPending, req.params.id ];
    pool.query( query, values ).then( (results)=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( 'error with update:', err );
        res.sendStatus( 500 );
    })
}) // end /items put