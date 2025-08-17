'use strict';
module.exports = (sequelize, DataTypes) => {
    const OrderDetail = sequelize.define('OrderDetail', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        order_id: { type: DataTypes.INTEGER, allowNull: false },
        book_id: { type: DataTypes.INTEGER, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
    }, {
        tableName: 'order_details',
        underscored: true,
        timestamps: false
    });

    OrderDetail.associate = (models) => {
        OrderDetail.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
        OrderDetail.belongsTo(models.Book, { foreignKey: 'book_id', as: 'book' });
    };

    return OrderDetail;
};
