-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        8.0.42-0ubuntu0.22.04.1 - (Ubuntu)
-- 服务器操作系统:                      Linux
-- HeidiSQL 版本:                  12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 导出 nest_app 的数据库结构
CREATE DATABASE IF NOT EXISTS `nest_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `nest_app`;

-- 导出  表 nest_app.app_dept 结构
CREATE TABLE IF NOT EXISTS `app_dept` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `mpath` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '',
  `parentId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_f4e9930ba55500e900199c1b99` (`name`),
  KEY `FK_ebc0d4b114b1397345b7ba05352` (`parentId`),
  CONSTRAINT `FK_ebc0d4b114b1397345b7ba05352` FOREIGN KEY (`parentId`) REFERENCES `app_dept` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 正在导出表  nest_app.app_dept 的数据：~8 rows (大约)
DELETE FROM `app_dept`;
INSERT INTO `app_dept` (`id`, `create_at`, `update_at`, `name`, `mpath`, `parentId`) VALUES
	(18, '2025-08-03 20:24:41.413246', '2025-08-03 20:24:41.000000', '总部', '18.', NULL),
	(19, '2025-08-03 20:24:56.074320', '2025-08-03 20:24:56.000000', '华北区', '18.19.', 18),
	(20, '2025-08-03 20:25:13.077476', '2025-08-03 20:25:13.000000', '华南区', '18.20.', 18),
	(21, '2025-08-03 20:25:30.529490', '2025-08-03 20:25:30.000000', '深圳', '18.20.21.', 20),
	(22, '2025-08-03 20:26:06.053708', '2025-08-03 20:26:06.000000', '广州', '18.20.22.', 20),
	(23, '2025-08-03 20:26:35.899614', '2025-08-03 20:26:35.000000', '人力部', '18.20.21.23.', 21),
	(24, '2025-08-03 20:26:53.542917', '2025-08-03 20:26:53.000000', '财政部', '18.20.21.24.', 21),
	(25, '2025-08-03 20:27:10.833382', '2025-08-03 20:27:26.000000', '研发部', '18.20.21.25.', 21);

-- 导出  表 nest_app.app_file 结构
CREATE TABLE IF NOT EXISTS `app_file` (
  `originalName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `filename` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `mimeType` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `size` int NOT NULL,
  `isTempFile` tinyint NOT NULL DEFAULT '1',
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 正在导出表  nest_app.app_file 的数据：~12 rows (大约)
DELETE FROM `app_file`;
INSERT INTO `app_file` (`originalName`, `filename`, `mimeType`, `size`, `isTempFile`, `create_at`, `update_at`, `id`, `userId`) VALUES
	('img1.wallspic.com-zi_se_de-zhuan_ji-shi_jian-san_jiao_xing-ping_kefu_luo_yi_de-3840x2160.jpg', '256e574d-c9d6-4d15-9890-842c71a8c14d.jpg', 'image/jpeg', 268533, 1, '2025-07-01 23:37:41.603712', '2025-07-01 23:37:41.603712', 11, 1),
	('img1.wallspic.com-zi_se_de-zhuan_ji-shi_jian-san_jiao_xing-ping_kefu_luo_yi_de-3840x2160.jpg', '6b2fe739-233b-448e-8288-4313bd427212.jpg', 'image/jpeg', 268533, 1, '2025-07-01 23:39:03.786250', '2025-07-01 23:39:03.786250', 12, 1),
	('img1.wallspic.com-zi_se_de-zhuan_ji-shi_jian-san_jiao_xing-ping_kefu_luo_yi_de-3840x2160.jpg', 'fea3f5d0-1dec-4294-9da4-e2578d808a8d.jpg', 'image/jpeg', 268533, 1, '2025-07-01 23:39:57.109986', '2025-07-01 23:39:57.109986', 13, 1),
	('img1.wallspic.com-yang_guang-guang-shi_zhong-tian_kong-zhong_lou-6526x3000.jpg', 'aeea64bf-8ee8-4817-8b8a-a4f8d2861d19.jpg', 'image/jpeg', 3136922, 1, '2025-07-01 23:40:37.601015', '2025-07-01 23:40:37.601015', 14, 1),
	('img1.wallspic.com-yang_guang-guang-shi_zhong-tian_kong-zhong_lou-6526x3000.jpg', 'dee33c0c-3480-47ac-8755-40c33d62c09c.jpg', 'image/jpeg', 3136922, 1, '2025-07-01 23:43:32.498293', '2025-07-01 23:43:32.498293', 15, 1),
	('img1.wallspic.com-zi_se_de-zhuan_ji-shi_jian-san_jiao_xing-ping_kefu_luo_yi_de-3840x2160.jpg', 'dbc7259e-40ed-4f04-b47e-cbeb363a822e.jpg', 'image/jpeg', 268533, 0, '2025-07-01 23:49:39.543069', '2025-07-01 23:49:45.000000', 16, 1),
	('img1.wallspic.com-zi_se_de-zhuan_ji-shi_jian-san_jiao_xing-ping_kefu_luo_yi_de-3840x2160.jpg', '848bc62a-c1eb-4129-ade9-cccdc0e1cb3d.jpg', 'image/jpeg', 268533, 0, '2025-07-01 23:51:15.616548', '2025-07-01 23:51:21.000000', 17, 1),
	('img1.wallspic.com-yang_guang-guang-shi_zhong-tian_kong-zhong_lou-6526x3000.jpg', '9a8bac3a-ef97-4111-9122-7a499aedb78a.jpg', 'image/jpeg', 3136922, 0, '2025-07-02 22:35:57.600161', '2025-07-02 22:36:02.000000', 18, 1),
	('img1.wallspic.com-zi_se_de-zhuan_ji-shi_jian-san_jiao_xing-ping_kefu_luo_yi_de-3840x2160.jpg', 'b958f6c3-02aa-46d4-b77e-c7f3c5d23905.jpg', 'image/jpeg', 268533, 0, '2025-07-02 23:04:07.055330', '2025-07-02 23:04:11.000000', 19, 1),
	('img1.wallspic.com-zi_se_de-zhuan_ji-shi_jian-san_jiao_xing-ping_kefu_luo_yi_de-3840x2160.jpg', '6e93e192-a185-424d-968d-ea776c279ca0.jpg', 'image/jpeg', 268533, 1, '2025-07-03 23:16:55.772039', '2025-07-03 23:16:55.772039', 20, 1),
	('img1.wallspic.com-zi_se_de-zhuan_ji-shi_jian-san_jiao_xing-ping_kefu_luo_yi_de-3840x2160.jpg', '94a48c81-8966-4466-9451-a241fb486629.jpg', 'image/jpeg', 268533, 1, '2025-07-03 23:25:09.322621', '2025-07-03 23:25:09.322621', 21, 1),
	('img1.wallspic.com-zi_se_de-zhuan_ji-shi_jian-san_jiao_xing-ping_kefu_luo_yi_de-3840x2160.jpg', '037fcf70-60b3-4f00-9f8a-46cde9445079.jpg', 'image/jpeg', 268533, 1, '2025-07-03 23:25:53.654796', '2025-07-03 23:25:53.654796', 22, 1);

