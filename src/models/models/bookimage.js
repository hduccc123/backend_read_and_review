'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BookImage extends Model {
    static associate(models) {
      // Một ảnh thuộc về một Book
      BookImage.belongsTo(models.Book, {
        foreignKey: 'book_id',
        targetKey: 'book_id',
        as: 'book'
      });
    }
  }

  BookImage.init({
    book_id: DataTypes.INTEGER,
    filename: DataTypes.STRING,
    alt_text: DataTypes.STRING,
    is_primary: DataTypes.BOOLEAN,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'BookImage',
    tableName: 'BookImages',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return BookImage;
};
