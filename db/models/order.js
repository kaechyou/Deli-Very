'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, { foreignKey: 'product_id'});
      this.belongsTo(models.User, { foreignKey: 'client_id'});
    }
  }
  Order.init({
    product_id: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    location: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
