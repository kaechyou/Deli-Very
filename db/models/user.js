'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Role, { foreignKey: 'role_id'});
      this.hasMany(models.Product, { foreignKey: 'courier_id'});
      this.hasMany(models.Order, { foreignKey: 'client_id'});
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    phone: DataTypes.STRING,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