-- 导出  表 nest_app.app_menu 结构
CREATE TABLE IF NOT EXISTS `app_menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `type` tinyint NOT NULL DEFAULT '1',
  `permission` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `path` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `icon` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `status` tinyint NOT NULL DEFAULT '1',
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 正在导出表  nest_app.app_menu 的数据：~28 rows (大约)
DELETE FROM `app_menu`;
INSERT INTO `app_menu` (`id`, `create_at`, `update_at`, `name`, `type`, `permission`, `path`, `icon`, `order`, `status`, `parent_id`) VALUES
	(1, '2025-01-28 19:40:42.218361', '2025-01-28 20:49:12.889432', '系统管理', 0, NULL, '/system', 'ant-design:bars-outlined', 0, 1, -1),
	(2, '2025-01-28 19:43:46.338457', '2025-01-28 20:51:38.197275', '用户管理', 1, '', '/system/user', 'ep:user-filled', 0, 1, 1),
	(3, '2025-01-28 19:44:15.992534', '2025-01-28 20:51:53.821646', '角色管理', 1, '', '/system/role', 'ant-design:user-outlined', 0, 1, 1),
	(4, '2025-01-28 19:45:20.652403', '2025-01-28 20:51:55.930572', '部门管理', 1, '', '/system/dept', 'ep:setting', 0, 1, 1),
	(5, '2025-01-28 19:45:53.359976', '2025-01-29 21:32:13.000000', '列表', 2, 'system:user:list', '/system/menu', 'ep:menu', 0, 1, 2),
	(7, '2025-01-28 19:47:21.128155', '2025-07-23 23:46:18.000000', '系统日志', 1, '', '/log/system', 'ant-design:aliyun-outlined', 0, 1, 6),
	(8, '2025-01-28 19:52:52.290975', '2025-01-28 21:59:02.000000', '设备日志', 1, '', '/log/device', 'ant-design:aim-outlined', 0, 1, 6),
	(9, '2025-01-28 19:55:05.238678', '2025-01-28 20:52:55.654819', '菜单管理', 1, '', '/system/menu', 'ant-design:appstore-twotone', 0, 1, 1),
	(10, '2025-01-28 19:55:18.367872', '2025-01-28 21:05:54.000000', '编辑', 2, 'system:menu:update', '/system/menu', NULL, 0, 1, 9),
	(11, '2025-01-28 19:55:35.646060', '2025-01-28 20:53:33.117833', '新增', 2, 'system:menu:create', '/system/menu', NULL, 0, 1, 9),
	(14, '2025-01-28 21:24:05.873937', '2025-01-28 21:24:05.873937', '新增', 2, 'system:dept:create', '/system/dept', NULL, 0, 1, 4),
	(15, '2025-01-28 21:25:26.081033', '2025-01-28 21:25:26.081033', '删除', 2, 'system:dept:delete', '/system/dept', NULL, 0, 1, 4),
	(19, '2025-01-29 19:54:04.689719', '2025-01-29 19:54:04.689719', '详情', 2, 'system:user:detail', '/system/user', NULL, 0, 1, 2),
	(20, '2025-01-29 19:54:04.718424', '2025-01-29 19:54:04.718424', '新增', 2, 'system:user:create', '/system/user', NULL, 0, 1, 2),
	(21, '2025-01-29 19:54:04.721551', '2025-01-29 19:54:04.721551', '编辑', 2, 'system:user:update', '/system/user', NULL, 0, 1, 2),
	(22, '2025-01-29 19:54:04.724827', '2025-01-29 19:54:04.724827', '删除', 2, 'system:user:delete', '/system/user', NULL, 0, 1, 2),
	(23, '2025-01-29 19:54:21.782664', '2025-01-29 19:54:21.782664', '列表', 2, 'system:role:list', '/system/role', NULL, 0, 1, 3),
	(24, '2025-01-29 19:54:21.787115', '2025-01-29 19:54:21.787115', '详情', 2, 'system:role:detail', '/system/role', NULL, 0, 1, 3),
	(25, '2025-01-29 19:54:21.790256', '2025-01-29 19:54:21.790256', '新增', 2, 'system:role:create', '/system/role', NULL, 0, 1, 3),
	(26, '2025-01-29 19:54:21.792708', '2025-01-29 19:54:21.792708', '编辑', 2, 'system:role:update', '/system/role', NULL, 0, 1, 3),
	(27, '2025-01-29 19:54:21.795373', '2025-01-29 19:54:21.795373', '删除', 2, 'system:role:delete', '/system/role', NULL, 0, 1, 3),
	(28, '2025-01-29 19:54:41.195579', '2025-01-29 19:54:41.195579', '列表', 2, 'system:dept:list', '/system/dept', NULL, 0, 1, 4),
	(29, '2025-01-29 19:54:41.198924', '2025-01-29 19:54:41.198924', '详情', 2, 'system:dept:detail', '/system/dept', NULL, 0, 1, 4),
	(30, '2025-01-29 19:54:41.201307', '2025-01-29 19:54:41.201307', '编辑', 2, 'system:dept:update', '/system/dept', NULL, 0, 1, 4),
	(31, '2025-01-29 19:55:00.282244', '2025-01-29 19:55:00.282244', '列表', 2, 'system:menu:list', '/system/menu', NULL, 0, 1, 9),
	(32, '2025-01-29 19:55:00.285591', '2025-01-29 19:55:00.285591', '删除', 2, 'system:menu:delete', '/system/menu', NULL, 0, 1, 9),
	(33, '2025-01-29 19:55:00.288122', '2025-01-30 12:23:39.000000', '导出', 2, 'system:menu:export', '/system/menu', NULL, 0, 0, 9),
	(34, '2025-01-29 19:55:00.293752', '2025-01-29 19:55:00.293752', '导入', 2, 'system:menu:import', '/system/menu', NULL, 0, 1, 9),
	(35, '2025-01-29 19:55:00.297077', '2025-01-29 19:55:00.297077', '详情', 2, 'system:menu:detail', '/system/menu', NULL, 0, 1, 9);

-- 导出  表 nest_app.app_role 结构
CREATE TABLE IF NOT EXISTS `app_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `remark` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_5b741af93e7206264d17d78334` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 正在导出表  nest_app.app_role 的数据：~1 rows (大约)
DELETE FROM `app_role`;
INSERT INTO `app_role` (`id`, `create_at`, `update_at`, `name`, `value`, `remark`, `status`) VALUES
	(1, '2025-01-28 19:51:36.900385', '2025-01-28 19:51:36.900385', 'admin', 'admin', '管理员', 1);

-- 导出  表 nest_app.app_role_menus_app_menu 结构
CREATE TABLE IF NOT EXISTS `app_role_menus_app_menu` (
  `appRoleId` int NOT NULL,
  `appMenuId` int NOT NULL,
  PRIMARY KEY (`appRoleId`,`appMenuId`),
  KEY `IDX_90ff10e6089a245ea739eca0b1` (`appRoleId`),
  KEY `IDX_83625b1267f6c131831fea80ee` (`appMenuId`),
  CONSTRAINT `FK_83625b1267f6c131831fea80ee1` FOREIGN KEY (`appMenuId`) REFERENCES `app_menu` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_90ff10e6089a245ea739eca0b18` FOREIGN KEY (`appRoleId`) REFERENCES `app_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 正在导出表  nest_app.app_role_menus_app_menu 的数据：~9 rows (大约)
DELETE FROM `app_role_menus_app_menu`;
INSERT INTO `app_role_menus_app_menu` (`appRoleId`, `appMenuId`) VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(1, 4),
	(1, 7),
	(1, 8),
	(1, 9),
	(1, 10),
	(1, 11);

-- 导出  表 nest_app.app_user 结构
CREATE TABLE IF NOT EXISTS `app_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `deptId` int DEFAULT NULL,
  `avatarId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c480e576dd71729addbc2d51b6` (`username`),
  UNIQUE KEY `REL_8029783f878c8db0930261cd76` (`avatarId`),
  KEY `FK_8a42abf0caa7e734ecbc234a19f` (`deptId`),
  CONSTRAINT `FK_8029783f878c8db0930261cd76c` FOREIGN KEY (`avatarId`) REFERENCES `app_file` (`id`),
  CONSTRAINT `FK_8a42abf0caa7e734ecbc234a19f` FOREIGN KEY (`deptId`) REFERENCES `app_dept` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 正在导出表  nest_app.app_user 的数据：~2 rows (大约)
