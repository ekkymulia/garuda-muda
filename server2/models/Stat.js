const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Player = require('./Player');
const Game = require('./Game');

const Stat = sequelize.define('Stat', {
  stat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  player_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  rebounds: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  assists: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  blocks: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  }
}, {
  timestamps: true,
  paranoid: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  tableName: 'stats'
});

Stat.sync().then(() => {
  console.log('Stat table created');
})
// .finally(() => {
//   sequelize.close();
// })

module.exports = Stat;
