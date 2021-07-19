import express from "express";
import pino from 'pino-http';

import * as JsonParseError from './middleware/JsonParseMiddleware'
import * as v1SampleGet from './routes/v1.sampleGet'
import * as v1SamplePost from './routes/v1.samplePost'
import * as v1PathParams from './routes/v1.pathParamsGet'

const {
    PORT = 3000
} = process.env;

const app = express();

// middleware
app.use(pino())
app.use(express.json());
JsonParseError.register(app);

// routes
v1SampleGet.register(app);
v1SamplePost.register(app);
v1PathParams.register(app);

// listen
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})