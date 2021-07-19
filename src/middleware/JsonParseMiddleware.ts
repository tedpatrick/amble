import express from "express";
const jsonParseError = (err:any, req:any, res:any, next:any) => {
    if (err) {
        req.log.error( err , 'json body parsing error' );
        res.status(500).send({
            req: {
                path: req.path,
                method: req.method
            },
            error:err
        })
    } else {
        next()
    }
}

export function register( app: express.Express ){
    app.use( jsonParseError );
}