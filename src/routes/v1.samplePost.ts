import express from "express";
import { z } from "zod";

// path
const path = '/v1/sample';

// input schema
const Input = z.object({
    account: z.number()
}).strict();

// output schema
const Output = z.object({
    account: z.number(),
    balance: z.number(),
    now: z.number()
}).strict();

// schema to TS Types
type InputType = z.infer<typeof Input>;
type OutputType = z.infer<typeof Output>;

// handler
async function handler ( input:InputType ):Promise<OutputType> {
    console.log( input );
    return {
        account: input.account,
        now: Date.now(),
        balance: 42
    }
}

// export register function
export function register( app: express.Express ){

    app.post( path , async (req, res) => {
        try {
            const input:InputType = Input.parse( req.body );
            const output:OutputType = await handler(input);
            res.json( Output.parse( output ) );
        } catch (error) {
            req.log.error( error );
            res.status(500).send( {
                req: {
                    path: req.path,
                    method: req.method,
                    body: req.body
                },
                error
            } )
        }     
    });
}