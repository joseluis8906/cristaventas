var Sequelize = require('sequelize');
var DB = require('./index');

const GTERCEROS = DB.define('GTERCEROS', {
  GBLIdentificadorUnoTerceros: Sequelize.STRING,
  GBLSucursalTerceros: Sequelize.STRING,
  GBLRazonSocialTerceros: Sequelize.STRING,
  GBLDireccionTerceros: Sequelize.STRING,
  GBLCiudadTerceros: Sequelize.STRING,
  GBLTelefono1Terceros: Sequelize.STRING,
  GBLTelefono2Terceros: Sequelize.STRING,
  GBLFaxTerceros: Sequelize.STRING,
  GBLEMailTerceros: Sequelize.STRING,
  GBLContactoTerceros: Sequelize.STRING,
  GBLPaisTerceros: Sequelize.STRING,
  GBLFechaIngresoTerceros: Sequelize.STRING,
  GBLRepresentanteLegalTerceros: Sequelize.STRING,
  GBLFechaRetiroTerceros: Sequelize.STRING,
  GBLIdentificadorClienteTerceros: Sequelize.INTEGER,
  GBLIdentificadorAcreedorTerceros: Sequelize.INTEGER,
  GBLIdentificadorProveedorTerceros: Sequelize.INTEGER,
  GBLIdentificadorEmpleadoTerceros: Sequelize.INTEGER,
  GBLIdentificadorDeudorTerceros: Sequelize.INTEGER,
  GBLPersonaNaturalTerceros: Sequelize.INTEGER,
  GBLAutorretenedorTerceros: Sequelize.INTEGER,
  GBLRegimenTributarioTerceros: Sequelize.STRING,
  GCODMUNICIPIOTERCERO: Sequelize.STRING,
  GCODDEPARTAMENTOTERCERO: Sequelize.STRING,
  GBLDEPARTAMENTOTERCERO: Sequelize.STRING,
  GBLAutorretenedorCREETerceros: Sequelize.INTEGER,
  GLBCodActEconomTerceros: Sequelize.STRING
  },
  {
    indexes:[{primary: true, name: "PK_GTERCEROS", fields: ["GBLIdentificadorUnoTerceros", "GBLSucursalTerceros"]}],
    timestamps: false,
    freezeTableName: true,
    schema: 'dbo'
  }
);

GTERCEROS.removeAttribute('id');

module.exports = GTERCEROS;
