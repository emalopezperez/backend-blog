
require("dotenv").config()
const { connection } = require('./dataBase/connection')
const express = require('express')
const cors = require("cors")
const { createRoles } = require('./libs/initialSetup')
const fileUpload = require("express-fileupload")

// Conecion DB
connection();

// Crear Servidor de node
const app = express();
createRoles();

const port = process.env.PORT || 3000


// Convierte los cuerpos de las solicitudes en objetos JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Permite solicitudes desde cualquier origen
app.use(cors())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './imagenes/recursos'
}));

//Rutas
const routesArticles = require('./routes/articles')
const colaborador_router = require('./routes/auth')
const resource = require('./routes/resources')

app.use("/api", routesArticles)
app.use("/api/resource", resource)
app.use("/api/auth", colaborador_router)


// Escuchar peticiones http
app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto" + ' ')
})