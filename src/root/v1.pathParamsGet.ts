import express from "express";
import { z } from "zod";

// path
const path = '/v1/path/:name';

// input schema
const Input = z.object({
    name: z.string()
});

// output schema
const Output = z.object({
    name: z.string(),
    now: z.number()
}).strict();

// schema to TS Types
type InputType = z.infer<typeof Input>;
type OutputType = z.infer<typeof Output>;

// handler
async function handler (input:InputType):Promise<OutputType> {
    return {
        name: input.name,
        now: Date.now()
    }
}

// registration
export function register( app: express.Express ){

    app.get( path , async (req, res) => {
        try {
            const input:InputType = Input.parse({
                name: req.params.name
            });
            const output:OutputType = await handler(input);
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