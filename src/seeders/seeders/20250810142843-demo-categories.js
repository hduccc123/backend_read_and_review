'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Categories', [
      { name: 'Tiểu thuyết', description: 'Sách tiểu thuyết', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Khoa học', description: 'Sách khoa học', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kinh tế', description: 'Sách kinh tế', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
