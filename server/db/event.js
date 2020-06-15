const Sequelize = require('sequelize');
const db = require('./index');

module.exports = db.define('event', {
  title: { type: Sequelize.STRING, allowNull: false, unique: true },
  url: { type: Sequelize.STRING, allowNull: false },
  date: { type: Sequelize.STRING, allowNull: false },
  time: { type: Sequelize.STRING, allowNull: false },
  bookstore: { type: Sequelize.STRING, allowNull: false },
});
