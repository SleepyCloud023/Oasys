-- MySQL dump 10.13  Distrib 5.7.38, for Linux (x86_64)
--
-- Host: localhost    Database: OasysDB
-- ------------------------------------------------------
-- Server version	5.7.38-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add dataset',6,'add_dataset'),(22,'Can change dataset',6,'change_dataset'),(23,'Can delete dataset',6,'delete_dataset'),(24,'Can view dataset',6,'view_dataset'),(25,'Can add dataset permission',7,'add_datasetpermission'),(26,'Can change dataset permission',7,'change_datasetpermission'),(27,'Can delete dataset permission',7,'delete_datasetpermission'),(28,'Can view dataset permission',7,'view_datasetpermission'),(29,'Can add image metadata',8,'add_imagemetadata'),(30,'Can change image metadata',8,'change_imagemetadata'),(31,'Can delete image metadata',8,'delete_imagemetadata'),(32,'Can view image metadata',8,'view_imagemetadata'),(33,'Can add user',9,'add_customuser'),(34,'Can change user',9,'change_customuser'),(35,'Can delete user',9,'delete_customuser'),(36,'Can view user',9,'view_customuser'),(37,'Can add team dataset',10,'add_teamdataset'),(38,'Can change team dataset',10,'change_teamdataset'),(39,'Can delete team dataset',10,'delete_teamdataset'),(40,'Can view team dataset',10,'view_teamdataset'),(41,'Can add team',11,'add_team'),(42,'Can change team',11,'change_team'),(43,'Can delete team',11,'delete_team'),(44,'Can view team',11,'view_team'),(45,'Can add user team',12,'add_userteam'),(46,'Can change user team',12,'change_userteam'),(47,'Can delete user team',12,'delete_userteam'),(48,'Can view user team',12,'view_userteam'),(49,'Can add workspace dataset',13,'add_workspacedataset'),(50,'Can change workspace dataset',13,'change_workspacedataset'),(51,'Can delete workspace dataset',13,'delete_workspacedataset'),(52,'Can view workspace dataset',13,'view_workspacedataset'),(53,'Can add user workspace',14,'add_userworkspace'),(54,'Can change user workspace',14,'change_userworkspace'),(55,'Can delete user workspace',14,'delete_userworkspace'),(56,'Can view user workspace',14,'view_userworkspace'),(57,'Can add workspace',15,'add_workspace'),(58,'Can change workspace',15,'change_workspace'),(59,'Can delete workspace',15,'delete_workspace'),(60,'Can view workspace',15,'view_workspace');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `common_customuser`
--

DROP TABLE IF EXISTS `common_customuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `common_customuser` (
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `id` char(32) NOT NULL,
  `oauth_flag` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `common_customuser`
--

LOCK TABLES `common_customuser` WRITE;
/*!40000 ALTER TABLE `common_customuser` DISABLE KEYS */;
INSERT INTO `common_customuser` VALUES ('pbkdf2_sha256$260000$M1B8rHCXSOy9wvwSBKoyrT$l2OjxZvagNvIBzMGc++tajXYFSgFvY1k9AygB/vVg4g=',NULL,1,'euiryeong','','','wjddmflud@gmail.com',1,1,'2022-04-20 14:29:21.366080','1a5433967fe6426d87556823e564d56b',0),('pbkdf2_sha256$260000$vGll4zWTLfZxb7vOiw1O5P$seZDpDTyIuwjtQLWyiO1vwR9St2GdXrQSHjiFveau/0=',NULL,0,'guest11','','','guest@oasys.ml',0,1,'2022-05-02 08:51:43.287304','1c27d30efa81409b97582a5ce07051bc',0),('pbkdf2_sha256$260000$9lpvebLeROJC5GSYXoBoC6$QPN44pvHJ+Hh0hT4wduamY8oZgKy1IlCkfqTX5H0TZA=',NULL,0,'김태형','','','gnflwhf352@gmail.com',0,1,'2022-04-20 14:41:27.134434','5796f18adfb645ae8c0cb841d843ac80',0),('!VtRLnR7o81r5p11v5IlsjbHjD02u728Bynrp8aD1',NULL,0,'태형김','태형','김','gnflwhf352@gmail.com',0,1,'2022-04-24 14:07:36.789779','67d98878912b4e3ba81c1e461d6612a7',1),('pbkdf2_sha256$260000$PDYNmTdaCybo2Rgv7Xm4aA$lwCVvuqJ7ENQ/KLbK9OEtts9wzVUYyrD7oIwSXGXKYc=',NULL,0,'정의령','','','hibyby2000@naver.com',0,1,'2022-04-20 14:38:26.035507','a3dcf03caaa4488491fea63113f20452',0),('!FJs2n5fUyodiAJfOKkYM44bB1j9vIE25jGFftJWJ',NULL,0,'뚠뚠','뚠','뚠','wjddmflud@gmail.com',0,1,'2022-04-24 12:36:22.776300','f362064848274ef8a7fa368340a4a2a0',1);
/*!40000 ALTER TABLE `common_customuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `common_customuser_groups`
--

DROP TABLE IF EXISTS `common_customuser_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `common_customuser_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customuser_id` char(32) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `common_customuser_groups_customuser_id_group_id_ed6feb18_uniq` (`customuser_id`,`group_id`),
  KEY `common_customuser_groups_group_id_42fec288_fk_auth_group_id` (`group_id`),
  CONSTRAINT `common_customuser_gr_customuser_id_fd94cee2_fk_common_cu` FOREIGN KEY (`customuser_id`) REFERENCES `common_customuser` (`id`),
  CONSTRAINT `common_customuser_groups_group_id_42fec288_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `common_customuser_groups`
