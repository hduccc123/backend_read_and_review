module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
    },
    publisher: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
  }, {
    tableName: 'books',
    underscored: true,
    timestamps: true,
    createdAt: 'create_at',
    updatedAt: 'update_at',
  });

  Book.associate = (models) => {
    Book.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
    Book.hasMany(models.Image, { foreignKey: 'book_id', as: 'images' });
  };

  return Book;
};
