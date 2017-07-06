CREATE TABLE IF NOT EXISTS "Inventario"(
  "Id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "Referencia" TEXT UNIQUE,
  "Nombre" Text,
  "Existencia" INTEGER
);
