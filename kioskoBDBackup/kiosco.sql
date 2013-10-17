-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 16-10-2013 a las 21:04:22
-- Versión del servidor: 5.5.25
-- Versión de PHP: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `kiosco`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `ID_Administrador` int(10) NOT NULL AUTO_INCREMENT,
  `ID_Persona` int(10) NOT NULL,
  PRIMARY KEY (`ID_Administrador`),
  KEY `ID_Persona` (`ID_Persona`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `AuthAssignment`
--

CREATE TABLE `AuthAssignment` (
  `itemname` varchar(64) NOT NULL,
  `ID_Persona` int(11) NOT NULL,
  `bizrule` text,
  `data` text,
  PRIMARY KEY (`ID_Persona`),
  KEY `itemname` (`itemname`,`ID_Persona`),
  KEY `itemname_2` (`itemname`,`ID_Persona`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `AuthItem`
--

CREATE TABLE `AuthItem` (
  `name` varchar(64) NOT NULL,
  `type` int(11) NOT NULL,
  `description` text,
  `bizrule` text,
  `data` text,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `AuthItemChild`
--

CREATE TABLE `AuthItemChild` (
  `parent` varchar(64) NOT NULL,
  `child` varchar(64) NOT NULL,
  PRIMARY KEY (`parent`,`child`),
  KEY `child` (`child`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `ID_Carrito` int(10) NOT NULL AUTO_INCREMENT,
  `Costo_Total` float DEFAULT '0',
  `ID_Usuario` int(11) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'a',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_expiracion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ID_Carrito`),
  KEY `ID_Usuario` (`ID_Usuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=52 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contenido_producto_recibo_pago`
--

CREATE TABLE `contenido_producto_recibo_pago` (
  `ID_Producto` int(10) NOT NULL,
  `ID_recibo` int(10) NOT NULL,
  PRIMARY KEY (`ID_Producto`,`ID_recibo`),
  KEY `ID_recibo` (`ID_recibo`),
  KEY `ID_Producto` (`ID_Producto`),
  KEY `ID_recibo_2` (`ID_recibo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contratos`
--

CREATE TABLE `contratos` (
  `ID_Contrato` int(10) NOT NULL AUTO_INCREMENT,
  `ID_Proveedor` int(10) NOT NULL,
  `Cantidad_Producto` int(10) NOT NULL,
  `Vigente` varchar(20) NOT NULL,
  `Descripcion` text NOT NULL,
  `Fecha_Contrato` date NOT NULL,
  `Fecha_Revisado` date NOT NULL,
  `monto_total` float NOT NULL,
  `estado` varchar(1) NOT NULL,
  PRIMARY KEY (`ID_Contrato`),
  KEY `ID_Proveedor` (`ID_Proveedor`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deposito`
--

CREATE TABLE `deposito` (
  `Numero_Deposito` int(30) NOT NULL,
  `ID_Pago` int(10) NOT NULL,
  `monto_depositado` float NOT NULL,
  PRIMARY KEY (`ID_Pago`),
  KEY `ID_Pago` (`ID_Pago`),
  KEY `ID_Pago_2` (`ID_Pago`),
  KEY `ID_Pago_3` (`ID_Pago`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `Pais` varchar(30) DEFAULT NULL,
  `Estado` varchar(30) DEFAULT NULL,
  `Ciudad` varchar(30) DEFAULT NULL,
  `Direccion` varchar(150) DEFAULT NULL,
  `Codigo_Postal` int(10) DEFAULT NULL,
  `ID_Persona` int(10) NOT NULL,
  PRIMARY KEY (`ID_Persona`),
  KEY `ID_Persona` (`ID_Persona`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `distribuye`
--

CREATE TABLE `distribuye` (
  `RIF` varchar(30) NOT NULL,
  `ID_Producto` int(30) NOT NULL,
  PRIMARY KEY (`RIF`,`ID_Producto`),
  KEY `ID_Producto` (`ID_Producto`),
  KEY `RIF` (`RIF`),
  KEY `ID_Producto_2` (`ID_Producto`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envio`
--

CREATE TABLE `envio` (
  `ID_Envio` int(10) NOT NULL AUTO_INCREMENT,
  `Nombre_Empresa` varchar(30) NOT NULL,
  `Costo_Envio` float NOT NULL,
  `Detalles` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_Envio`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `ID_Factura` int(10) NOT NULL AUTO_INCREMENT,
  `Monto` float NOT NULL,
  `Impuesto` float NOT NULL,
  `Fecha_Factura` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ID_Pago` int(10) NOT NULL,
  `ID_Carrito` int(10) NOT NULL,
  `ID_Usuario` int(10) NOT NULL,
  PRIMARY KEY (`ID_Factura`),
  KEY `ID_Pago` (`ID_Pago`),
  KEY `ID_Carrito` (`ID_Carrito`),
  KEY `ID_Usuario` (`ID_Usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_proveedor`
--

CREATE TABLE `historial_proveedor` (
  `ID_Historial_Proveedor` int(10) NOT NULL,
  `ID_Proveedor` int(10) NOT NULL,
  PRIMARY KEY (`ID_Historial_Proveedor`,`ID_Proveedor`),
  KEY `ID_Historial_Proveedor` (`ID_Historial_Proveedor`),
  KEY `ID_Historial_Proveedor_2` (`ID_Historial_Proveedor`),
  KEY `ID_Historial_Proveedor_3` (`ID_Historial_Proveedor`),
  KEY `ID_Proveedor` (`ID_Proveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_usuario`
--

CREATE TABLE `historial_usuario` (
  `ID_Historial` int(10) NOT NULL,
  `ID_Usuario` int(10) NOT NULL,
  PRIMARY KEY (`ID_Historial`,`ID_Usuario`),
  KEY `ID_Historial` (`ID_Historial`),
  KEY `ID_Historial_2` (`ID_Historial`,`ID_Usuario`),
  KEY `ID_Usuario` (`ID_Usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `ID_Pago` int(10) NOT NULL AUTO_INCREMENT,
  `Monto` float NOT NULL,
  `ID_Carrito` int(10) NOT NULL,
  PRIMARY KEY (`ID_Pago`),
  KEY `ID_Carrito` (`ID_Carrito`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `ID_Persona` int(10) NOT NULL AUTO_INCREMENT,
  `User` varchar(50) NOT NULL,
  `Clave` varchar(70) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Telefono` varchar(15) NOT NULL,
  `tipo` varchar(1) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_Persona`),
  UNIQUE KEY `User` (`User`,`Correo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=67 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona_soporte_tecnico`
--

CREATE TABLE `persona_soporte_tecnico` (
  `ID_Pregunta` int(10) NOT NULL,
  `User` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_Pregunta`,`User`),
  KEY `ID_Pregunta` (`ID_Pregunta`),
  KEY `ID_Pregunta_2` (`ID_Pregunta`),
  KEY `User` (`User`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `ID_Producto` int(10) NOT NULL AUTO_INCREMENT,
  `Nombre_Producto` varchar(30) NOT NULL,
  `Cantidad_Inicial` int(30) NOT NULL,
  `Cantidad_Restante` int(30) NOT NULL,
  `Peso` double NOT NULL,
  `Descripcion` text NOT NULL,
  `Precio` double NOT NULL,
  `Tamano` double NOT NULL,
  PRIMARY KEY (`ID_Producto`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=44 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `ID_Proveedor` int(10) NOT NULL AUTO_INCREMENT,
  `ID_Persona` int(10) NOT NULL,
  `RIF` varchar(20) NOT NULL,
  PRIMARY KEY (`ID_Proveedor`),
  UNIQUE KEY `RIF` (`RIF`),
  KEY `ID_Persona` (`ID_Persona`),
  KEY `ID_Persona_2` (`ID_Persona`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recibo_pago`
--

CREATE TABLE `recibo_pago` (
  `ID_Recibo` int(10) NOT NULL AUTO_INCREMENT,
  `descripcion` text NOT NULL,
  `Monto` float NOT NULL,
  `Fecha_Recibo_Pago` date NOT NULL,
  PRIMARY KEY (`ID_Recibo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `selecciona`
--

CREATE TABLE `selecciona` (
  `ID_Producto` int(10) NOT NULL,
  `ID_Carrito` int(10) NOT NULL,
  `Cantidad_Individual` int(10) NOT NULL,
  KEY `ID_Usuario` (`ID_Producto`),
  KEY `ID_Producto` (`ID_Producto`),
  KEY `ID_Carrito` (`ID_Carrito`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `soporte_tecnico`
--

CREATE TABLE `soporte_tecnico` (
  `ID_Pregunta` int(10) NOT NULL AUTO_INCREMENT,
  `ID_Persona` int(10) NOT NULL,
  `Fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Pregunta` text NOT NULL,
  `Respuesta` text NOT NULL,
  PRIMARY KEY (`ID_Pregunta`),
  KEY `ID_Persona` (`ID_Persona`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjetas_debito_credito`
--

CREATE TABLE `tarjetas_debito_credito` (
  `Numero_Tarjeta` int(10) NOT NULL,
  `ID_Pago` int(10) NOT NULL,
  `monto_tarjeta` float NOT NULL,
  PRIMARY KEY (`ID_Pago`),
  KEY `ID_Pagos` (`ID_Pago`),
  KEY `ID_Pagos_2` (`ID_Pago`),
  KEY `ID_Pagos_3` (`ID_Pago`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transferencia`
--

CREATE TABLE `transferencia` (
  `Numero_Transferencia` int(30) NOT NULL,
  `ID_Pago` int(10) NOT NULL,
  `monto_transferido` float NOT NULL,
  PRIMARY KEY (`ID_Pago`),
  KEY `ID_Pagos` (`ID_Pago`),
  KEY `ID_Pagos_2` (`ID_Pago`),
  KEY `ID_Pagos_3` (`ID_Pago`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_registrado_factura`
--

CREATE TABLE `user_registrado_factura` (
  `User` varchar(30) NOT NULL,
  `ID_Factura` int(10) NOT NULL,
  PRIMARY KEY (`User`,`ID_Factura`),
  KEY `ID_Factura` (`ID_Factura`),
  KEY `User` (`User`),
  KEY `ID_Factura_2` (`ID_Factura`),
  KEY `ID_Factura_3` (`ID_Factura`),
  KEY `User_2` (`User`,`ID_Factura`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID_Usuario` int(10) NOT NULL AUTO_INCREMENT,
  `ID_Persona` int(10) NOT NULL,
  PRIMARY KEY (`ID_Usuario`),
  KEY `ID_Persona` (`ID_Persona`),
  KEY `ID_Persona_2` (`ID_Persona`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `administrador_ibfk_1` FOREIGN KEY (`ID_Persona`) REFERENCES `persona` (`ID_Persona`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `AuthAssignment`
--
ALTER TABLE `AuthAssignment`
  ADD CONSTRAINT `authassignment_ibfk_1` FOREIGN KEY (`itemname`) REFERENCES `AuthItem` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `authassignment_ibfk_2` FOREIGN KEY (`ID_Persona`) REFERENCES `persona` (`ID_Persona`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `AuthItemChild`
--
ALTER TABLE `AuthItemChild`
  ADD CONSTRAINT `AuthItemChild_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `AuthItem` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `AuthItemChild_ibfk_2` FOREIGN KEY (`child`) REFERENCES `AuthItem` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuario` (`ID_Usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `contenido_producto_recibo_pago`
--
ALTER TABLE `contenido_producto_recibo_pago`
  ADD CONSTRAINT `contenido_producto_recibo_pago_ibfk_1` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contenido_producto_recibo_pago_ibfk_2` FOREIGN KEY (`ID_recibo`) REFERENCES `recibo_pago` (`ID_Recibo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `contratos`
--
ALTER TABLE `contratos`
  ADD CONSTRAINT `contratos_ibfk_1` FOREIGN KEY (`ID_Proveedor`) REFERENCES `proveedor` (`ID_Proveedor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `deposito`
--
ALTER TABLE `deposito`
  ADD CONSTRAINT `deposito_ibfk_1` FOREIGN KEY (`ID_Pago`) REFERENCES `pagos` (`ID_Pago`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD CONSTRAINT `direccion_ibfk_1` FOREIGN KEY (`ID_Persona`) REFERENCES `persona` (`ID_Persona`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `distribuye`
--
ALTER TABLE `distribuye`
  ADD CONSTRAINT `distribuye_ibfk_1` FOREIGN KEY (`RIF`) REFERENCES `proveedor` (`RIF`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `distribuye_ibfk_2` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`ID_Pago`) REFERENCES `pagos` (`ID_Pago`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`ID_Carrito`) REFERENCES `carrito` (`ID_Carrito`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `factura_ibfk_3` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuario` (`ID_Usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `historial_proveedor`
--
ALTER TABLE `historial_proveedor`
  ADD CONSTRAINT `historial_proveedor_ibfk_1` FOREIGN KEY (`ID_Proveedor`) REFERENCES `proveedor` (`ID_Proveedor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `historial_usuario`
--
ALTER TABLE `historial_usuario`
  ADD CONSTRAINT `historial_usuario_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuario` (`ID_Usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`ID_Carrito`) REFERENCES `carrito` (`ID_Carrito`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `persona_soporte_tecnico`
--
ALTER TABLE `persona_soporte_tecnico`
  ADD CONSTRAINT `persona_soporte_tecnico_ibfk_1` FOREIGN KEY (`User`) REFERENCES `persona` (`User`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD CONSTRAINT `proveedor_ibfk_1` FOREIGN KEY (`ID_Persona`) REFERENCES `persona` (`ID_Persona`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `selecciona`
--
ALTER TABLE `selecciona`
  ADD CONSTRAINT `selecciona_ibfk_2` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `selecciona_ibfk_3` FOREIGN KEY (`ID_Carrito`) REFERENCES `carrito` (`ID_Carrito`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `soporte_tecnico`
--
ALTER TABLE `soporte_tecnico`
  ADD CONSTRAINT `soporte_tecnico_ibfk_1` FOREIGN KEY (`ID_Persona`) REFERENCES `persona` (`ID_Persona`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tarjetas_debito_credito`
--
ALTER TABLE `tarjetas_debito_credito`
  ADD CONSTRAINT `tarjetas_debito_credito_ibfk_1` FOREIGN KEY (`ID_Pago`) REFERENCES `pagos` (`ID_Pago`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `transferencia`
--
ALTER TABLE `transferencia`
  ADD CONSTRAINT `transferencia_ibfk_1` FOREIGN KEY (`ID_Pago`) REFERENCES `pagos` (`ID_Pago`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `user_registrado_factura`
--
ALTER TABLE `user_registrado_factura`
  ADD CONSTRAINT `user_registrado_factura_ibfk_1` FOREIGN KEY (`User`) REFERENCES `persona` (`User`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_registrado_factura_ibfk_2` FOREIGN KEY (`ID_Factura`) REFERENCES `factura` (`ID_Factura`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`ID_Persona`) REFERENCES `persona` (`ID_Persona`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
