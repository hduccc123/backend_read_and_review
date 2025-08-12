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
    await queryInterface.bulkInsert('books', [
      {
        id: 1,
        name: 'The Great Gatsby',
        description: 'Classic novel by F. Scott Fitzgerald',
        quantity: 10,
        category_id: 1,
        author: 'F. Scott Fitzgerald',
        publisher: 'Scribner',
        create_at: new Date(),
        update_at: new Date(),
      },
      {
        id: 2,
        name: 'A Brief History of Time',
        description: 'Science book by Stephen Hawking',
        quantity: 5,
        category_id: 2,
        author: 'Stephen Hawking',
        publisher: 'Bantam Books',
        create_at: new Date(),
        update_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('books', null, {});
  }

};
