import express from "express";
const jsonParseError = (err:any, req:any, res:any, next:any) => {
    if (err) {
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