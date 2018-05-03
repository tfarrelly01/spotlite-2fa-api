/* jshint indent: 2 */
const Sequelize = require('sequelize');
const sequelize = require('../db/db');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Applicant', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    EmailUidl: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ContactSurname: {
        type: DataTypes.STRING(50),
        allowNull: false
      },    
    ContactMiddleName: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
    ContactForename: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ContactEmail: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    ContactPhone: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    ContactAddrCountryId: {
        type: DataTypes.INTEGER(11),
        allowNull: true
    },
    ContactAddr1: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    ContactAddr2: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    ContactCity: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    ContactState: {
        type: DataTypes.STRING(40),
        allowNull: true,
    },
    ContactPostCode: {
        type: DataTypes.STRING(40),
        allowNull: true,
    },
    EmailSent: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    Registered: {
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