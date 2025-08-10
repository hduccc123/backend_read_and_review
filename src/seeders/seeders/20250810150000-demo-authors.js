'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Authors', [
            { name: 'Nguyễn Nhật Ánh', biography: 'Nhà văn Việt Nam nổi tiếng với các tác phẩm thiếu nhi', createdAt: new Date(), updatedAt: new Date() },
            { name: 'J.K. Rowling', biography: 'Tác giả của bộ truyện Harry Potter', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Haruki Murakami', biography: 'Nhà văn Nhật Bản với phong cách huyền ảo', createdAt: new Date(), updatedAt: new Date() },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Authors', null, {});
    }
};
