const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const { sequelize } = require('./db/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Welcome to the server");
});

app.on('error', (err) => {
    console.log('Server error: ', err);
});


app.use('/api/users', require("./routes/userRoutes"));
app.use('/api/projects', require("./routes/projectRoutes"));
app.use('/api/tickets', require("./routes/ticketRoutes"));
app.use('api/login'), require("./routes/authRoutes");

// Documentar los endpoints en esta ruta a partir del json
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(require("./swagger.json")));

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// Autenticar las credenciales y conectarse a la DB
sequelize.authenticate()
    .then(() => {
        console.log("Database connection established");
    })
    .catch(err => {
        console.log('Error: ', err);
    });
