-- wanted_assignment.POST definition

CREATE TABLE `POST` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(255) NOT NULL COMMENT '제목',
  `content` text NOT NULL COMMENT '내용',
  `author_name` varchar(255) NOT NULL COMMENT '작성자 이름',
  `password` varchar(255) NOT NULL COMMENT '비밀번호',
  `salt` varchar(255) NOT NULL COMMENT '암호화 salt 값',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성일시',
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '수정일시',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;