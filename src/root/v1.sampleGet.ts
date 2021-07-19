import express from "express";
import { z } from "zod";

// path
const path = '/v1/sample';

// input schema
//const Input = z.object({});

// output schema
const Output = z.object({
    balance: z.number().optional(),
    now: z.number()
}).strict();

// schema to TS Types
//type InputType = z.infer<typeof Input>;
type OutputType = z.infer<typeof Output>;

// handler
async function handler ():Promise<OutputType> {
    return {
        now: Date.now()
    }
}

// registration
export function register( app: express.Express ){

    app.get( path , async (req, res) => {
        try {
            const output:OutputType = await handler();
            res.json( Output.parse( output ) );
        } catch (error) {
            res.status(500).send( {
                req: {
                    path: req.path,
                    method: req.method,
                    query: req.query,
                    params: req.params
                },
                error
            } )
        }  
    });

}