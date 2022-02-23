'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Products', [{
      title: 'Burger',
      img: 'img1',
      price: 100,
      discount: 10,
      courier_id: 1,
      status: 'placed',
      location: 'Moscow',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Pizza',
      img: 'img2',
      price: 100,
      discount: 10,
      courier_id: 1,
      status: 'pending',
      location: 'Moscow',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Products', null, {});
  }
};
