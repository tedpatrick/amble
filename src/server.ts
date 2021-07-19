import express from "express";

import { jsonParseError } from './middleware'
import * as v1SampleGet from './root/v1.sampleGet'
import * as v1SamplePost from './root/v1.samplePost'
import * as v1PathParams from './root/v1.pathParamsGet'

const {
    PORT = 3000
} = process.env;

const app = express();

// middleware
app.use(express.json());
app.use(jsonParseError);

// routes
v1SampleGet.register(app);
v1SamplePost.register(app);
v1PathParams.register(app);

// listen
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})