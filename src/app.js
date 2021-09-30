import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import userController from './controllers/index.js'
import makeCallback from './expressCallback/index.js'
import cors from 'cors'
dotenv.config();

const app = express();
const port = process.env.PORT || 5000

const {
    authUser,
    postUser,
    updateUserClasses,
    getUserById
} = userController

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => res.send('hello world'))

app.post('/user/signin',makeCallback(postUser))
app.post('/user/login',makeCallback(authUser))
app.put('/user/classes',makeCallback(updateUserClasses))
app.get('/user/:id',makeCallback(getUserById))

app.listen(port,() => {
    console.log('Server is running at port ' + port);
});