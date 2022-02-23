'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [{
      title: 'Courier',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Client',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
