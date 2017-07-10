CREATE TABLE IF NOT EXISTS "Producto" (
  "Id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "Referencia" TEXT UNIQUE,
  "Nombre" Text,
  "UnidadDeMedida" INTEGER,
  "UnidadPorEmpaque" INTEGER,
  "ModeloContable" TEXT,
  "Linea" TEXT,
  "PrecioBase" DECIMAL,
  "Iva" DECIMAL,
  "LimiteIva" DECIMAL,
  "PromocionDelProveedor" DECIMAL,
  "PromocionDelMes" DECIMAL,
  "Existencia" INTEGER,
  "FechaUltimaCompra" DATE,
  "FechaUltimaVenta" DATE,
  "Observaciones" TEXT,
  "ComentarioDetallePedido" TEXT
);

CREATE TABLE IF NOT EXISTS "Cliente" (
    "Id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "Nit" TEXT UNIQUE,
    "Sucursal" TEXT,
    "Codigo" TEXT,
    "Nombre" TEXT,
    "Direccion" TEXT,
    "Telefono1" TEXT,
    "Telefono2" TEXT,
    "Descuento" DECIMAL,
    "Plazo" INTEGER
);

CREATE TABLE IF NOT EXISTS "Vendedor" (
    "Id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "Cedula" VARCHAR(255),
    "Sucursal" VARCHAR(255),
    "Codigo" VARCHAR(255),
    "Nombre" VARCHAR(255),
    "PrefijoPedido" VARCHAR(255),
    "CodigoTipoDocumento" VARCHAR(255),
    "Clave" TEXT
);

CREATE TABLE IF NOT EXISTS "Config1" (
  "Id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "Clave" TEXT
);