DELETE FROM `app_user`;
INSERT INTO `app_user` (`id`, `create_at`, `update_at`, `username`, `password`, `deptId`, `avatarId`) VALUES
	(1, '2025-01-28 19:51:50.573304', '2025-08-03 20:30:25.000000', 'admin', 'a123456', NULL, NULL),
	(23, '2025-08-03 20:30:44.500840', '2025-08-03 20:30:44.500840', 'test', 'a123456', 25, NULL);

-- 导出  表 nest_app.app_user_roles_app_role 结构
CREATE TABLE IF NOT EXISTS `app_user_roles_app_role` (
  `appUserId` int NOT NULL,
  `appRoleId` int NOT NULL,
  PRIMARY KEY (`appUserId`,`appRoleId`),
  KEY `IDX_0f64e00c054f6d9fb7b0036ba9` (`appUserId`),
  KEY `IDX_4530043d6f358c0b2a8ca8ded5` (`appRoleId`),
  CONSTRAINT `FK_0f64e00c054f6d9fb7b0036ba93` FOREIGN KEY (`appUserId`) REFERENCES `app_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_4530043d6f358c0b2a8ca8ded51` FOREIGN KEY (`appRoleId`) REFERENCES `app_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 正在导出表  nest_app.app_user_roles_app_role 的数据：~2 rows (大约)
DELETE FROM `app_user_roles_app_role`;
INSERT INTO `app_user_roles_app_role` (`appUserId`, `appRoleId`) VALUES
	(1, 1),
	(23, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
