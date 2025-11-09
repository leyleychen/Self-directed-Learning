const Sequelize = require("sequelize")
const sequelize = require("../utils/database")

const Guild = sequelize.define("infraction",{
  id:{
    type: Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  userId:{
    type: Sequelize.STRING,
    allowNull:true
  },
  reason:{
    type: Sequelize.STRING,
    allowNull:true,
    defaultValue:"沒有提供原因"
  },
  enforcerId:{
    type: Sequelize.STRING,
    allowNull:true
  },
  type:{
    type: Sequelize.STRING,
    allowNull:true
  },
  duration:{
    type: Sequelize.INTEGER,
    allowNull:false,
    defaultValue:0
  },
});

module.exports = infraction;