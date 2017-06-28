var Sequelize = require('sequelize');
var db = require('./index');
var Cliente = require('./Cliente');

const Pedido = db.define('Pedido', {
    Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    Codigo: {type: Sequelize.STRING, unique: true},
    Fecha: {type: Sequelize.DATEONLY, get: function(){var value=this.getDataValue('Fecha');return(value!==null)?Moment.utc(value).format('YYYY-MM-DD'):null}},
    FechaDeEntrega: {type: Sequelize.DATEONLY, get: function(){var value=this.getDataValue('FechaDeEntrega');return(value!==null)?Moment.utc(value).format('YYYY-MM-DD'):null}},
    ClienteId: {type: Sequelize.INTEGER, references: Cliente, referencesKey: 'Id'}
  },
  {
    timestamps: false,
    freezeTableName: true,
    //schema: 'Auth'
  }
);

Pedido.belongsTo(Cliente);
Cliente.hasMany(Pedido);

module.exports = Pedido;
