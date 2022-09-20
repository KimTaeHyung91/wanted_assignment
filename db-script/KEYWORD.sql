-- wanted_assignment.KEYWORD definition

CREATE TABLE `KEYWORD` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `author_name` varchar(255) NOT NULL COMMENT '작성자 이름',
  `keyword` varchar(255) NOT NULL COMMENT '키워드명',
  PRIMARY KEY (`id`),
  KEY `KEYWORD_keyword_IDX` (`keyword`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;