const { validationResult } = require('express-validator');
const Articles = require('../models/Articles')

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
    const items = await Articles.find({});
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



module.exports = {
  create,
  getItems
}