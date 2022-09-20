-- wanted_assignment.COMMENT definition

CREATE TABLE `COMMENT` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `content` text NOT NULL COMMENT '내용',
  `author_name` varchar(255) NOT NULL COMMENT '작성자',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성일시',
  `post_id` int(11) NOT NULL COMMENT '게시판 id',
  `parent_comment_id` int(11) DEFAULT NULL COMMENT '상위 댓글',
  PRIMARY KEY (`id`),
  KEY `COMMENT_FK` (`post_id`),
  KEY `COMMENT_FK_1` (`parent_comment_id`),
  CONSTRAINT `COMMENT_FK` FOREIGN KEY (`post_id`) REFERENCES `POST` (`id`) ON DELETE CASCADE,
  CONSTRAINT `COMMENT_FK_1` FOREIGN KEY (`parent_comment_id`) REFERENCES `COMMENT` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;