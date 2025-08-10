'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // Một Book có nhiều ảnh
      Book.hasMany(models.BookImage, {
        foreignKey: 'book_id',
        sourceKey: 'book_id',
        as: 'images'
      });

      // Ví dụ: Quan hệ tới category, author, publisher (nếu có)
      Book.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category'
      });
      Book.belongsTo(models.Author, {
        foreignKey: 'author_id',
        as: 'author'
      });
      Book.belongsTo(models.Publisher, {
        foreignKey: 'publisher_id',
        as: 'publisher'
      });
    }
  }

  Book.init({
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    stock: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER,
    publisher_id: DataTypes.INTEGER,
    published_date: DataTypes.DATE,
    cover_image: DataTypes.STRING,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'Books',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return Book;
};
