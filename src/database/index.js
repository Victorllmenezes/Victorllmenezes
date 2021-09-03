const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Entity = require("../models/Entity");
const Address = require("../models/Address");

const connection = new Sequelize(dbConfig);

User.init(connection);
Entity.init(connection);
Address.init(connection);

Address.associate(connection.models);
Entity.associate(connection.models);

module.exports = connection;