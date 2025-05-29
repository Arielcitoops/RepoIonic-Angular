//Llamado a los paquetes necesarios

import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
const app = express();
const port = 3000;

// Cors Configuración

const corsOptions = {
    origin:'http://localhost:8100',
    optionSuccessStatus:200
};
app.use(cors(corsOptions));



//Configurar la conexion

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Logaritmo.1',
    database: 'BDD_Parcial',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(express.json());

app.get('/', (_, res) => {
    res.send('Hola desde el backend');
});

app.get('/api/Items-Tabla', async (_, res) => {
    try {
        const connection = await pool.getConnection();
        try {
            // Realiza la consulta a la base de datos
            const [rows] = await connection.query('SELECT * FROM tbl_notasestudiantes');
            res.json(rows);
        } finally {
            // Libera la conexión después de usarla
            connection.release();
        }
    } catch (error) {
        console.error('Error en Server Backend', error);
        res.status(500).send('Timeout dude');
    }
});

app.listen(port, () => {   
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
});