'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      // define association here
      Image.hasMany(models.Comment, { foreignKey: 'id' });
    }
  }

  Image.init(
    {
      title: DataTypes.STRING,
      photo: DataTypes.STRING, // Simpan URL gambar di sini
    },
    {
      sequelize,
      modelName: 'Image',
    }
  );

  return Image;
};