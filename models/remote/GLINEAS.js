var Sequelize = require('sequelize');
var DBRemote = require('./index');

const GLINEAS = DBRemote.define('GLINEAS', {
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

GLINEAS.removeAttribute('id');

module.exports = GLINEAS;
