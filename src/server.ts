import express from "express";

import * as v1SampleGet from './root/v1.sampleGet'
import * as v1SamplePost from './root/v1.samplePost'

const {
    PORT = 3000
} = process.env;

const app = express();

// middleware
app.use(express.json());

// routes
v1SampleGet.register(app);
v1SamplePost.register(app);

// listen
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})