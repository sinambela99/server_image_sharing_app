const cloudinary = require('cloudinary').v2;
const { Image } = require("../models");// Impor model Image

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: 'dv9rlshr4',
  api_key: '621611323768164',
  api_secret: 'vy0yVyRRgQUt-pTIaT4wEUx6wqY',
});



class ImageController {

    
    static async getAllImage(req, res, next) {
        try {
          const result = await Stock.findAll({ order: [["id", "ASC"]] });
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

  // CREATE: Upload a new image to Cloudinary and save it to the database
  static async createImage(req, res, next) {
    try {
      const { title, photo } = req.body;

      // Upload foto ke Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(photo);

      // Simpan informasi gambar ke database
      const newImage = await Image.create({
        title,
        photo: cloudinaryResponse.secure_url, // URL gambar yang diunggah di Cloudinary
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

      // Upload foto baru ke Cloudinary jika ada perubahan gambar
      if (photo) {
        // Hapus gambar lama dari Cloudinary
        const public_id = image.photo.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(public_id);

        // Upload gambar baru ke Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(photo);
        image.photo = cloudinaryResponse.secure_url;
      }

      // Update informasi gambar di database
      image.title = title;

      await image.save();

      res.status(200).json({ message: 'Image updated successfully', data: image });
    } catch (error) {
      next(error);
    }
  }

  // DELETE: Delete an image by ID from Cloudinary and the database
  static async deleteImageById(req, res, next) {
    try {
      const { id } = req.params;
      const image = await Image.findByPk(id);

      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }

      // Hapus gambar dari Cloudinary
      const public_id = image.photo.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(public_id);

      // Hapus entri gambar dari database
      await image.destroy();

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ImageController;
