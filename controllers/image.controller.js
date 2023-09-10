const { Image } = require("../models");

class ImageController {
  // ...
  static async getAllImage(req, res, next) {
    try {
      const result = await Image.findAll({ order: [["id", "ASC"]] });
      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

// READ: Get an image by ID
static async getImageById(req, res, next) {
try {
  const { id } = req.params;
  const image = await Image.findByPk(id);

  if (!image) {
    return res.status(404).json({ message: 'Image not found' });
  }

  res.status(200).json({ data: image });
} catch (error) {
  next(error);
}
}
  // CREATE: Upload a new image to the server and save its information to the database
  static async createImage(req, res, next) {
    try {
      const { title } = req.body;
      const photo = req.file;// Ambil file gambar dari req.file

      if (!photo) {
        return res.status(400).json({ message: 'No image uploaded' });
      }
      
      // Simpan informasi gambar ke database
      const newImage = await Image.create({
        title,
        photo: `http://localhost:${process.env.PORT}/uploads/${photo}`, // Nama file yang diunggah
      });

      res.status(201).json({ message: 'Image created successfully', data: newImage });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE: Update an image by ID
  static async updateImageById(req, res, next) {
    try {
      const { id } = req.params;
      const { title, photo } = req.body;
      const image = await Image.findByPk(id);

      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }

      // Jika ada file gambar baru, hapus file lama dan ganti dengan yang baru
      if (photo) {
        const imagePath = path.join('uploads', image.photo);
        fs.unlinkSync(imagePath); // Hapus file gambar lama dari server

        image.photo = photo.filename; // Gunakan nama file baru
      }

      // Update informasi gambar di database
      image.title = title;

      await image.save();

      res.status(200).json({ message: 'Image updated successfully', data: image });
    } catch (error) {
      next(error);
    }
  }

  // DELETE: Delete an image by ID from the server and the database
  static async deleteImageById(req, res, next) {
    try {
      const { id } = req.params;
      const image = await Image.findByPk(id);

      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }

      // Hapus file gambar dari server
      const imagePath = path.join('uploads', image.photo);
      fs.unlinkSync(imagePath);

      // Hapus entri gambar dari database
      await image.destroy();

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ImageController;
