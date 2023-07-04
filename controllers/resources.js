const Resources = require('../models/Resources')
const cloudinary = require('../utils/cloudinary');

const uploadImage = cloudinary.uploadImage;

const createResource = async (req, res) => {
  const { titulo, categoria, link } = req.body

  const resource = new Resources({
    titulo,
    categoria,
    link
  })

  try {
    if (req.files?.imagen) {
      const result = await uploadImage(req.files.imagen.tempFilePath);

      resource.imagen = {
        public_id: result.public_id,
        url: result.secure_url
      }

    }

    await resource.save();
  } catch (error) {
    console.error('Error al guardar el recurso:', error);
  }
}

const getResource = async (req, res) => {
  try {
    let resource = await Resources.find({})
      .sort({ fecha: -1 })
      .limit(req.params.home ? 3 : null);

    return res.status(200).send({
      status: "success",
      resource
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: err.message
    });
  }
}



module.exports = {
  createResource,
  getResource
}
