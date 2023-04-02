const { validationResult, body } = require('express-validator');
const Articles = require('../models/Articles')
const fs = require('fs');
const { validateArticle } = require('../helpers/validation')

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

  if (!req.file && !req.files) {
    return res.status(404).json({
      message: 'peticion invalida'
    });
  }

  const file = req.file.originalname
  const fileSplit = file.split('\.')
  const fileExtension = fileSplit[1]

  if (fileExtension != "png" && fileExtension != "jpg"
    && fileExtension != "jpeg" && fileExtension != "gif") {

    fs.unlink(req.file.path, () => {
      return res.status(400).json({
        message: 'archivo no valido'
      });
    })
  } else {
    return res.status(200).json({
      message: 'Article updated successfully',
      file: req.file,
      fileExtension: fileExtension
    });
  }
}

module.exports = {
  create,
  getItems,
  getItem,
  deleteItem,
  updateItem,
  uploadFiles
}