--

LOCK TABLES `common_customuser_groups` WRITE;
/*!40000 ALTER TABLE `common_customuser_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `common_customuser_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `common_customuser_user_permissions`
--

DROP TABLE IF EXISTS `common_customuser_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `common_customuser_user_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customuser_id` char(32) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `common_customuser_user_p_customuser_id_permission_9c90713b_uniq` (`customuser_id`,`permission_id`),
  KEY `common_customuser_us_permission_id_894c9c92_fk_auth_perm` (`permission_id`),
  CONSTRAINT `common_customuser_us_customuser_id_45f4c3a1_fk_common_cu` FOREIGN KEY (`customuser_id`) REFERENCES `common_customuser` (`id`),
  CONSTRAINT `common_customuser_us_permission_id_894c9c92_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `common_customuser_user_permissions`
--

LOCK TABLES `common_customuser_user_permissions` WRITE;
/*!40000 ALTER TABLE `common_customuser_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `common_customuser_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dataset`
--

DROP TABLE IF EXISTS `dataset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dataset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `user` char(32) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `rep_image` varchar(300) DEFAULT NULL,
  `local_flag` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dataset`
--

LOCK TABLES `dataset` WRITE;
/*!40000 ALTER TABLE `dataset` DISABLE KEYS */;
INSERT INTO `dataset` VALUES (1,'sample dataset1','1a5433967fe6426d87556823e564d56b','2022-02-26 17:45:35','2022-02-26 17:46:55',NULL,0),(2,'sample dataset2','1a5433967fe6426d87556823e564d56b','2022-02-26 17:45:35','2022-02-26 17:46:55',NULL,0),(3,'의령의 프로젝트','1a5433967fe6426d87556823e564d56b','2022-02-26 17:45:35','2022-02-26 17:46:55',NULL,0),(4,'태형의 프로젝트','1a5433967fe6426d87556823e564d56b','2022-02-26 17:45:35','2022-02-26 17:46:55',NULL,0);
/*!40000 ALTER TABLE `dataset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` char(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_common_customuser_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_common_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `common_customuser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(9,'common','customuser'),(11,'common','team'),(12,'common','userteam'),(14,'common','userworkspace'),(15,'common','workspace'),(4,'contenttypes','contenttype'),(6,'dataCRUD','dataset'),(7,'dataCRUD','datasetpermission'),(8,'dataCRUD','imagemetadata'),(10,'dataCRUD','teamdataset'),(13,'dataCRUD','workspacedataset'),(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2022-04-20 14:27:31.810138'),(2,'contenttypes','0002_remove_content_type_name','2022-04-20 14:27:31.877095'),(3,'auth','0001_initial','2022-04-20 14:27:32.077635'),(4,'auth','0002_alter_permission_name_max_length','2022-04-20 14:27:32.117828'),(5,'auth','0003_alter_user_email_max_length','2022-04-20 14:27:32.131516'),(6,'auth','0004_alter_user_username_opts','2022-04-20 14:27:32.144059'),(7,'auth','0005_alter_user_last_login_null','2022-04-20 14:27:32.153338'),(8,'auth','0006_require_contenttypes_0002','2022-04-20 14:27:32.157457'),(9,'auth','0007_alter_validators_add_error_messages','2022-04-20 14:27:32.166387'),(10,'auth','0008_alter_user_username_max_length','2022-04-20 14:27:32.176021'),(11,'auth','0009_alter_user_last_name_max_length','2022-04-20 14:27:32.185573'),(12,'auth','0010_alter_group_name_max_length','2022-04-20 14:27:32.225933'),(13,'auth','0011_update_proxy_permissions','2022-04-20 14:27:32.236467'),(14,'auth','0012_alter_user_first_name_max_length','2022-04-20 14:27:32.246044'),(15,'common','0001_initial','2022-04-20 14:27:32.469936'),(16,'admin','0001_initial','2022-04-20 14:27:32.573706'),(17,'admin','0002_logentry_remove_auto_add','2022-04-20 14:27:32.586163'),(18,'admin','0003_logentry_add_action_flag_choices','2022-04-20 14:27:32.598232'),(19,'dataCRUD','0001_initial','2022-04-20 14:27:32.606900'),(20,'sessions','0001_initial','2022-04-20 14:27:32.640135'),(21,'common','0002_team_userteam','2022-04-21 00:42:46.239268'),(22,'dataCRUD','0002_auto_20220421_0042','2022-04-21 00:42:46.247206'),(23,'common','0002_userworkspace_workspace','2022-04-21 00:54:12.433218'),(24,'dataCRUD','0002_auto_20220421_0053','2022-04-21 00:54:12.440322'),(25,'dataCRUD','0002_auto_20220421_0109','2022-04-21 01:09:21.137076'),(26,'dataCRUD','0002_auto_20220421_0137','2022-04-21 01:37:57.912027'),(27,'dataCRUD','0002_auto_20220421_0141','2022-04-21 01:42:36.632920');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('22zn6b1do3rsjzsd5bhnc8x3cur5m3nq','eyJ1c2VyIjp7InVzZXJuYW1lIjoiXHVjODE1XHVjNzU4XHViODM5IiwiaWQiOiJhM2RjZjAzYy1hYWE0LTQ4ODQtOTFmZS1hNjMxMTNmMjA0NTIifX0:1ni48g:cUbgszyteXP4HkNh3RYFfO1-CbQwQqOm8V1dBvKq0Ho','2022-05-07 01:00:42.438522'),('29qt6idm8j6z9z17n6365249puqfn4oa','eyJ1c2VyIjp7InVzZXJuYW1lIjoiXHVjODE1XHVjNzU4XHViODM5IiwiaWQiOiJhM2RjZjAzYy1hYWE0LTQ4ODQtOTFmZS1hNjMxMTNmMjA0NTIifX0:1np3sG:8hpybxa3XgCY4P2dR0fFNI1USY2GEpqD3vMqUe0kKtk','2022-05-26 08:08:40.860102'),('ax8cpjule69nidijkl1cst08takyll2g','eyJ1c2VyIjp7InVzZXJuYW1lIjoiXHVkMGRjXHVkNjE1XHVhZTQwIiwiaWQiOiI2N2Q5ODg3OC05MTJiLTRlM2ItYTgxYy0xZTQ2MWQ2NjEyYTcifX0:1njlo5:bsnSnLnDzO75IPoIyTedjfSdZnhGdifSVGd-yojflTg','2022-05-11 17:50:29.055011'),('bb8r9n21z2bwgm52mxrfp2uppedvacxx','eyJ1c2VyIjp7InVzZXJuYW1lIjoiXHVjODE1XHVjNzU4XHViODM5IiwiaWQiOiJhM2RjZjAzYy1hYWE0LTQ4ODQtOTFmZS1hNjMxMTNmMjA0NTIifX0:1nj9lt:b4-IDTRmMcOCA3Wbc7RfCrQMmgFHOC7AFhsHT09Qehw','2022-05-10 01:13:41.058648'),('cnsplpasi8jf01ur7qzct9154akgiz1d','eyJ1c2VyIjp7InVzZXJuYW1lIjoiXHVjODE1XHVjNzU4XHViODM5IiwiaWQiOiJhM2RjZjAzYy1hYWE0LTQ4ODQtOTFmZS1hNjMxMTNmMjA0NTIifX0:1npRlF:le-HSzsQ6A9tXFaLChNQvyagxjItud-8zhEfjTj5Q90','2022-05-27 09:39:01.746695'),('k4myponddnomu484fqvkuoazghubwgjp','eyJ1c2VyIjp7InVzZXJuYW1lIjoiXHVkMGRjXHVkNjE1XHVhZTQwIiwiaWQiOiI2N2Q5ODg3OC05MTJiLTRlM2ItYTgxYy0xZTQ2MWQ2NjEyYTcifX0:1nidGB:Ge7m2g4Tq3kdqwT-tJcXNlgDLmktQy1RfuivjjivIVc','2022-05-08 14:30:47.990385'),('k8yrp4l4j1dvseau6wdeb0str2gjn8w7','eyJ1c2VyIjp7InVzZXJuYW1lIjoiXHVkMGRjXHVkNjE1XHVhZTQwIiwiaWQiOiI2N2Q5ODg3OC05MTJiLTRlM2ItYTgxYy0xZTQ2MWQ2NjEyYTcifX0:1nkjfB:mEm9SpJO65G56_GgK0GvzGY0QHV2Gnffk2CH1D4O5yw','2022-05-14 09:45:17.134134'),('kttr4z97fdoofs2mrjbf6kn7etpfk7hv','eyJ1c2VyIjp7InVzZXJuYW1lIjoiXHVjODE1XHVjNzU4XHViODM5IiwiaWQiOiJhM2RjZjAzYy1hYWE0LTQ4ODQtOTFmZS1hNjMxMTNmMjA0NTIifX0:1npRyv:xZMM_HTytdi2nzsMHmOH4emXN396A6Ohyb5Cugx-xqs','2022-05-27 09:53:09.436033'),('mr41zoav6yo59wp1a4mmrhkif9eemezh','eyJ1c2VyIjp7InVzZXJuYW1lIjoiXHVjODE1XHVjNzU4XHViODM5IiwiaWQiOiJhM2RjZjAzYy1hYWE0LTQ4ODQtOTFmZS1hNjMxMTNmMjA0NTIifX0:1np7rg:z4s3qITd1DDKKtrkjbebu1lTjYQRRaAuJOVZYPas0hA','2022-05-26 12:24:20.923106'),('n7kqu8qdrsgx8vcjpdzca50bm5o8avgr','eyJ1c2VyIjp7InVzZXJuYW1lIjoiZ3Vlc3QxMSIsImlkIjoiMWMyN2QzMGUtZmE4MS00MDliLTk3NTgtMmE1Y2UwNzA1MWJjIn19:1npgUk:R5CoGnMSNsOxf4uIDTMSMsDEtIC1NbDv4ptBxvC8k-4','2022-05-28 01:22:58.657451'),('n9m247x7c6zxd3yyraihrkwksig1x4kc','eyJ1c2VyIjp7InVzZXJuYW1lIjoiXHVkMGRjXHVkNjE1XHVhZTQwIiwiaWQiOiI2N2Q5ODg3OC05MTJiLTRlM2ItYTgxYy0xZTQ2MWQ2NjEyYTcifX0:1njmG7:TcX8-6Wy1stgllxfTMdR_wyG-QYcP0xHgRZ38ra1Ex8','2022-05-11 18:19:27.446235'),('nl4ancinpjqbcrmci4aas6pty5iguxpn','.eJyrViotTi1SsqoG03mJualKVkoxpUlmiQYQUklHKTMFKJZmbGZkYGZioWtiYWSua5KaZqGbaJ6WqGtsZmFsYpBokmgEVFtbCwDYKxbi:1nifXj:uvmpOvCbzy_29ri6tyZxPssJyMN52qprTCKOGFmYpBc','2022-05-08 16:57:03.314201'),('ozn6zutw4rrilj9ekt74nc5416n8lptt','eyJ1c2VyIjp7InVzZXJuYW1lIjoiXHVkMGRjXHVkNjE1XHVhZTQwIiwiaWQiOiI2N2Q5ODg3OC05MTJiLTRlM2ItYTgxYy0xZTQ2MWQ2NjEyYTcifX0:1njMGB:FiFs7shg0P2WHsXK61GLHq97KYxk3yxuqwSLFK8wp3o','2022-05-10 14:33:47.424080'),('piaa2bve1mb7yflmxz5hzxz7yr1z02wr','eyJ1c2VyIjp7InVzZXJuYW1lIjoiXHVjODE1XHVjNzU4XHViODM5IiwiaWQiOiJhM2RjZjAzYy1hYWE0LTQ4ODQtOTFmZS1hNjMxMTNmMjA0NTIifX0:1nliaD:ZLAgHPKUkq9qbbk_8xZuc_wvZlceIxnqJAL2-LLaEt4','2022-05-17 02:48:13.482792'),('q1n6gxcx1d66p7sfrr5tzx1q2pv76pcr','eyJ1c2VyIjp7InVzZXJuYW1lIjoiXHVjODE1XHVjNzU4XHViODM5IiwiaWQiOiJhM2RjZjAzYy1hYWE0LTQ4ODQtOTFmZS1hNjMxMTNmMjA0NTIifX0:1ni2MO:-wFMO1dXWjL1jgulpgeGKNK7h9YjBWlx2_xuRkPifQw','2022-05-06 23:06:44.865556'),('s944ef9mw9q9258qxhp2asr66sv2vf3q','eyJ1c2VyIjp7InVzZXJuYW1lIjoiXHVjODE1XHVjNzU4XHViODM5IiwiaWQiOiJhM2RjZjAzYy1hYWE0LTQ4ODQtOTFmZS1hNjMxMTNmMjA0NTIifX0:1nirdE:_Ztc-y2PfBv2z9ZWis4RTP5hyll3pDaQisndyBrPM-U','2022-05-09 05:51:32.790106'),('tt8vx3fvxm4u2tpp4znbx7re1e3gfdd4','eyJ1c2VyIjp7InVzZXJuYW1lIjoiXHVjODE1XHVjNzU4XHViODM5IiwiaWQiOiJhM2RjZjAzYy1hYWE0LTQ4ODQtOTFmZS1hNjMxMTNmMjA0NTIifX0:1npsIJ:BTHPTJ66qqC-eYajHEIw66-cx-kQCXza52vY7C_go0o','2022-05-28 13:58:55.840393');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_metadata`
--

DROP TABLE IF EXISTS `image_metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image_metadata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `annotation` json DEFAULT NULL,
  `image_url` varchar(300) DEFAULT NULL,
  `image_name` varchar(50) DEFAULT NULL,
  `image_size` varchar(30) DEFAULT NULL,
  `dataset_id` int(11) DEFAULT NULL,
  `size` varchar(20) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dataset_id` (`dataset_id`),
  CONSTRAINT `dataset_id` FOREIGN KEY (`dataset_id`) REFERENCES `dataset` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_metadata`
--

LOCK TABLES `image_metadata` WRITE;
/*!40000 ALTER TABLE `image_metadata` DISABLE KEYS */;
INSERT INTO `image_metadata` VALUES (3,'\"{\\n    \\\"category_list\\\": [],\\n    \\\"tag_list\\\": [],\\n    \\\"box_object_list\\\": [\\n        {\\n            \\\"id\\\": 0,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    138,\\n                    15\\n                ],\\n                [\\n                    224,\\n                    15\\n                ],\\n                [\\n                    224,\\n                    46\\n                ],\\n                [\\n                    138,\\n                    46\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\")계경순대국산\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 1,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    156,\\n                    68\\n                ],\\n                [\\n                    188,\\n                    68\\n                ],\\n                [\\n                    188,\\n                    76\\n                ],\\n                [\\n                    156,\\n                    76\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"사이드(단주\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 2,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    55,\\n                    151\\n                ],\\n                [\\n                    103,\\n                    151\\n                ],\\n                [\\n                    103,\\n                    176\\n                ],\\n                [\\n                    55,\\n                    176\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"계경찰순대 s0m의\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 3,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    153,\\n                    151\\n                ],\\n                [\\n                    191,\\n                    151\\n                ],\\n                [\\n                    191,\\n                    178\\n                ],\\n                [\\n                    153,\\n                    178\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"모뜸순대 9,000원\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 4,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    248,\\n                    151\\n                ],\\n                [\\n                    277,\\n                    151\\n                ],\\n                [\\n                    277,\\n                    176\\n                ],\\n                [\\n                    248,\\n                    176\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"찐만두 500원\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 5,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    245,\\n                    247\\n                ],\\n                [\\n                    285,\\n                    247\\n                ],\\n                [\\n                    285,\\n                    274\\n                ],\\n                [\\n                    245,\\n                    274\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"모음수육 12000원\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 6,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    47,\\n                    249\\n                ],\\n                [\\n                    109,\\n                    249\\n                ],\\n                [\\n                    109,\\n                    281\\n                ],\\n                [\\n                    47,\\n                    281\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"추가냉면불고기 4,000원\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 7,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    156,\\n                    264\\n                ],\\n                [\\n                    186,\\n                    264\\n                ],\\n                [\\n                    186,\\n                    277\\n                ],\\n                [\\n                    156,\\n                    277\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"7,000원\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 8,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    247,\\n                    301\\n                ],\\n                [\\n                    285,\\n                    301\\n                ],\\n                [\\n                    285,\\n                    317\\n                ],\\n                [\\n                    247,\\n                    317\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"소주\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 9,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    229,\\n                    317\\n                ],\\n                [\\n                    305,\\n                    317\\n                ],\\n                [\\n                    305,\\n                    333\\n                ],\\n                [\\n                    229,\\n                    333\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"4,000편\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 10,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    59,\\n                    353\\n                ],\\n                [\\n                    97,\\n                    353\\n                ],\\n                [\\n                    97,\\n                    383\\n                ],\\n                [\\n                    59,\\n                    383\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"감자탕 21,000원\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 11,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    154,\\n                    366\\n                ],\\n                [\\n                    191,\\n                    366\\n                ],\\n                [\\n                    191,\\n                    380\\n                ],\\n                [\\n                    154,\\n                    380\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"12,000원\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 12,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    252,\\n                    368\\n                ],\\n                [\\n                    280,\\n                    368\\n                ],\\n                [\\n                    280,\\n                    374\\n                ],\\n                [\\n                    252,\\n                    374\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"스\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 13,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    236,\\n                    380\\n                ],\\n                [\\n                    310,\\n                    380\\n                ],\\n                [\\n                    310,\\n                    404\\n                ],\\n                [\\n                    236,\\n                    404\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"다음화면>\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 14,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    25,\\n                    419\\n                ],\\n                [\\n                    59,\\n                    419\\n                ],\\n                [\\n                    59,\\n                    431\\n                ],\\n                [\\n                    25,\\n                    431\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"\\\"\\n                }\\n            ]\\n        }\\n    ]\\n}\"','https://oasys.ml/res/img/1/menu_3.png','menu_3.png','340 453',2,NULL,'2022-03-16 03:39:35','2022-03-16 03:39:15'),(4,'\"{\\n    \\\"category_list\\\": [],\\n    \\\"tag_list\\\": [],\\n    \\\"box_object_list\\\": [\\n        {\\n            \\\"id\\\": 0,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    25,\\n                    9\\n                ],\\n                [\\n                    81,\\n                    9\\n                ],\\n                [\\n                    81,\\n                    29\\n                ],\\n                [\\n                    25,\\n                    29\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"PASTA\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 1,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    139,\\n                    15\\n                ],\\n                [\\n                    177,\\n                    15\\n                ],\\n                [\\n                    177,\\n                    27\\n                ],\\n                [\\n                    139,\\n                    27\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"크림 - 뽀지\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 2,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    123,\\n                    73\\n                ],\\n                [\\n                    255,\\n                    73\\n                ],\\n                [\\n                    255,\\n                    93\\n                ],\\n                [\\n                    123,\\n                    93\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"S민MA닉으 OLIO PASTA\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 3,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    49,\\n                    135\\n                ],\\n                [\\n                    149,\\n                    135\\n                ],\\n                [\\n                    149,\\n                    149\\n                ],\\n                [\\n                    49,\\n                    149\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"F000 TOMATO PASTA\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 4,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    125,\\n                    193\\n                ],\\n                [\\n                    245,\\n                    193\\n                ],\\n                [\\n                    245,\\n                    213\\n                ],\\n                [\\n                    125,\\n                    213\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"섞됐R09M CREAM PASTA\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 5,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    97,\\n                    253\\n                ],\\n                [\\n                    161,\\n                    253\\n                ],\\n                [\\n                    161,\\n                    267\\n                ],\\n                [\\n                    97,\\n                    267\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"CREAM PASTA\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 6,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    33,\\n                    255\\n                ],\\n                [\\n                    81,\\n                    255\\n                ],\\n                [\\n                    81,\\n                    267\\n                ],\\n                [\\n                    33,\\n                    267\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"SPICY SHRI\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 7,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    125,\\n                    313\\n                ],\\n                [\\n                    225,\\n                    313\\n                ],\\n                [\\n                    225,\\n                    331\\n                ],\\n                [\\n                    125,\\n                    331\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"달SEN ROSE PASTA\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 8,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    35,\\n                    371\\n                ],\\n                [\\n                    159,\\n                    371\\n                ],\\n                [\\n                    159,\\n                    389\\n                ],\\n                [\\n                    35,\\n                    389\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"목습노든요 SHRIMP PASTA\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 9,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    199,\\n                    373\\n                ],\\n                [\\n                    221,\\n                    373\\n                ],\\n                [\\n                    221,\\n                    385\\n                ],\\n                [\\n                    199,\\n                    385\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"155\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 10,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    250,\\n                    428\\n                ],\\n                [\\n                    312,\\n                    428\\n                ],\\n                [\\n                    312,\\n                    436\\n                ],\\n                [\\n                    250,\\n                    436\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"사회자 실재 떡뉴는 다를 수 \'있습\'\\\"\\n                }\\n            ]\\n        }\\n    ]\\n}\"','https://oasys.ml/res/img/1/menu_4.png','menu_4.png','340 454',2,NULL,'2022-03-16 03:39:35','2022-03-16 03:39:15'),(5,'\"{\\n    \\\"category_list\\\": [],\\n    \\\"tag_list\\\": [],\\n    \\\"box_object_list\\\": [\\n        {\\n            \\\"id\\\": 0,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    95,\\n                    37\\n                ],\\n                [\\n                    219,\\n                    37\\n                ],\\n                [\\n                    219,\\n                    67\\n                ],\\n                [\\n                    95,\\n                    67\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"인기메뉴 세트 ***빠- w 21,000\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 1,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    93,\\n                    129\\n                ],\\n                [\\n                    227,\\n                    129\\n                ],\\n                [\\n                    227,\\n                    163\\n                ],\\n                [\\n                    93,\\n                    163\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"추천메뉴 세트 4인 ) \\\\\\\\ 23,000\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 2,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    240,\\n                    232\\n                ],\\n                [\\n                    276,\\n                    232\\n                ],\\n                [\\n                    276,\\n                    240\\n                ],\\n                [\\n                    240,\\n                    240\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"네이컨 디자{S)\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 3,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    87,\\n                    237\\n                ],\\n                [\\n                    237,\\n                    237\\n                ],\\n                [\\n                    237,\\n                    273\\n                ],\\n                [\\n                    87,\\n                    273\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"와인 세트 -30.100~ \\\\\\\\ 27,00c\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 4,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    225,\\n                    369\\n                ],\\n                [\\n                    307,\\n                    369\\n                ],\\n                [\\n                    307,\\n                    389\\n                ],\\n                [\\n                    225,\\n                    389\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"R Rolling Pasta\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 5,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    92,\\n                    372\\n                ],\\n                [\\n                    166,\\n                    372\\n                ],\\n                [\\n                    166,\\n                    394\\n                ],\\n                [\\n                    92,\\n                    394\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"되지 않습니디 새트는 포팔더 불가입니다\\\"\\n                }\\n            ]\\n        }\\n    ]\\n}\"','https://oasys.ml/res/img/2/menu_5.png','menu_5.png','340 453',2,NULL,'2022-03-16 03:39:35','2022-03-16 03:39:15'),(6,'\"{\\n    \\\"category_list\\\": [],\\n    \\\"tag_list\\\": [],\\n    \\\"box_object_list\\\": [\\n        {\\n            \\\"id\\\": 0,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    272,\\n                    26\\n                ],\\n                [\\n                    308,\\n                    26\\n                ],\\n                [\\n                    308,\\n                    34\\n                ],\\n                [\\n                    272,\\n                    34\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"Hwmoto\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 1,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    129,\\n                    43\\n                ],\\n                [\\n                    165,\\n                    43\\n                ],\\n                [\\n                    165,\\n                    57\\n                ],\\n                [\\n                    129,\\n                    57\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"\\\\\\\"맛있는\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 2,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    28,\\n                    51\\n                ],\\n                [\\n                    210,\\n                    51\\n                ],\\n                [\\n                    210,\\n                    149\\n                ],\\n                [\\n                    28,\\n                    149\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"메메뉴판 신화픽구OI <호T] | MAN VENU  철판볶음\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 3,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    32,\\n                    208\\n                ],\\n                [\\n                    54,\\n                    208\\n                ],\\n                [\\n                    54,\\n                    216\\n                ],\\n                [\\n                    32,\\n                    216\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"나하프\'\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 4,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    124,\\n                    210\\n                ],\\n                [\\n                    166,\\n                    210\\n                ],\\n                [\\n                    166,\\n                    218\\n                ],\\n                [\\n                    124,\\n                    218\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"주꾸미삽겹살\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 5,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    26,\\n                    314\\n                ],\\n                [\\n                    66,\\n                    314\\n                ],\\n                [\\n                    66,\\n                    322\\n                ],\\n                [\\n                    26,\\n                    322\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"+바다주꾸D\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 6,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    140,\\n                    350\\n                ],\\n                [\\n                    166,\\n                    350\\n                ],\\n                [\\n                    166,\\n                    356\\n                ],\\n                [\\n                    140,\\n                    356\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"M20m\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 7,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    30,\\n                    352\\n                ],\\n                [\\n                    58,\\n                    352\\n                ],\\n                [\\n                    58,\\n                    358\\n                ],\\n                [\\n                    30,\\n                    358\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"배2mm\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 8,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    106,\\n                    370\\n                ],\\n                [\\n                    152,\\n                    370\\n                ],\\n                [\\n                    152,\\n                    376\\n                ],\\n                [\\n                    106,\\n                    376\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"나처즈끄이마\'\\\"\\n                }\\n            ]\\n        }\\n    ]\\n}\"','https://oasys.ml/res/img/2/menu_6.png','menu_6.png','340 453',2,NULL,'2022-03-16 03:39:35','2022-03-16 03:39:15'),(7,'\"{\\n    \\\"category_list\\\": [],\\n    \\\"tag_list\\\": [],\\n    \\\"box_object_list\\\": [\\n        {\\n            \\\"id\\\": 0,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    48,\\n                    62\\n                ],\\n                [\\n                    214,\\n                    62\\n                ],\\n                [\\n                    214,\\n                    144\\n                ],\\n                [\\n                    48,\\n                    144\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"스테이크 전문성 한정 메뉴 가정식 ( 스페셜\' \' 스티이크\' 400 47@ \'\\\"\\n                }\\n            ]\\n        },\\n        {\\n            \\\"id\\\": 1,\\n            \\\"category\\\": [],\\n            \\\"bounding_box\\\": [\\n                [\\n                    39,\\n                    209\\n                ],\\n                [\\n                    209,\\n                    209\\n                ],\\n                [\\n                    209,\\n                    360\\n                ],\\n                [\\n                    39,\\n                    360\\n                ]\\n            ],\\n            \\\"extra\\\": [\\n                {\\n                    \\\"key\\\": \\\"text\\\",\\n                    \\\"value\\\": \\\"Cmomwo 반상= 구첩\' 미도인 : 15,900 스페이크 가장식  : 15.900 가정식\'\\\"\\n                }\\n            ]\\n        }\\n    ]\\n}\"','https://oasys.ml/res/img/2/menu_7.png','menu_7.png','340 453',2,NULL,'2022-03-16 03:39:35','2022-03-16 03:39:15'),(8,'\"{\\\"box_object_list\\\":[{\\\"id\\\":0,\\\"category\\\":[],\\\"bounding_box\\\":[[5.769230769230768,511.5384615384615],[5.769230769230768,682.6923076923076],[784.6153846153845,682.6923076923076],[784.6153846153845,511.5384615384615]],\\\"extra\\\":[{\\\"key\\\":\\\"text\\\",\\\"value\\\":\\\"\\\"}]}],\\\"category_list\\\":[\\\"sword\\\"],\\\"tag_list\\\":[]}\"','https://oasys.ml/res/img/3/링크.png','링크.png','1000 976',3,NULL,'2022-03-16 03:39:35','2022-03-16 03:39:15'),(9,'\"{\\\"box_object_list\\\":[{\\\"id\\\":0,\\\"category\\\":[],\\\"bounding_box\\\":[[167.85714285714283,235.7142857142857],[167.85714285714283,605.3571428571428],[594.6428571428571,605.3571428571428],[594.6428571428571,235.7142857142857]],\\\"extra\\\":[{\\\"key\\\":\\\"text\\\",\\\"value\\\":\\\"\\\"}]}],\\\"category_list\\\":[],\\\"tag_list\\\":[]}\"','https://oasys.ml/res/img/3/링크2.png','링크2.png','900 900',3,NULL,'2022-03-16 03:39:35','2022-03-16 03:39:15'),(11,'\"{\\\"category_list\\\": [], \\\"tag_list\\\": [], \\\"box_object_list\\\": []}\"','https://oasys.ml/res/img/4/한식마당.jpg','한식마당.jpg','500 500',4,NULL,'2022-03-16 03:39:35','2022-03-16 03:39:15'),(12,'\"{\\\"category_list\\\": [], \\\"tag_list\\\": [], \\\"box_object_list\\\": []}\"','https://oasys.ml/res/img/4/주민등록증.png','주민등록증.png','395 243',4,NULL,'2022-03-16 03:39:35','2022-03-16 03:39:15'),(14,'\"{\\\"box_object_list\\\":[{\\\"id\\\":0,\\\"category\\\":[\\\"computer\\\"],\\\"bounding_box\\\":[[499.99999999999994,103.84615384615384],[499.99999999999994,486.5384615384615],[909.6153846153845,486.5384615384615],[909.6153846153845,103.84615384615384]],\\\"extra\\\":[{\\\"key\\\":\\\"text\\\",\\\"value\\\":\\\"\\\"}]}],\\\"category_list\\\":[\\\"computer\\\"],\\\"tag_list\\\":[]}\"','https://oasys.ml/res/img/2/desktop.png','desktop.png','1200 675',1,NULL,'2022-04-26 01:26:09','2022-04-26 01:26:09'),(15,'\"{\\\"box_object_list\\\":[{\\\"id\\\":0,\\\"category\\\":[\\\"game console\\\"],\\\"bounding_box\\\":[[594.2307692307692,349.99999999999994],[594.2307692307692,469.23076923076917],[842.3076923076923,469.23076923076917],[842.3076923076923,349.99999999999994]],\\\"extra\\\":[{\\\"key\\\":\\\"text\\\",\\\"value\\\":\\\"\\\"}]}],\\\"category_list\\\":[\\\"game console\\\"],\\\"tag_list\\\":[]}\"','https://oasys.ml/res/img/2/table.png','table.png','1200 675',1,NULL,'2022-04-26 01:40:08','2022-04-26 01:40:08'),(29,'\"{\\\"category_list\\\": [], \\\"tag_list\\\": [], \\\"box_object_list\\\": []}\"','https://oasys.ml/res/img/1/캡처.PNG','캡처.PNG','233 158',1,NULL,'2022-04-30 01:46:47','2022-04-30 01:46:47'),(30,'\"{\\\"category_list\\\": [], \\\"tag_list\\\": [], \\\"box_object_list\\\": []}\"','https://oasys.ml/res/img/1/067.png','067.png','550 185',1,NULL,'2022-04-30 01:46:58','2022-04-30 01:46:58'),(31,'\"{\\\"category_list\\\": [], \\\"tag_list\\\": [], \\\"box_object_list\\\": []}\"','https://oasys.ml/res/img/1/로아.PNG','로아.PNG','487 853',1,NULL,'2022-04-30 01:51:05','2022-04-30 01:51:05'),(32,'\"{\\\"category_list\\\": [], \\\"tag_list\\\": [], \\\"box_object_list\\\": []}\"','https://oasys.ml/res/img/1/할로윈.PNG','할로윈.PNG','497 254',1,NULL,'2022-05-11 21:42:40','2022-05-11 21:42:40'),(33,'\"{\\\"category_list\\\": [], \\\"tag_list\\\": [], \\\"box_object_list\\\": []}\"','https://oasys.ml/res/img/1/genzi.png','genzi.png','3000 5333',1,NULL,'2022-05-11 22:14:02','2022-05-11 22:14:02'),(46,'\"{\\\"category_list\\\": [], \\\"tag_list\\\": [], \\\"box_object_list\\\": []}\"','https://oasys.ml/res/img/1/1444920761526.jpg','1444920761526.jpg','720 1280',1,NULL,'2022-05-12 12:17:02','2022-05-12 12:17:02'),(47,'\"{\\\"category_list\\\": [], \\\"tag_list\\\": [], \\\"box_object_list\\\": []}\"','https://oasys.ml/res/img/1/1dd5b73e1e4c9c4edfcb7615e2ead88d.jpg','1dd5b73e1e4c9c4edfcb7615e2ead88d.jpg','236 425',1,NULL,'2022-05-12 12:17:02','2022-05-12 12:17:02'),(48,'\"{\\\"category_list\\\": [], \\\"tag_list\\\": [], \\\"box_object_list\\\": []}\"','https://oasys.ml/res/img/1/a33082c383aad7dc5e59addf5cec7488.jpg','a33082c383aad7dc5e59addf5cec7488.jpg','236 314',1,NULL,'2022-05-12 12:17:02','2022-05-12 12:17:02'),(49,'\"{\\\"category_list\\\": [], \\\"tag_list\\\": [], \\\"box_object_list\\\": []}\"','https://oasys.ml/res/img/1/c95683772e2dfc665de0eca830e436ac.jpg','c95683772e2dfc665de0eca830e436ac.jpg','236 364',1,NULL,'2022-05-12 12:17:02','2022-05-12 12:17:02'),(50,'\"{\\\"category_list\\\": [], \\\"tag_list\\\": [], \\\"box_object_list\\\": []}\"','https://oasys.ml/res/img/1/maxresdefault.jpg','maxresdefault.jpg','1280 720',1,NULL,'2022-05-12 12:17:02','2022-05-12 12:17:02'),(51,'\"{\\\"category_list\\\": [], \\\"tag_list\\\": [], \\\"box_object_list\\\": []}\"','https://oasys.ml/res/img/1/Wallpaper_totakeke_1920_1080.jpg','Wallpaper_totakeke_1920_1080.jpg','800 450',1,NULL,'2022-05-12 12:17:02','2022-05-12 12:17:02');
/*!40000 ALTER TABLE `image_metadata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_workspace`
--

DROP TABLE IF EXISTS `user_workspace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_workspace` (
  `user` char(32) DEFAULT NULL,
  `workspace` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_workspace`
--

LOCK TABLES `user_workspace` WRITE;
/*!40000 ALTER TABLE `user_workspace` DISABLE KEYS */;
INSERT INTO `user_workspace` VALUES ('5796f18adfb645ae8c0cb841d843ac80',4,4),('a3dcf03caaa4488491fea63113f20452',3,5),('1a5433967fe6426d87556823e564d56b',2,6),('5796f18adfb645ae8c0cb841d843ac80',2,7),('a3dcf03caaa4488491fea63113f20452',2,8),('1c27d30efa81409b97582a5ce07051bc',2,10);
/*!40000 ALTER TABLE `user_workspace` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workspace`
--

DROP TABLE IF EXISTS `workspace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workspace` (
  `workspace_name` varchar(150) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` char(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workspace`
--

LOCK TABLES `workspace` WRITE;
/*!40000 ALTER TABLE `workspace` DISABLE KEYS */;
INSERT INTO `workspace` VALUES ('sample workspace','2022-04-21 01:43:29','2022-04-21 01:43:29',2,NULL),('eui space','2022-04-21 01:43:39','2022-04-21 01:43:39',3,NULL),('kim workspace','2022-04-21 01:44:45','2022-04-21 01:44:45',4,NULL),('test1','2022-05-14 01:22:26','2022-05-14 01:22:26',5,NULL),('test2','2022-05-14 01:24:42','2022-05-14 01:24:42',6,NULL);
/*!40000 ALTER TABLE `workspace` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workspace_dataset`
--

DROP TABLE IF EXISTS `workspace_dataset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workspace_dataset` (
  `workspace` int(11) DEFAULT NULL,
  `dataset` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workspace_dataset`
--

LOCK TABLES `workspace_dataset` WRITE;
/*!40000 ALTER TABLE `workspace_dataset` DISABLE KEYS */;
INSERT INTO `workspace_dataset` VALUES (2,1,1),(2,2,2),(3,1,3),(3,2,4),(3,3,5),(4,1,6),(4,2,7),(4,3,8),(2,7,9);
/*!40000 ALTER TABLE `workspace_dataset` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-14 20:41:09
