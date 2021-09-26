import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import userController from './controllers/index.js'
import makeCallback from './expressCallback/index.js'
import cors from 'cors'
dotenv.config();

const app = express();
const port = 3000

const {
    authUser,
    postUser
} = userController

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => res.send('hello world'))

app.post('/signin',makeCallback(postUser))
app.post('/login',makeCallback(authUser))

app.listen(port,() => {
    console.log('Server is running at port ' + port);
});