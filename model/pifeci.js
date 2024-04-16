const sequelize = require('sequelize');
const db = require('../config/database');

const Result = db.define('result', 
{
    win : { type: sequelize.INTEGER},
    loose: { type: sequelize.INTEGER },
    draw: { type: sequelize.INTEGER  }
});

module.exports = Result;