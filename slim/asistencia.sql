-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-06-2017 a las 01:58:54
-- Versión del servidor: 5.6.16
-- Versión de PHP: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `asistencia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrativos`
--

CREATE TABLE IF NOT EXISTS `administrativos` (
  `id_administrativo` int(10) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(10) NOT NULL,
  PRIMARY KEY (`id_administrativo`),
  KEY `administrativos_ibfk_1` (`id_usuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `administrativos`
--

INSERT INTO `administrativos` (`id_administrativo`, `id_usuario`) VALUES
(1, 1),
(2, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE IF NOT EXISTS `alumnos` (
  `id_alumno` int(10) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(10) NOT NULL,
  PRIMARY KEY (`id_alumno`),
  KEY `alumnos_ibfk_1` (`id_usuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`id_alumno`, `id_usuario`) VALUES
(1, 3),
(2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos-materias`
--

CREATE TABLE IF NOT EXISTS `alumnos-materias` (
  `id_alumno` int(10) NOT NULL,
  `id_materia` int(10) NOT NULL,
  `id_division` int(10) NOT NULL,
  `id_comision` int(10) NOT NULL,
  `estado` varchar(15) NOT NULL,
  PRIMARY KEY (`id_alumno`,`id_materia`),
  UNIQUE KEY `id_alumno` (`id_alumno`,`id_materia`),
  KEY `alumnos-materias_ibfk_2` (`id_materia`),
  KEY `alumnos-materias_ibfk_3` (`id_division`),
  KEY `alumnos-materias_ibfk_4` (`id_comision`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `alumnos-materias`
--

INSERT INTO `alumnos-materias` (`id_alumno`, `id_materia`, `id_division`, `id_comision`, `estado`) VALUES
(1, 1, 1, 1, 'Regular'),
(2, 2, 4, 4, 'Regular');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencias`
--

CREATE TABLE IF NOT EXISTS `asistencias` (
  `id_alumno` int(10) NOT NULL,
  `id_comision` int(10) NOT NULL,
  `fecha` varchar(20) NOT NULL,
  `estado` varchar(20) NOT NULL,
  PRIMARY KEY (`id_alumno`,`id_comision`,`fecha`),
  UNIQUE KEY `id_alumno` (`id_alumno`,`id_comision`,`fecha`),
  KEY `id_comision` (`id_comision`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comisiones`
--

CREATE TABLE IF NOT EXISTS `comisiones` (
  `id_comision` int(10) NOT NULL AUTO_INCREMENT,
  `id_materia` int(10) NOT NULL,
  `id_division` int(10) NOT NULL,
  `aula` int(10) NOT NULL,
  `dia` varchar(15) NOT NULL,
  `turno` varchar(15) NOT NULL,
  PRIMARY KEY (`id_comision`),
  UNIQUE KEY `aula` (`aula`,`dia`,`turno`),
  UNIQUE KEY `id_materia` (`id_materia`,`id_division`),
  KEY `id_division` (`id_division`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `comisiones`
--

INSERT INTO `comisiones` (`id_comision`, `id_materia`, `id_division`, `aula`, `dia`, `turno`) VALUES
(1, 1, 1, 304, 'Lunes', 'Mañana'),
(4, 2, 4, 309, 'Jueves', 'Mañana');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `divisiones`
--

CREATE TABLE IF NOT EXISTS `divisiones` (
  `id_division` int(10) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(30) NOT NULL,
  `cuatrimestre` int(5) NOT NULL,
  PRIMARY KEY (`id_division`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `divisiones`
--

INSERT INTO `divisiones` (`id_division`, `descripcion`, `cuatrimestre`) VALUES
(1, '1A', 1),
(2, '1B', 1),
(3, '2A', 2),
(4, '3A', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE IF NOT EXISTS `materias` (
  `id_materia` int(10) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(20) NOT NULL,
  `cuatrimestre` int(5) NOT NULL,
  PRIMARY KEY (`id_materia`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`id_materia`, `descripcion`, `cuatrimestre`) VALUES
(1, 'Ingles I', 1),
(2, 'Estadistica', 3),
(3, 'Programación I', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE IF NOT EXISTS `profesores` (
  `id_profesor` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id_profesor`),
  KEY `profesores_ibfk_1` (`id_usuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`id_profesor`, `id_usuario`) VALUES
(1, 2),
(2, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores-materias`
--

CREATE TABLE IF NOT EXISTS `profesores-materias` (
  `id_profesor` int(11) NOT NULL,
  `id_materia` int(11) NOT NULL,
  `id_division` int(11) NOT NULL,
  `id_comision` int(11) NOT NULL,
  KEY `profesores-materias_ibfk_1` (`id_profesor`),
  KEY `profesores-materias_ibfk_2` (`id_materia`),
  KEY `profesores-materias_ibfk_3` (`id_division`),
  KEY `profesores-materias_ibfk_4` (`id_comision`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `profesores-materias`
--

INSERT INTO `profesores-materias` (`id_profesor`, `id_materia`, `id_division`, `id_comision`) VALUES
(1, 2, 4, 4),
(2, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(10) NOT NULL AUTO_INCREMENT,
  `legajo` int(10) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `calle` varchar(20) NOT NULL,
  `altura` int(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `tipo` varchar(15) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `legajo` (`legajo`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `legajo`, `nombre`, `apellido`, `calle`, `altura`, `email`, `password`, `tipo`) VALUES
(1, 300, 'Maria', 'Juana', 'Bartolomé Mitre', 1352, 'marijuana@gmail.com', '123456', 'Administrativo'),
(2, 200, 'Diego', 'Cao', 'Ecuador', 750, 'diegc@gmail.com', '123456', 'Profesor'),
(3, 100, 'Lucia', 'Perez', 'Pueyrredón', 665, 'luperez@gmail.com', '123456', 'Alumno'),
(4, 101, 'Jessica', 'Alvarez', 'Paso', 65, 'jessalv@gmail.com', '123456', 'Alumno'),
(5, 301, 'Alejandra', 'Slovski', 'Azcuenaga', 480, 'aloAza@gmail.com', '123456', 'Administrativo'),
(6, 201, 'Mariana', 'Juarez', 'Corrrientes', 1258, 'marijua@gmail.com', '123456', 'Profesor');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrativos`
--
ALTER TABLE `administrativos`
  ADD CONSTRAINT `administrativos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD CONSTRAINT `alumnos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `alumnos-materias`
--
ALTER TABLE `alumnos-materias`
  ADD CONSTRAINT `alumnos-materias_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `alumnos-materias_ibfk_2` FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id_materia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `alumnos-materias_ibfk_3` FOREIGN KEY (`id_division`) REFERENCES `divisiones` (`id_division`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `alumnos-materias_ibfk_4` FOREIGN KEY (`id_comision`) REFERENCES `comisiones` (`id_comision`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD CONSTRAINT `asistencias_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `asistencias_ibfk_2` FOREIGN KEY (`id_comision`) REFERENCES `comisiones` (`id_comision`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `comisiones`
--
ALTER TABLE `comisiones`
  ADD CONSTRAINT `comisiones_ibfk_1` FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id_materia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comisiones_ibfk_2` FOREIGN KEY (`id_division`) REFERENCES `divisiones` (`id_division`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD CONSTRAINT `profesores_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesores-materias`
--
ALTER TABLE `profesores-materias`
  ADD CONSTRAINT `profesores-materias_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `profesores` (`id_profesor`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `profesores-materias_ibfk_2` FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id_materia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `profesores-materias_ibfk_3` FOREIGN KEY (`id_division`) REFERENCES `divisiones` (`id_division`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `profesores-materias_ibfk_4` FOREIGN KEY (`id_comision`) REFERENCES `comisiones` (`id_comision`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
