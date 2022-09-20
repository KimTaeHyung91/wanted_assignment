# Wanted Assignment

원티드 과제

- 게시판 기능
  - 생성, 수정, 삭제, 검색 기능 제공
    - 검색 기능은 페이징 포함
- 댓글 기능
  - 게시판의 댓글 등록
  - 댓글의 댓글까지 등록
- 키워드 기능
  - 키워드 등록
  - 등록한 키워드가 게시판, 댓글의 포함된 경우 알림 보내기
  

## 실행법
아래 순서대로 진행
1. db-script 실행
2. nest build
3. nest start

## 호출법
http://localhost:3000/graphql/playground 실행

- posts : 게시글 목록 조회
- post: 게시글 조회
- registerPost: 게시글 등록
- comments: 댓글 목록 조회
- subComments: 댓글의 댓글 목록 조회
- registerComment: 댓글 등록
- registerSubComment: 댓글의 댓글 등록