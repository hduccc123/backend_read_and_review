'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Publishers', [
            { name: 'NXB Trẻ', address: 'TP. Hồ Chí Minh', createdAt: new Date(), updatedAt: new Date() },
            { name: 'NXB Kim Đồng', address: 'Hà Nội', createdAt: new Date(), updatedAt: new Date() },
            { name: 'NXB Văn Học', address: 'Hà Nội', createdAt: new Date(), updatedAt: new Date() },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Publishers', null, {});
    }
};
