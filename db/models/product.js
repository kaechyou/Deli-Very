'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'courier_id'});
      this.hasOne(models.Order, { foreignKey: 'product_id'});
    }
  }
  Product.init({
    title: DataTypes.STRING,
    img: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    courier_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    location: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
