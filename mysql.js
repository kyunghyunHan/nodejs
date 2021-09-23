/** 데이터베이스는 관련성을 가지며 중복이 없는 데이터들의 집합입니다.이러한 데이터베이스를 관리하는 시스태템을 DBMS(데이터관리시스템)라고 부릅니다
 * 보통 서버의 하드디스크나 SSD등의 저장 매체에 데이터를 저장합니다 저장 매체가 고장 나거나 사용자가 직접 데이터를 지우지 않는 이상 계속 데이터가 보존되므로 서버 종료 여부와 상관없이 데이터를 지속적으로 사용할 수 있습니다
 * 또한 서버에 데이터 베이스를 올리면 여러사람이 동시에 사용할수 있습니다
 * DBMS중에서 RMBMS라고 불라는 관계형 DBMS가 맣이 사용됩니다 대표적인 것이 Oracle,Mysql,MSSQL이 있습니다
 */

/** CRUD 작업
 * 
 * CRUD는 Create.Read,Update,Delete의 첫글자로 모은 두문자어 이며 데이터베이스에서 많이 수행하는 네가지 작업을 일컫습니다. 그 방법안 익혀도 웹만한 프로그램은 다만들수 있을정도로
 * CRUD 작업은 많이 사용됩니다. 
 * 
 * Create(생성)
 * 생성은 데이터를 생성해서 데이터베이스에 넣는 작업입니다.user테이블에 데이터를 넣어보겠습니다. use nodejs; 명령어를 사용했다면 테이블명으로 nodejs.user대신user만 사용해도 됩니다
 * 
 * 콘솔 
 * 
 * INSERT INTO node.js.user (name,age,marrid,comment) VALUES ('zero',24,0,'자기소개1');
 * 
 * INSERT INTO node.js.user (name,age,marrid,comment) VALUES ('nero',32,1,'자기소개2');
 * 
 * 데이터를 넣는 명령어는 INSERT INTO[테이블명]([컬럼1],[컬럼2],...)VALUE ([값1],[값2]..)입니다  
 * 
 * 
 * comments테이블에도 넣어보겠씁니다
 * 
 *  INSERT INTO node.js.comments (commenter,comment) VALUES ('1',안녕하세요,zero의 댓글입니다);
 * 
 * REad(조회)
 * 
 * 조회는 데이터베이스에 있는 데이터를 조회하는 작업입니다
 * 
 * SELET * FROM node.js.users;
 * 
 * 이구문이 user 테이블의 모든 데이터를 조회하는 SQL문입니다. SELECT * FROM[테이블 명]형식입니다
 * 우분투에서는 위 sql문을 mysql프롬포트에 입력하면 됩니다 comments테이블도 비슷한 sql문으로 조회할수 있습니다
 * 
 * SELECT * FROM node.js.comments;
 * 
 * 특정 컬럼만 조회할수도 있습니다
 * 
 * SELECT name,married FROM nodejs.users;
 * 
 * WHERE절을 사용하면 특정 조건을 가진데이터만 조회할수도 있습니다 다음은 결혼을 했고 나이가 30세 이상인 사용자를 조회하는 sql문입니다 and로 여러 조건을 묶어줄수도 있습니다
 * 
 *  SELECT name,age FROM nodejs.users WHERE married =1 AND age>30;
 * 
 * AND가 조건들을 모두 만족하는 데이터를 찾는다면 OR는 조건들 중 어느 하나라도 만족하는 데이터를 찾습니다
 * 
 * SELECT id, name FROM nodejs.users WHERE married =0 OR age >30;
 * 
 * ORDER BY [컬럼명][ASC | DESC] 키워드를 시영하면 정렬도 가능합니다 나읻가 많은 순서대로 정렬을 해보겠습니다 DESC는 내림차순 ASC는 오름차순임로 DESC를 사용하면 됩니다.
 * 
 * SELECT id ,name FROM nodejs.users ORDER BY age DESC;
 * 
 * 조회할 로우 개수를 설정할수도 있습니다. LIMIT [숫자]키워드를 사용합니다 하나만 조회히려면 LIMIT 1을 SQL문 끝에 붙이면 됩니다
 * 
 * SELECT id ,name FROM nodejs.users ORDRT BY age DESC LIMIT 1;
 * 
 * 로우 개수를 설정하면서 몇개를 건너뛸지 설정할수도 있습니다 이는 게시판 등의 페이지네이션기능을 구현할떄 유용합니다 예를 들어 첫번쨰 페이지에서 1~20번 게시물을 조회했다면 두번쨰 페이지에서는
 * 21~40번 게시물을 조회해야합니다. 이떄 처름 20개를 건너띄고 다음 20개 게시물을 조회하라는 식의 명령이 가능합니다. OFFSET [건너 뛸 숫자] 키워드를 사용합니다
 * 
 * SELECT id, name FROM nodejs.users ORDER BY age DESC LIMIT 1 OFFSRT1l
 * 
 * 
 * Updata(수정)
 * 
 * Updata(수정) 은 데이터베이스에 있는 데이터를 수정하는작업입니다.
 * 
 * UPDATE node.js.users SET comment = '바꿀내용' WHERE id =2;
 * 
 * 
 * 
 * DELETE(삭제)
 * 
 * Delete(삭제)는 데이터 베이스에 있는 데이터를 삭제하는 작업입니다
 * 
 * DELETE FROM nodejs.users WHERE id=2;
 * 
 * 삭제 명령어는 DELETE FROM [테이블 명] WHERE [조건]입니다 조건이 WHERE id =2인데 이는 users테이블에서 id 가 2인 로우를 삭제하라는 뜻입니다
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */