/* jshint indent: 2 */
const Sequelize = require('sequelize');
const sequelize = require('../db/db');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Applicant', {
    ApplicantId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    EmailUidl: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ContactName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ContactEmail: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    EmailSent: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'Applicant'
  });
}(sequelize, Sequelize);
