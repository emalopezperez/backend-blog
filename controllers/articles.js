const { validationResult, body } = require('express-validator');
const Articles = require('../models/Articles')
const fs = require('fs');
const path = require('path')


const create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { titulo, contenido, autor, categoria, markdown } = req.body;
  const img_path = req.files.imagen.path;

  const str_img = img_path.split('\\');
  const str_imagen_blog = str_img[2];

  const article = new Articles({ titulo, contenido, autor, categoria, markdown, imagen: str_imagen_blog });

  article.save()
    .then((savedArticle) => {
      return res.status(201).json({ msg: "El artículo ha sido creado correctamente", article: savedArticle });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ msg: "Ha ocurrido un error al crear el artículo" });
    });
};

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
    const img_path = req.files.imagen.path;
    const str_img = img_path.split('\\');
    const str_imagen_blog = str_img[2];

    const options = { new: true };

    // Validar los campos actualizados con express-validator
    await body('titulo').optional().isString().run(req);
    await body('categoria').optional().isString().run(req);
    await body('markdown').optional().isString().run(req);
    await body('contenido').optional().isString().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Verificar campos y construir objeto de actualización
    const updateFields = {};
    if (updates.titulo) updateFields.titulo = updates.titulo;
    if (updates.categoria) updateFields.categoria = updates.categoria;
    if (updates.markdown) updateFields.markdown = updates.markdown;
    if (updates.contenido) updateFields.contenido = updates.contenido;
    if (str_imagen_blog) updateFields.imagen = str_imagen_blog;

    const result = await Articles.findOneAndUpdate(
      { _id: id },
      updateFields,
      options
    );

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
};



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
  search,
  image
}