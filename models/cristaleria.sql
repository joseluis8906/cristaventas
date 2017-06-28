CREATE TABLE IF NOT EXISTS "Cliente"(
  "Id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "Nit" TEXT UNIQUE,
  "Nombre" TEXT,
  "Direccion" TEXT,
  "Telefono" TEXT,
  "Descuento" DECIMAL
);

CREATE TABLE IF NOT EXISTS "Producto"(
  "Id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "Codigo" TEXT UNIQUE,
  "Nombre" TEXT,
  "DescuentoProveedor" DECIMAL,
  "PrecioUnitario" DECIMAL,
  "Iva" DECIMAL
);

CREATE TABLE IF NOT EXISTS "Inventario"(
  "ProductoId" INTEGER PRIMARY KEY REFERENCES "Producto"("Id") ON DELETE CASCADE,
  "CantidadDisponible" INTEGER,
  "CantidadVendida" INTEGER
);

CREATE TABLE IF NOT EXISTS "Pedido"(
  "Id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "Codigo" TEXT UNIQUE,
  "Fecha" DATE,
  "FechaDeEntrega" DATE,
  "ClienteId" INTEGER REFERENCES "Cliente"("Id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "PedidoRegistro"(
  "Item" TEXT PRIMARY KEY,
  "Cantidad" INTEGER,
  "ProductoId" INTEGER REFERENCES "Producto"("Id") ON DELETE CASCADE,
  "Subtotal" DECIMAL,
  "PedidoId" INTEGER REFERENCES "Pedido"("Id") ON DELETE CASCADE
);
