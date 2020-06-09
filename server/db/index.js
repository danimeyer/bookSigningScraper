const Sequelize = require('sequelize');
const pkg = require('../../package.json');
// const Event = require('./event');

const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}-test` : pkg.name;
console.log(`Opening database connection to ${dbName}`);

const db = new Sequelize(`postgres://localhost:5432/${dbName}`, {
  logging: false,
});

// module.exports = { db, Event };
module.exports = db;
