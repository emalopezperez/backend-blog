const { validationResult, body } = require('express-validator');
const Articles = require('../models/Articles')
const fs = require('fs');
const path = require('path')

const create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { titulo, contenido } = req.body;
  const articles = new Articles({ titulo, contenido });

  articles.save().then((savedArticle) => {
    return res.status(201).json({ msg: "El artículo ha sido creado correctamente", article: savedArticle });
  }).catch((err) => {
    console.error(err);
    return res.status(500).json({ msg: "Ha ocurrido un error al crear el artículo" });
  });
}

const getItems = async (req, res) => {
  try {
    let items = await Articles.find({})
      .sort({ fecha: -1 })
      .limit(req.params.home ? 3 : null);

    return res.status(200).send({
      status: "success",
      items
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.message
    });
  }
}


const getItem = async (req, res) => {
  let id = req.params.id

  try {
    let item = await Articles.findById(id)

    return res.status(200).send({
      status: "success",
      item
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.message
    });
  }
}

const deleteItem = async (req, res) => {
  try {
    let id = req.params.id
    let item = await Articles.findByIdAndDelete({ _id: id })

    return res.status(200).send({
      status: "success",
      item
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.message
    });
  }
}

const updateItem = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    // Validar los campos actualizados con express-validator
    await body('titulo').optional().isString().run(req);
    await body('contenido').optional().isString().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await Articles.findOneAndUpdate({ _id: id }, updates, options);

    if (!result) {
      return res.status(404).json({ message: 'Article not found' });
    }

    return res.status(200).json({
      message: 'Article updated successfully',
      article: result
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to update article' });
  }
}


const uploadFiles = async (req, res) => {
  // Si no se proporcionó ningún archivo, devuelve una respuesta HTTP 404
  if (!req.file && !req.files) {
    return res.status(404).json({
      message: 'peticion invalida'
    });
  }

  // Obtiene la extensión del archivo
  const file = req.file.originalname
  const fileSplit = file.split('\.')
  const fileExtension = fileSplit[1]

  // Si la extensión del archivo no es una de las permitidas, borra el archivo y devuelve una respuesta HTTP 400
  if (fileExtension != "png" && fileExtension != "jpg"
    && fileExtension != "jpeg" && fileExtension != "gif") {

    fs.unlink(req.file.path, () => {
      return res.status(400).json({
        message: 'archivo no valido'
      });
    })
  } else {

    // Obtiene el ID del artículo de la URL de la solicitud
    let articuloId = req.params.id

    // Actualiza el artículo con el nuevo nombre de archivo y devuelve el artículo actualizado
    Articles.findOneAndUpdate({ _id: articuloId }, { imagen: req.file.filename }, { new: true })
      .then(articuloActualizado => {
        // Si no se encuentra el artículo, se lanza un error
        if (!articuloActualizado) {
          throw new Error('error')
        }

        // Si se encuentra el artículo, devuelve una respuesta HTTP 200 con el artículo actualizado
        return res.status(200).json({
          message: 'Article actualizado',
          status: "success",
          articulo: articuloActualizado
        });
      })
      .catch(err => {
        // Si se produce un error, devuelve una respuesta HTTP 500
        return res.status(500).json({
          message: err.message || 'error',
          status: "error"
        });
      });
  }
}

const image = (req, res) => {
  try {
    const fichero = req.params.fichero;
    const rutaFisica = './imagenes/articulos/' + fichero;

    const existe = fs.statSync(rutaFisica).isFile();
    if (existe) {
      return res.sendFile(path.resolve(rutaFisica));
    } else {
      return res.status(404).json({ mensaje: 'la imagen no existe' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: 'error al obtener la imagen' });
  }
};

const search = async (req, res) => {
  let busqueda = req.params.busqueda;

  try {
    const articulosEncontrados = await Articles.find({
      "$or": [
        { "titulo": { "$regex": new RegExp(busqueda, "i") } },
        { "contenido": { "$regex": new RegExp(busqueda, "i") } },
      ]
    }).sort({ fecha: -1 });

    if (!articulosEncontrados || articulosEncontrados.length === 0) {
      return res.status(404).json({
        status: "error",
        msg: "no se ha encontrado articulos"
      })
    }
    return res.status(200).json({
      message: 'Article actualizado',
      status: "success",
      articulo: articulosEncontrados
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: error.message || "Error interno del servidor"
    });
  }
}



module.exports = {
  create,
  getItems,
  getItem,
  deleteItem,
  updateItem,
  uploadFiles,
  image,
  search
}