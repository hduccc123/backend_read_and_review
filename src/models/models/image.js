module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: DataTypes.STRING, allowNull: false },
    book_id: { type: DataTypes.INTEGER, allowNull: false },
    is_cover: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }

  }, {
    tableName: 'images',
    underscored: true,
    timestamps: false,
  });

  Image.associate = (models) => {
    Image.belongsTo(models.Book, { foreignKey: 'book_id', as: 'book' });
  };

  return Image;
};
