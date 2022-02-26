module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [{
      product_id: 1,
      client_id: 2,
      location: 'Moscow',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      product_id: 2,
      client_id: 2,
      location: 'Moscow',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
