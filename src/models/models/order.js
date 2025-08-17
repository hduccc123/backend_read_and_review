'use strict';
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        status: { type: DataTypes.STRING, defaultValue: 'pending' },
        total_price: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 }
    }, {
        tableName: 'orders',
        underscored: true,
        timestamps: true
    });

    Order.associate = (models) => {
        Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        Order.hasMany(models.OrderDetail, { foreignKey: 'order_id', as: 'details' });
    };

    return Order;
};
