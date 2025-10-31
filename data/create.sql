-- Cleaned & MariaDB-compatible OpenFlights schema
-- Author: Aditya Chitransh (WanderQuery setup)

-- 1️⃣ Create database if not exists
CREATE DATABASE IF NOT EXISTS openflights;
USE openflights;

-- 2️⃣ Create user (optional, only run once manually)
-- CREATE USER 'openflights'@'%' IDENTIFIED BY 'SecurePass123!';
-- GRANT ALL PRIVILEGES ON openflights.* TO 'openflights'@'%';
-- FLUSH PRIVILEGES;

-- 3️⃣ Tables
DROP TABLE IF EXISTS `airlines`;
CREATE TABLE `airlines` (
  `name` TEXT,
  `iata` VARCHAR(2) DEFAULT NULL,
  `icao` VARCHAR(3) DEFAULT NULL,
  `callsign` TEXT,
  `country` TEXT,
  `country_code` VARCHAR(2),
  `alid` INT(11) NOT NULL AUTO_INCREMENT,
  `uid` INT(11) DEFAULT NULL,
  `alias` TEXT,
  `mode` CHAR(1) DEFAULT 'F',
  `active` VARCHAR(1) DEFAULT 'N',
  `source` TEXT,
  `frequency` INT(11) DEFAULT 0,
  PRIMARY KEY (`alid`),
  KEY `iata` (`iata`),
  KEY `icao` (`icao`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `airports`;
CREATE TABLE `airports` (
  `airport_id` INT,
  `name` TEXT NOT NULL,
  `city` TEXT,
  `country` TEXT,
  `country_code` VARCHAR(2),
  `iata` VARCHAR(3) DEFAULT NULL,
  `icao` VARCHAR(4) DEFAULT NULL,
  `x` DOUBLE NOT NULL,
  `y` DOUBLE NOT NULL,
  `elevation` INT(11) DEFAULT NULL,
  `apid` INT(11) NOT NULL AUTO_INCREMENT,
  `uid` INT(11) DEFAULT NULL,
  `timezone` FLOAT DEFAULT NULL,
  `dst` CHAR(1) DEFAULT NULL,
  `tz_id` TEXT,
  `type` TEXT,
  `source` TEXT,
  PRIMARY KEY (`apid`),
  KEY `iata` (`iata`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE UNIQUE INDEX `iata_idx` ON airports(iata);
CREATE UNIQUE INDEX `icao_idx` ON airports(icao);


DROP TABLE IF EXISTS `countries`;
CREATE TABLE `countries` (
  `name` TEXT,
  `iso_code` VARCHAR(2) DEFAULT NULL,
  `dafif_code` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`dafif_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `planes`;
CREATE TABLE `planes` (
  `name` VARCHAR(80),
  `abbr` TEXT,
  `speed` DOUBLE DEFAULT NULL,
  `plid` INT(11) NOT NULL AUTO_INCREMENT,
  `public` CHAR(1) DEFAULT 'N',
  `iata` TEXT DEFAULT NULL,
  `icao` TEXT DEFAULT NULL,
  `frequency` INT(11) DEFAULT 0,
  PRIMARY KEY (`plid`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `routes`;
CREATE TABLE `routes` (
  `airline` VARCHAR(3) DEFAULT NULL,
  `alid` INT(11) DEFAULT NULL,
  `src_ap` VARCHAR(4) DEFAULT NULL,
  `src_apid` INT(11) DEFAULT NULL,
  `dst_ap` VARCHAR(4) DEFAULT NULL,
  `dst_apid` INT(11) DEFAULT NULL,
  `codeshare` TEXT,
  `stops` TEXT,
  `equipment` TEXT,
  `added` VARCHAR(1) DEFAULT NULL,
  `rid` INT(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`rid`),
  UNIQUE KEY `alid` (`alid`,`src_apid`,`dst_apid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- End of schema
