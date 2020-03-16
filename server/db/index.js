const Sequelize = require('sequelize');
// const Event = require('./event');

module.exports = new Sequelize('postgres://localhost:5432/bookstore-events', {
  logging: false,
});

// module.exports = { db, Event };
