require('dotenv').config();
import * as express from 'express';
const app = express();
import * as bodyParser from 'body-parser';
import * as path from 'path';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

import { router } from './routes/airports';

app.use('/api', router);

if(process.env.PROD) {
    app.use(express.static(path.join(__dirname, './frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './frontend/build/index.html'));
    });
}

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is listening on port ${port}`));

