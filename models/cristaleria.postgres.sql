CREATE TABLE IF NOT EXISTS "Producto" (
  "Id" SERIAL PRIMARY KEY,
  "Referencia" TEXT UNIQUE,
  "Nombre" TEXT,
  "UnidadDeMedida" TEXT,
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
  "Observaciones" TEXT
);

CREATE TABLE IF NOT EXISTS "Cliente" (
    "Id" SERIAL PRIMARY KEY,
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
    "Id" SERIAL PRIMARY KEY,
    "Cedula" TEXT UNIQUE,
    "Sucursal" TEXT,
    "Codigo" TEXT,
    "Nombre" TEXT,
    "PrefijoPedido" TEXT,
    "CodigoTipoDocumento" TEXT,
    "Clave" TEXT
);

CREATE TABLE IF NOT EXISTS "Config1" (
  "Id" SERIAL PRIMARY KEY,
  "Clave" TEXT
);


CREATE TABLE IF NOT EXISTS "PEDENCABEZADOPEDIDOS" (
  "PEDPrefijoPedidoEncabezadoPedidos"  TEXT,
  "PEDNumeroPedidoEncabezadoPedidos"  TEXT,
  "PEDIdDocumentoEncabezadoPedidos"  TEXT,
  "PEDCodigoTipoDocumentoEncabezadoPedidos"  TEXT,
  "PEDFechaPedidoEncabezadoPedidos"  TEXT,
  "PEDFechaEntregaEncabezadoPedidos"  TEXT,
  "PEDIdentificadorDosClienteEncabezadoPedidos"  TEXT,
  "PEDIdentificadorUnoClienteEncabezadoPedidos"  TEXT,
  "PEDSucursalClienteEncabezadoPedidos"  TEXT,
  "PEDIdentificadorUnoVendedorEncabezadoPedidos"  TEXT,
  "PEDSucursalVendedorEncabezadoPedidos"  TEXT,
  "PEDIdentificadorDosVendedorEncabezadoPedidos"  TEXT,
  "PEDPlazoEncabezadoPedidos"  INTEGER,
  "PEDCodigoMonedaEncabezadoPedidos"  TEXT,
  "PEDTasaCambioEncabezadoPedidos"  DECIMAL,
  "PEDEstadoEncabezadoPedidos"  TEXT,
  "PEDPorcDescComercialUnoEncabezadoPedidos"  DECIMAL,
  "PEDPorcDescComercialDosEncabezadoPedidos"  DECIMAL,
  "PEDPorcDescComercialTresEncabezadoPedidos"  DECIMAL,
  "PEDPorcDescFinancieroUnoEncabezadoPedidos"  DECIMAL,
  "PEDPorcDescFinancieroDosEncabezadoPedidos"  DECIMAL,
  "PEDPorcDescFinancieroTresEncabezadoPedidos"  DECIMAL,
  "PEDDiasDescFinancieroUnoEncabezadoPedidos"  DECIMAL,
  "PEDDiasDescFinancieroDosEncabezadoPedidos"  DECIMAL,
  "PEDDiasDescFinancieroTresEncabezadoPedidos"  DECIMAL,
  "PEDNroCuotasEncabezadoPedidos"  INTEGER,
  "PEDPeriodicidadEncabezadoPedidos"  INTEGER,
  "PEDPorcentajeFinanciacionEncabezadoPedidos"  DECIMAL,
  "PEDFormulaEncabezadoPedidos"  TEXT,
  "PEDValorInicialEncabezadoPedidos"  DECIMAL,
  "PEDValorNetoEncabezadoPedidos"  DECIMAL,
  "PEDTransportadorEncabezadoPedidos"  TEXT,
  "PEDPorcRetencionIvaEncabezadoPedidos"  DECIMAL,
  "PEDPorcRetencionIcaEncabezadoPedidos"  DECIMAL,
  "PEDComentariosEncabezadoPedidos"  TEXT,
  "PEDOrigenMovimientoEncabezadoPedidos"  TEXT,
  "PEDImpresoEncabezadoPedidos"  INTEGER,
  "PEDNumeroDocto1EncabezadoPedidos"  TEXT,
  "PEDNumeroDocto2EncabezadoPedidos"  TEXT,
  "PEDPrefijocotizacionEncabezadoPedidos"  TEXT,
  "PEDNumerocotizacionEncabezadoPedidos"  TEXT,
  PRIMARY KEY ("PEDPrefijoPedidoEncabezadoPedidos", "PEDNumeroPedidoEncabezadoPedidos")
);

CREATE TABLE IF NOT EXISTS "PEDDETALLEPEDIDOS" (
  "PEDPrefijoPedidoDetallePedido" TEXT,
  "PEDNumeroPedidoDetallePedido" TEXT,
  "PEDItemDetallePedido" TEXT,
  "PEDCodigoReferenciaDetallePedido" TEXT,
  "PEDCantidadPedidaDetallePedido" DECIMAL,
  "PEDPorcDescComercialUnoDetallePedido" DECIMAL,
  "PEDPorcDescComercialDosDetallePedido" DECIMAL,
  "PEDPorcDescComercialTresDetallePedido" DECIMAL,
  "PEDPrecioPesosDetallePedido" DECIMAL,
  "PEDPrecioOtraMonedaDetallePedido" DECIMAL,
  "PEDPorcRetencionFuenteDetallePedido" DECIMAL,
  "PEDLimiteRetencionFuenteDetallePedido" DECIMAL,
  "PEDPorcIVADetallePedido" DECIMAL,
  "PEDValorImpuestoConsumoDetallePedido" DECIMAL,
  "PEDCodigoCentroCostosDetallePedido" TEXT,
  "PEDCodigoModeloContableDetallePedido" TEXT,
  "PEDComentariosDetallePedido" TEXT,
  "PEDValorRetencionFuenteDetallePedido" DECIMAL,
  "PEDCantidadDespachadaDetallePedido" DECIMAL,
  "PEDCodigoLoteDetallePEDIDOS" TEXT,
  "PEDPorcRetencionCREEDetallePedido" DECIMAL,
  "PEDLimiteRetencionCREEDetallePedido" DECIMAL,
  "PEDPrecioNIIFPesosDetallePedido" DECIMAL,
  "PEDPrecioNIIFOtraMonedaDetallePedido" DECIMAL,
  PRIMARY KEY ("PEDPrefijoPedidoDetallePedido", "PEDNumeroPedidoDetallePedido", "PEDCodigoReferenciaDetallePedido")
);