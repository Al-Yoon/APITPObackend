const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const { sequelize } = require('./db/db');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const ticketRoutes = require('./routes/tickets');
const userRoutes = require('./routes/users');
const userProjectRoutes = require('./routes/usersProject');

dotenv.config();

const app = express();

app.use(cors()); // Usa el middleware de cors
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Welcome to the server");
});

app.on('error', (err) => {
    console.log('Server error: ', err);
});

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/login', authRoutes);
app.use('/api/userProject', userProjectRoutes);

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