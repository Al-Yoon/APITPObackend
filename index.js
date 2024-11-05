const express = require('express');
const dotenv = require('dotenv');
const swagger = require('swagger-ui-express');

const {
    sequelize
} = require('./db/db');
const { Sequelize } = require('sequelize');

dotenv.config();

const app = express();

app.use(express.json);
app.use(express.urlencoded({
    extended: true
}));

app.get('/',(req,res) =>{
    res.send("Welcome to the server");
});

app.on('error',(err)=>{
    console.log('Server error: ', err);
});

app.use('/api/users', require('./routes/users'));//ok
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tickets', require('./routes/tickets'));

//Docuemntar los endpoints en esta ruta a partir del json
app.use('/api/docs', swagger.serve, swagger.setup(require("./swagger.json")));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
});

//Autenticar las credenciales y conectarse a la DB
sequelize.autenticate()
    .then(() =>{
        console.log("Database connection entablished");
    })
    .catch(err =>{
        console.log('Error. ', err);
    })