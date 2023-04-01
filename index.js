require("dotenv").config()
const { connection } = require('./dataBase/connection')
const express = require('express')
const cors = require("cors")


// Conecion DB
connection();

// Crear Servidor de node
const app = express();
const port = process.env.PORT || 3000

// Convierte los cuerpos de las solicitudes en objetos JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Permite solicitudes desde cualquier origen
app.use(cors())

//Rutas
const routesArticles = require('./routes/articles')

app.use("/api", routesArticles)


// Escuchar peticiones http
app.listen(port, () => {
  console.log("Servidor corriendo en el puerto" + ' ' + port)
})