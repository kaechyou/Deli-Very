'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.bulkInsert('Users', [{
      name: 'mario',
      password: '123',
      email: 'm@rio.ru',
      phone: 89999999999,
      role_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'luigi',
      password: '123',
      email: 'l@rio.ru',
      phone: 89999999990,
      role_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
   
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
