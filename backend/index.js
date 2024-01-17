import express from 'express';
//many new vwersions of express dont know how to handle post api
//so install npm i body-parser to handle post api request


import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './Database/db.js';
import Router from './routes/route.js'

dotenv.config();

const app = express();
//since this isn't a static route

app.use(cors());
app.use(bodyParser.json({ extended : true}));
app.use(bodyParser.urlencoded({ extended : true }));
app.use('/',Router);

const PORT =8000;

app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`));

const USERNAME= process.env.DB_USERNAME;
const PASSWORD= process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD);