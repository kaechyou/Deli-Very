module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'alex',
      password: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
      email: 'alex@gmail.com',
      phone: 89999999999,
      role_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'qwe',
      password: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
      email: 'qwe@gmail.com',
      phone: 89162887455,
      role_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
