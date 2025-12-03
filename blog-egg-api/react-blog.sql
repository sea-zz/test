DROP DATABASE IF EXISTS reactblog;

CREATE DATABASE IF NOT EXISTS reactblog CHARSET=utf8;

use reactblog;

DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(100) NOT NULL DEFAULT '' COMMENT '标题',
  `content` text COMMENT '内容',
  `uid` int(11) unsigned NOT NULL DEFAULT 0 COMMENT '作者',
  `pub_time` int(11) unsigned NOT NULL DEFAULT 0 COMMENT '发布时间',
  `tags` varchar(100) NOT NULL DEFAULT '' COMMENT '标签',
  `read`  int(11) unsigned NOT NULL DEFAULT 0 COMMENT '阅读次数',
  `cate` int(11) unsigned NOT NULL DEFAULT 0 COMMENT '行业id',
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文章';

DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '标签名',
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='标签';

DROP TABLE IF EXISTS `cates`;
CREATE TABLE `cates` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '行业名',
  `pid` int(11) unsigned NOT NULL DEFAULT 0 COMMENT '父级行业',
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='行业';

DROP TABLE IF EXISTS `feidian`;
CREATE TABLE `feidian` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `content` varchar(100) NOT NULL DEFAULT '' COMMENT '内容',
  `uid` int(11) unsigned NOT NULL DEFAULT 0 COMMENT '作者',
  `pub_time` int(11) unsigned NOT NULL DEFAULT 0 COMMENT '发布时间',
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='随笔';

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `email` varchar(100) NOT NULL DEFAULT '' COMMENT '邮箱',
  `pass` varchar(32) NOT NULL DEFAULT '' COMMENT '密码',
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '名字',
  `company` varchar(100)NOT NULL DEFAULT '' COMMENT '公司',
  `work` varchar(100)  NOT NULL DEFAULT '' COMMENT '职业',
  `description` varchar(300) NOT NULL DEFAULT '' COMMENT '个人介绍',
  `site` varchar(300) NOT NULL DEFAULT '' COMMENT '个人主页',
  `pic` varchar(300) NOT NULL DEFAULT '' COMMENT '头像',
  PRIMARY KEY(id),
  KEY email (email),
  KEY pass (pass)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户';


DROP TABLE IF EXISTS `zhiyao`;
CREATE TABLE `zhiyao` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(100) NOT NULL DEFAULT '' COMMENT '名字',
  `date` varchar(20) NOT NULL DEFAULT '' COMMENT '发布日期',
  `img` varchar(300) NOT NULL DEFAULT '' COMMENT '图片',
  `detailid` varchar(20) NOT NULL DEFAULT '' COMMENT '详情id',
  `data` text COMMENT '内容',
  PRIMARY KEY(id),
  KEY title (title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='知妖';

DROP TABLE IF EXISTS `dongchedi`;
CREATE TABLE `dongchedi` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `series_id` int(100) NOT NULL DEFAULT 0 COMMENT '车型ID',
  `series_name` varchar(50) NOT NULL DEFAULT '' COMMENT '名字',
  `image` varchar(300) NOT NULL DEFAULT '' COMMENT '图片',
  `rank` int(20) NOT NULL DEFAULT 0 COMMENT '排名',
  `min_price` int(20) NOT NULL DEFAULT 0 COMMENT '排名',
  `max_price` int(20) NOT NULL DEFAULT 0 COMMENT '排名',
  `last_rank` int(20) NOT NULL DEFAULT 0 COMMENT '排名',
  `count` int(20) NOT NULL DEFAULT 0 COMMENT '排名',
  `score` int(20) NOT NULL DEFAULT 0 COMMENT '排名',
  `car_review_count` int(20) NOT NULL DEFAULT 0 COMMENT '排名',
  `text` varchar(200) NOT NULL DEFAULT '' COMMENT '排名',
  `show_trend` int(20) NOT NULL DEFAULT 0 COMMENT '排名',
  `descender_price` int(20) NOT NULL DEFAULT 0 COMMENT '排名',
  `series_pic_count` int(20) NOT NULL DEFAULT 0 COMMENT '排名',
  `brand_id` int(20) NOT NULL DEFAULT 0 COMMENT '排名',
  `outter_detail_type` int(20) NOT NULL DEFAULT 0 COMMENT '排名',
  `brand_name` varchar(20) NOT NULL DEFAULT '' COMMENT '排名',
  `sub_brand_id` int(20) NOT NULL DEFAULT 0 COMMENT '排名',
  `sub_brand_name` varchar(20) NOT NULL DEFAULT '' COMMENT '排名',
  `price` varchar(20) NOT NULL DEFAULT '' COMMENT '排名',
  `dealer_price` varchar(20) NOT NULL DEFAULT '' COMMENT '排名',
  `has_dealer_price` varchar(20) NOT NULL DEFAULT '' COMMENT '排名',
  `review_tag_list` varchar(200)  DEFAULT '' COMMENT '排名',
  `part_id` varchar(20) NOT NULL DEFAULT '' COMMENT '排名',
  PRIMARY KEY(id),
  KEY series_name (series_name),
  KEY outter_detail_type (outter_detail_type),
  KEY min_price (min_price),
  KEY max_price (max_price)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='懂车帝';

# 密码：111111
INSERT INTO `user`(email, pass, name, company, work, description, site, pic) values('admin@qq.com', 'a66abb5684c45962d887564f08346e8d', '管理员', '茶气话', '沏茶', '爱好喜茶的管理员呀！', 'https://www.7cha.com', '//f.51240.com/file/md5jiami/i_c_o.png?v=20031908');
