var Sequelize = require('sequelize');
var DB = require('./index');

const GLINEAS = DB.define('GLINEAS', {
  GLBCodigoLinea: {type: Sequelize.STRING, primaryKey: true},
  GLBNombreLinea: Sequelize.STRING,
  GLBNivelLinea: Sequelize.INTEGER,
  GLBEsUltimoNivelLinea: Sequelize.INTEGER,
  GLBComentariosLinea: Sequelize.STRING
  },
  {
    timestamps: false,
    freezeTableName: true,
    schema: 'dbo'
  }
);

module.exports = GLINEAS;
