//노드에서 MYSQL 데이터 베이스를 접속할떄 작업을 쉽게 도와주는 라이브러리가 있습니다 바로 시퀄라이즈 입니다

/**시퀄라이즈는 ORM으로 뷴류됩니다  ORM은 자바스크립트 객체ㅗ아 데이터베이스의 릴레이션을 매핑해주는 도구입니다.
 * 시퀄라이즈를 오로지 MYSQL과 같이 써야만 하는것은 아닙니다
 * 시퀄라이즈를 쓰는 이유는 자바스크립트 구문을 알아서 SQL로 바꿔주기 떄문입니다 따라서 SQL언어를 직접 사용하지 않아도
 * 자바스크립트만으로 mysql을 조작할수 있고,SQL을 몰라도 어느정도 다를 수 있기 떄문입니다.
 * 시퀄라이즈 를 위한 새 프로젝트를 생성합니다
 * learn-sequelize 폴더 안에 생성합니다.
 * 
 * 시퀗라이즈에 필요한 sequelize와 sequelize-cli, mysql2패키지를 설치합니다
 * 
 * npm i express morgan nunjucks sequelize sequelize-cli mysql2
 * npm i D nodemon
 * 
 * sequelize-cli는 시퀄라이즈 명령어를 실행하기 위한 패키지이고 mysql2 는 mysql과 시퀄라이즈를 이어주는 드라이버 입니다
 * mysql2자체가 데이터 베이스 프로그램은 아니므로 오해하면 안댑니다
 * 설치 완료후 sequeluze init 명령어를 호출하면 됩니다 전역 설치 없이 명령어를  사용하려면 앞에 npx를 붙이면 됩니다
 * 
 * npx sequelize init
 * 
 * models폴더 안에 index.js가 생성되었는지 확인합니다
 * 그대로 사용하게 되면 에러가 발생ㄹ하고 필요없는 부분도 많으므로 다음과 같이 수정합니다
 * 
 */

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'developpment';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database,config.username,config.paaword,config);
db.sequelize =sequelize;

module.exports=db;

//익스프레스 앱과 mysql연결

//app,js

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjuks = require('nunjucks');

const {sequelize} =require('./models');

const app=express();
app.set('port',process.env.PORT ||3000);
app.set('view engine','html');
nunjuks.configure('views',{
    express:app,
    watch:true,
});
sequelize.sync({force:false})
    .then(()=>{
        console.log('데이터베이스 연결성공');
    })
    .eatch((err)=>{
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'pub;ic')));
app.use(express.json());

app.use(express.urlencoded({ extended:false}));

app.use((req,res,next)=>{
    const error = new ERROR(`${req.method} ${req.url} 라우터가 없습니다`);
    error.statue = 404;
    next(error);
});

app.use((err,req,res,next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production'? err:{};
    res.status(err.status ||500);
    res.render('error');
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'빈 포트에서 대기중');
});

/**  require('./models')는 require('./models/index.js')와 같습니다 index파일은 require시 이름을 생략할 수 있습니다
 * db.sequelize 를 불러와서 sync메서드를 사용해 서버실행시 MYSQL 과 연동되도록 했습니다
내부에 force:false 옵션이 있는데 이 옵 션을 true로 설정하면 테이블을 재생성합니다 테이블을 잘못 만든 경우에 true로 설정하면 됩니다

mysql과 연동할떄는 comfig 폴더안에 config정보가 사용됩니다 다음과 같이 수정합니다 자동생성한 config.json operatorAliasest속성이 있다면 삭제합니다


config.json

development
username :root
password:[루트비밀번호]
database:node.js
host:127.0.0.1
dialect:mysql


develoment.password와 developent.database를 현재 mysql커넥션과 일치하게 수정하면 됩니다

test와 production쪽은 각각 테스트 용도와 베포용도로 접속하기 위해 사용하는 것이므로 여기서는 설정하지 않습니다

password속성에는 여러분의 mysql비밀번호를입력하고 database속성에는 nodejs를 입력하세여

이 설정은 process.env.NODE_ENV가 development일떄 적용됩니다 나중에 배포할떄는 process.env.NODE_ENV를 production으로 설정해둡니다 따라서 
베포환경을 위해 데이터베이스 설정할 떄는 config/config.json의 production속성을 수정하면됩니다
마찬가지고 테스트환경일떄는 test속성을 수정합니다

npm statr서버로 실행하면 3001 번 포트에서 서버가 돌아갑니다 라우터를 만들지 않아 접속을 할수 없지만 로그가 실행됩니다

만약 데이트베잇스 연결성공이란ㄴ 문자가뜨면 연결이성공한 것입니다 

이제 MYSQL에서 정의한 테이블을 시퀄라이즈에서도 정의해야합니다 MYSQL의 테이블은 시퀄라이즈의 모델과 대응됩니다 시퀄라이즈는 모델과 MYSQL의 테이블을 연결해주는 역할을 합니다

User거ㅣ comment모델을 만들어 user테이블과 comments테이블에 연결하빈다 시퀄라이즈는 기본적으로 모델이름은 단수형,테이블 이름은 복수형으로 합니다

models/user.js
*/

const Sequelize = require('sequelize');
 module.exports = class User extends Sequelize.Model {
     static init(sequelize ){
         return super.init({
             name:{
                 type:Sequelize.STRING(20),
                 allowNull:false,
                 unique:true
             },
             age:{
                 type:Sequelize.INTEGER.UNSIGNED,
                 allowNull:false,
             },
             married:{
                 type:Sequelize.BOOLEAN,
                 allowNull:false,
             },
             comment:{
                 type:Sequelize.TEXT,
                 allowNull:true
             },
             created_at:{
                 type:Sequelize.DATE,
                 allowNull:false,
                 defaultValue:Sequelize.NOW,
             },
         },{
             sequelize,
             timestamps:false,
             underscored:false,
             modelName:'User',
             tabelName:'users',
             paranoid:false,
             charset:'utf8',
             collate:'utf8_general_ci'
         });
     }
     static associate(db){}
 };

 /** User 모델을 만들고 모듈로 exports했습니다
  * 
  * User모델은 Sequelize.model을 확장한 클래스로 선언합니다 클래스 문법을 사용하지만 클래스의 지식이 없어도 사용할수 있습니다.패턴만 숙지하면됩니다.
  * 모댈은 킄게 static init 메서ㅡㄷ와 static associate메소드로 나뉩니다.
  * init메서드에는 테이블에 대한 설정을 하였고 associate매서드에는 다른 모델과의 관계를 적습니다 init메서드부터 살표봅시다 super.init 메서드의 첫번쨰인수가 테이블 커럶에 대한 설정이고,
  * 두번쨰 인수가 테이블 자체의 대한 설정입니다
  * 
  * 시퀄라이즈는 알아서 id를 기본키를 연결하므로 id컬럼은 적어줄 필요가 없습니다 나머지 컬럼의 스펙을 입력합니다 MYSQL테이블과 컬럼 내용이 일치애햐 적황하게 대응됩니다
  * 
  * 시퀄라이즈의 자료형은 MYSQL의 자료형과는 조금 다릅니다 VARCHAR은 STRING으로 INT는 INREGER으로 TINYINT은 BOOLEAN으로 DATETIME은 DATE로 적습니다
  * INTEGER,UNSIGNED는 ENSIGNED옵션이 적용된 INT를 의미합니다
  *  여기에 ZEROFILL옵션도 사용하고 싶다면 INTEGER.UNSIGNED.ZEROFILL을 적습니다
  * 
  * allowNull은 NOT NULL옵션과 동일합니다.unique 는 UNIQUE옵션입니다. defauluValue는 기본값 (DEFAILT)을 의미합니다. Sequelize.NOW로 현재시간을 기본값으로 사용할수 잇스빈다
  * sql의 now()와 같습니다
  * 
  * MYSQL             시퀄라이즈
  *  
  * VARCHAR(100)      STRING(100)
  * INT                INTREGER
  * TINYINT            BOOLEAN
  * DETETIME           DATE
  * INT UNSIGNED      INTEGER.UNSIGNED
  * NOT NULL           allowNull:false
  * UNIQUE             unique: true
  * DEFAULT now( )      defaultValue:sequelize.NOW
  * 
  * 
  * super.init 메서드의 두번쨰 인수는 테이블 옵션입니다
  * 
  * sequelize:statirc init 메서듸의 매개변수와 연결되는 옵션으로 db.sequelize객체를 넣어야합니다 나중에 model/index.js에세 연결합니다
  * 
  * timestamps: 현재 false로 되어 있으며 이솓성 값이 true면 시퀄라이즈는 createdAt과 updatedAt컬럼을 추가합니다 각각 로우가 생성할 떄와 수정될떄의 시간이 자동으로
  * 입력됩니다 하지만 예제에서는 직접 created_at 컬럼을 만들었으므러 timestamps속성이 필여하지 않습니다 따라서 속성값을 false로 하여 자동으로 날짜 컬럼을 추가하는 기능을 해제 했습니다
  * 
  * underscored:시퀄라이즈는 기본적으로 테이블명과 컬럼명을 캐멀케이스로 만듭니다 이를 스네이크케이스로 바꾸는 옵션입니다
  * 
  * modelName:모델 이름을 설정할 수 있습니다 노드 프로젝트에서 사용합니다
  * 
  * tableName:실제 데이터베이스의 테이블 이름이 됩니다 기본적으로는 모델 이름을 소문자 및 복수형으로 만듭니다 모델 이름이 User라면 테이블 이름은 users가 됩니다
  * 
  * paranoid: true로 설정하면 deletedAt이라는 컬럼이 생깁니다 로우를 삭제할떄 완전히 지워지지 않고 deletedAt에 지운 시간이 기록됩니다 로우를 조회하는 명령을 내렸을 떄는 
  * deleteAt의 값이 null인 로우 (삭제되지 않았다는 뜻)를 조회합니다 이렇게 하는 이유는 나중에 로우를 복원하기 위해서입니다 로우를 복원할 상활이 생길 것 같다면 true로 해놓습니다
  * 
  * charset과 collate : 각각 utf8과 utf8_general_ci 로 설정해야 한글이 입력됩니다 이미티콘까지 입력되게 하고싶다면 utf8mb4와 utf8mb4_general_ci 를 입력합니다
  * 
  * Comment모델 생성
  * models/commemt.js 
  */

const Sequelize = require('sequelize');

module.exports =class Comment extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            comment:{
                type:Sequelize.STRING(100),
                allowNull:false,

            },
            created_at:{
                type:Sequelize.DATE,
                allowNull:true,
                defaultValue:Sequelize.NOW,
            },

        },{
            sequelize,
            timestamps:false,
            modelName:'Comment',
            tabelName:'comments',
            paranoid:false,
            charset:'utf8mb4',
            collate:'utf8mb4_general_Ci',
        });
    }
    static associate(db){}
};

/** Comment모델에 user테이블과 연결된 comment컬럼이 없습니다 이부분은 모델을 정의할떄 넣어도 되지만 시퀄라이즈 자체에서 관계를 따로 정의할수 있습니다
 * 모델을 생성하였다면 models/index.js와 연결합니다
 *  
 * modelas/index.js
 */

const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');


// ...

db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports=db;

/** db 라는 객체에 USer와 Comment모델을 담아두었습니다 앞으로 db객체를 require하여 User와 Comment모델에 접글할수 있습니다
 * Uset.init 과 Comment.init은 각각 모델의 static.init 메서드를 호출하는 것입니다 init이 실행되어야 테이블이 모댈로 연결됩니다. 다른 테이블 과의 관계를 연겷는 associate메서드도 미리 실행해둡니다
 * 
 * user 테이블과 commens 테이블 간의 관계를 정의하기
 * 
 * 사용자 한명은 댓글을 여러개 작성이가능합니다. 하지만 갯글 하나에 사용자가 여러명일수는 없습니다
 * 이러한 관계를 일대다 1:N 관계라 합니다 
 * 다른 관계로 일대일 다대다 관계가 있습니다 일대일 관계로는 사용자와 사용자에 대한 정보테이블을 예로 들수 있습니다
 * 사용자 한명은 자신의 정보를 담고 있는 테이블과만 관계가 있습니다 정보 테이블도 한사람만을 가리킵니다
 * 이러한 관계를 일대일 관계라 합니다
 * 다대다 관계로는 게시글 테이블과 해스태그 관계를 들수 있습니다 한 게시글에 해시태그가 여러개 달수 있고 한 해시태그도 여러개 게시글에 달릴수도 있씁니다
 * 이러한 관계를 다대다 N:M 관계라합니다
 * 
 * 
 * MY SQL에서는 JOIN 이라는 기능으로 여러 테이블 간에 관계를 파악해 결과를 도출합니다 시퀄라이즈는 JOIN기능도 알아서 구현합니다 대신 테이블에 어떤관계가 있는지 시퀄라이즈에 알려야합니다
 * 
 * 1:N
 * 
 * 시퀄라이즈에서느 1:N 관계를 hasMany 라는 메서드로 표현합니다 users테이블의 로우 하나를 불러올 떄 연결된 comments 테이블의 로우들도 같이 불러올수 있습니다 반대로
 * belongsTo메서드도 있습니다 comments테이블의 로우를 불러올떄 연결된 users 테이블의 로우를 가져옵니다
 * 
 * 모델 가각의 static associate 메서드에 넣습니다
 * models/user.js
 * 
 */
//static.associate(db){
 //   db.User.hasMany(db.Comment,{foreignKey:'commenter',soureKey:'id'});
//}

//models/comment.js

//static.associate(db){
 //   db.User.belongsTo(db.Comment,{foreignKey:'commenter',soureKey:'id'});
//}

/** 어떤 모델에 hasMany를 쓰고 어떤 모델에 belongsTo 를 쓰는지 헷갈릴것입니다 다른모델에 정보가 들어가는 테이블에
 * belongsTo를 사용합니다 예제에서는 commenter컬럼이 추가되는 Comment모델에 belongsTO를 사용하면 됩니다 사용자는 한명이고 그에 속한 댓글은 여러개 이므로
 * 로우에 사용자(commenter)이 누구인지 적어야합니다
 * 
 * 시퀄라이즈는 모델간 관계를 파악해서 Comment모델에 foreignKey인 commenter컬럼을 추가합니다 Commenter 모델의 왜리키 컬럼은 commenter고 User모델의 id컬럼을 가리키고 잇습니다
 *
 * hasMany 메서드에서는 sourceKey 속성에 id를 넣고 belongsTo메서드에서는 targetKey 속성에 id 를 넣습니다 soueceKey의 id와 targetKey의 id 모두 User모델의 id입니다
 * hasMany에서는 sourceKey를 쓰고 belongsTO에서는 targetKey를 쓴다고 생각하면 됩니다
 * 
 * foreignKey를 따로 지정하지 않는다면 이름이 모델명 +기본 키인 컬럼이 모델에 생성됩니다 예를 들어 commenter를 foreingKey로 직접 넣어주지 않았다면 user(모델명)+기본 키(id)가 합쳐진
 * UserId가 foreignKey로 생성됩니다.
 * 
 * npm statrt 명령어로 서버를 시작하고 콘솔을 보면 다음과 같은 메세지가 나옵니다
 * Executing(default)
 * 
 * 
 * 시퀄라이즈는 워크벤트가 테이블을 만들때 실행했던 구믄과 비슷한 SQL문을 만듭니다
 * CREATE TABLE 뒤에 IF NOT EXISTS라고  되어 있는데 
 * 이부분은 테이블이 존재하지 않을 경우에 실행된다는 뜻입니다
 * 이미 워크벤치 또는 콘솔로 테이블을 만들어 두었으므로 구문은 실행되지 않습니다
 * 대신 실수로 테이블이 삭제되었을경우 위 구문으러 인하여 다시 테이블이 생성됩니다
 */


/**  1 :1 
 * 
 * 1:1 관계에서는 hasMany 메서드 대신 hanOne 메서드를 사용합니다  사용자 정보를 담고 있는 가상의 INFO모델이 있다고 하면 다음과 같이 표현할수 있습니다
 * 
*/

db.User.hasOns(db.Info,{foreignKey:'UserId',sourceKey:'id'});
db.Info.hasOns(db.User,{foreignKey:'UserId',targetKey:'id'});

/** 1대1 관계라 해도 belongsTo 와 hasOne이 반대면 안댑니다 belognsTO를 사용하는 Info모델에 UserId 컬럼이 추가되기 떄문입니다
 * 
 * 
 * N:M
 * 
 * 다대다
 * 
 * 시퀄라이즈서는 N:M관계를 표햔하기 위해 belongsToMany메서드가 있습니다
 * 게시글 정보를 담고있는 가상의 Post모델과 해시태그 정보를 담고있는 가상의 Hashtag 모델이 있다고 하면 다음과 같이 표현 할수 있습니다.
 * 
 */

db.Post.belongsToMany(db.Hashtag,{through:'PostHashtag'});
db.Hashtag.belongsToMany(db.Post,{through:'PostHashtag'});

/** 양쪽 모델에 모두 belongsToMany 메서드를 사용합니다 N:M 관계의 특성상 새로운 모델이 생성됩ㄴ다
 * through 속성에 그 이름을 적으면됩니다 새로 생성된 PostHashtag 모델에는 게시글과 해스태그의 아이디가 저장됩니다
 * 
 * 익스프레스로 sns 만들기 에서 N:M 관계사용하는것 을 볼수 있습니다
 * 
 * N:M에서는 데이터를 조회할 떄 여러 단계를 거쳐야 합니다 노드 해시태그를 사용한 게시물을 조회하는 경우라면 먼저 노드 해시태그를 Hashtag모델에서 조회하고 가져온 태그의 아이디(1)을바탕으로
 * PostHashtag모델에서 hashtagId가 1인 PostId들을 찾아 Post모델에서 정보를 가져옵니다
 * 
 * 자동으로 만들어진  모델들도 다음과 같이 접근할수 있습니다
 * 
 */
db.sequelize.models.PostHashtag


/**쿼리 알아보기
 * 
 * 시퀄라이즈는 CRUD작업을 하려면 먼저 시퀄라이즈 쿼리를 알아야 합니다 SQL문을 자바스립트로 생성하는 것이라 시퀄라이즈만의 방식이 있습니다 SQL문에 상응하는 욥션들입니다
 * 쿼리는 프로미스를 반환하므로 then을 붙여 결괏값을 받을수 있습니다 async/await 문법과 같이 사용할수 도 있습니다
 * 
 * 로우를 생성하는 쿼리부터 알아보겟습니다 첫줄이 SQL문이고 그 아래는 시퀄라이즈  쿼리입니다.
 * 
 * INSERT INTO nodejs.users(name ,age,married,comment) VALUES ('zero' ,24,0,'자기소개1');
 * 
 */

const {user} =require('../models');
User.create({
    name:'zero',
    age:24,
    married:false,
    comment:'자기소개1',
});

/** models 모듈에서 USer모델을 불러와 create메서드를 사용하면 됩니다 앞으로 나오는 모든 메서드들은 User모델을 불러왔다는 전제하에 소개합니다
 * 
 * 한가지 주의할점은 데이터를 넣을 떄 MYSQL의 자료형이 아니라 시퀄라이즈 모델에 정의한 자료대로 넣어야 한다는 것입니다 이것이 married가 0이아니라 false인 이유입니다
 * 시퀄라이즈가 알아서 MYSQL 자료형으로 버꿉니다 자료형이나 옵션에 부합하지 않는 데이터응 넣엇을떄는 시퀄라이즈가 에러를 발생시킵니다
 * 
 * userts 데이블의 모든 데이터를 조회하는 SQL문입니다 findAll 메서드를 사용하면 됩니다
 * 
 * SELECT * FROM nodejs.users;
 * User.findAll({});
 * 
 * 다음은 Users 테이블의 데이터 하나만 가져오는 SQL문입니다 데이터를 하나만 가져올 떄는 findOne메서드를 여러개 가져올 떄는 findAll메서드를 사용한다 생각하면됩니다
 * 
 * SELECT * FROM nodejs.users LIMITS 1;
 * Use.findOne({});
 * 
 * attributes옵션을 사용해서 원하는 컬럼만 가져올 수도 있습니다 
 * 
 * SELECT name, married FROM nodejs.users;
 * User.findAll({
 * attributes:['name','marrued'],
 * });
 * 
 * 
 * 
 * where옵션이 조건들을 나열하는 옵션입니다
 * 
 * SELECT name,age FROM nodejs.users WHERE married = 1 AND age >30;*
 */
 const {Op} = require('sequelize');
 const {User} =require('../models');
 User.findAll({
     attributes:['name','age'],
     where:{
         married:true,
         age:{[Op.gt]:30}
     }
 });

/** MY SQL에서는 undefined라는 자료형을 지원하지 않으므로 where옵션에는 undefined가 들어가면 안됩ㄴ디ㅏ 빈 갑을 넣고자 하면 null을 넣어야합니다
 * 시퀄라이즈는 자바스크립트 객체를 사용해서 쿼리를 생성해야 하므로 og.gt  같은 특수한 연산자들이 사용됩니다 (ES2015문법)
 * 
 * 자주쓰이는 연산자로는 Og.gt(초과) , Og.gte(이상), Op.lt(미만) , Op,lte(이하),Op.ne(같지 않음),Op.or(또는),Op.in(배열요소중 하나),Op.notIn(배열 요소와 모두 다름)
 * 이 있습니다
 * 
 * 
 * Or.or
 * SELECT id,name FROM users WHERE married = 0 OR age >30;
 */
const {Op} = require('sequelize');
const {User} = require('../models');
User.findAll({
    attributes:['id','name'],
    where:{
        [Op.or]:[{married:false},{age:{[Op.gt]:30}}],
    },
});

//Op.or 속성에 OR 연산을 적용할 쿼리들을 배열로 나열하면 됩니다.
//SELECT id, name FROM users ORDER BY age DESC;
User.findAll({
    attributes:['id','name'],
    order:[['age','DESC']]
});

/** 시퀄라이즈 정렬방식이며 order옶션으로 가능합니다  배열안에 배열이 있다는 접에 주의하세요
 * 
 *정렬은 꼭 컬럼 하나로 하는게 아니라 컴럼 두개 이상으로 할수도 있기 떄문입ㄴ디ㅏ
 다음은 조회할 로우 개수를 설정하는 방법입니다 LIMIT 1인 경우에는 findAll대신 findOne 메서드를 사용해도 되지만 다음과 같이 limit 옵셥으로 할수도 있습니다
 */

 //SELECT id, name FROM users ORDER BY age DESC LIMIT 1;
 User.findAll({
     attributes:['id','name'],
     order:[['age','DESC']],
     limit:1
 });

 //limit 옵션으로도 가능합니다 OFFSET역시 offset 속성으로 구현할수 있습니다.
//SELECT id, name FROM users ORDRT BY age DESC LIMIT 1 OFFSET 1;
User.findAll({
    attributes:['id','name'],
    order:['age','DESC'],
    limit :1,
    offset :1
});

//로우를 수정하는 쿼리
//UPDATE nodejs.users SET comment = '바꿀내용' WHERE id =2;
User.update({
    comment:'바꿀내용',
},{
    where:{id:2}   
});
//Update메서드로 수정할수 있습니다 첫번쨰 인수는 수정할 내용이고,두번쨰 인수는 어떤 로우로 수정할지에 대한 조건입니다 Where옵션에 조건들을 적습니다
//로우삭제 쿼리
//DELETE FROM nodejs.users WHERE id=2;
User.destory({
    where:{id:2}
});

//destory 메서드로 삭제합니다 where옵션에 조건들을 적습니다

//관계 쿼리
//findOne 이나 findAll 메서드를 호출 할떄 프로미스의 결과로 모델을 반환합니다 (findAll은 모두 찾는 것이므로 모델의 배열을 반환합니다)

const user  =await User.findOne({});
console.log(user.nick); //사용자 닉네임

//User 모델의 정보에도 바로 접근 할수 있지만 더 편리한 점은 관계 쿼리를 지원한다는 것입니다
//MY SQL로 따지면 JOIN기능입니다 현재 USER모델은 Comment 모델과 hasMany-belongsTo관계가 맺어져 있습니다 민약 특정 사용자를 가져오면서 그 사람의 댓글까지 모두 가져오고 싶다면includ속성을사용합니다

const user = await User.findOne({
    include:[{
        model:Comment,
    }]
});
console.log(user.Comment);//사용자 댓글

//어떤 모델과 관계가 있는지를 include배열에 넣어주면됩니다 배열인 이류는 다양한 모델과 관계가 있을수 있기떄문에
//댓글은 여러개 있을수도 있으므로(hasMany)user.Commets로 접근 가능합니다
//또는 다음과 같이 댓글에 접근할수도 있습니다

const user = await User.findOne({});
const commemts = await user.getComments();
console.log(commemts);//사용자 댓글

//관계를 설정헀다면 getComments(조회)외에도 setComments(수정).addComment(하나생성),addComments(여러개생성),removeComments(삭제)메서드를 지원합니다 동사 뒤에 모델명이 붙는 형식입니다
//동사 뒤의 모델 이름을 바꾸고 싶다면 관계 설정시 as옵셥을 사용할수도 있습ㄴ니다

//관계 설정랄떄 as등록

db.User.hasMany(db.Comment,{foreignKey:'commenter',sourceKey:'id',as:'Answers'});
//쿼리할 떄는
const user = await User.findOne({});
const comments = await user.getAnswers();
console.log(comments); //사용자 댓글

//as를 설정하면 include시 추가되는 댓글 객체도 user.Answers로 바뀝니다
//include나 관계쿼리 메서드에도 where나 attributes같은 옵션을 사용할수 있습니다

const user = await User.findOne({
    include:[{
        model:Comment,
        where:{
            id:1
        },
        attributes:['id'],
    }]
});
//또는
const commemt = await user.getComments({
    where:{
        id:1,

    },
    attributes:['id'],
});

//댓글을 가져올떄는 id 가 1인 댓글만 가져오고 컬럼도 id컬럼만 가져오도록 하고 있습니다
//관계 쿼리시 조회는 위와 같이 히자만 수정,생성,삭제떄는 조금 다른 점이 있습니다

const user = await User.findOne({});
const comment = await Comment.create();
await user.addComment(comment);
//또는
await user.addComment(commemt.id);

//여러개를 추가 할떄는 배열로 추가할수 있습니다.
const user = await User.findOne({});
const comment1 = await Comment.create();
const comment2 = await Comment.create();
await user.addComment([comment1,comment2]);

//관계 쿼리 메서드의 인수로 추가할 댓글 모델을 넣거나 댓글의 아이디를 넣으면 됩니다 수정이나 삭제도 마찬가지입니다

//SQL쿼리하기

//만약 시퀄라이즈의 쿼리를 사용하기 싫거나 어떻게 해야할지 모르겠다면 직접 SQL문을 통해 쿼리할수도 있습니다

const [result,metadata]= await sequelize.query('SELECT * form comments');
console.log(result);

//웬만하면 시퀄라이즈의 쿼리를 사용하는 것을 추천하지만 시퀄라이즈 쿼리로 할수 없는 경우에는 위와 같이 하면 됩니다.

//조금 전에 배웟던 쿼리로 CRUD작업을 해봅시다. 모댈에사 데이터를받아 페이지를 렌더링 하는 방법과 JSON 형식으로 데이터를 가져오는 방법을 알아보겟습니다

//간단하게 사용자 정보를 등록하고 사용자가 등록한 댓글을 자겨오는 서버입니다
//먼저 다음과 같이 views폴더를 만들고 그 안에 sequelize.html파일과 error.html파일을 만듭니다 restFront.html처럼 AJAX를 사용해 서버와 통신합니다
//프런트엔드 코드 https://github.com/zerocho/nodejs-book

/**
 *views/sequelize.html
 * 
 *  <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>시퀄라이즈 서버</title>
    <style>
      table { border: 1px solid black; border-collapse: collapse; }
      table th, table td { border: 1px solid black; }
    </style>
  </head>
  <body>
    <div>
      <form id="user-form">
        <fieldset>
          <legend>사용자 등록</legend>
          <div><input id="username" type="text" placeholder="이름"></div>
          <div><input id="age" type="number" placeholder="나이"></div>
          <div><input id="married" type="checkbox"><label for="married">결혼 여부</label></div>
          <button type="submit">등록</button>
        </fieldset>
      </form>
    </div>
    <br>
    <table id="user-list">
      <thead>
      <tr>
        <th>아이디</th>
        <th>이름</th>
        <th>나이</th>
        <th>결혼여부</th>
      </tr>
      </thead>
      <tbody>
        {% for user in users %}
        <tr>
          <td>{{user.id}}</td>
          <td>{{user.name}}</td>
          <td>{{user.age}}</td>
          <td>{{ '기혼' if user.married else '미혼'}}</td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
    <br>
    <div>
      <form id="comment-form">
        <fieldset>
          <legend>댓글 등록</legend>
          <div><input id="userid" type="text" placeholder="사용자 아이디"></div>
          <div><input id="comment" type="text" placeholder="댓글"></div>
          <button type="submit">등록</button>
        </fieldset>
      </form>
    </div>
    <br>
    <table id="comment-list">
      <thead>
      <tr>
        <th>아이디</th>
        <th>작성자</th>
        <th>댓글</th>
        <th>수정</th>
        <th>삭제</th>
      </tr>
      </thead>
      <tbody></tbody>
    </table>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="/sequelize.js"></script>
  </body>
</html>
 */

/**views/error.html
 * 
 * 
 * <h1>{{message}}</h1>
<h2>{{error.status}}</h2>
<pre>{{error.stack}}</pre>
 */


//public 폴더 안에 sequeluze.js 파일도 만듭니다

// public/sequelize.js
// 사용자 이름 눌렀을 때 댓글 로딩
document.querySelectorAll('#user-list tr').forEach((el) => {
  el.addEventListener('click', function () {
    const id = el.querySelector('td').textContent;
    getComment(id);
  });
});
// 사용자 로딩
async function getUser() {
  try {
    const res = await axios.get('/users');
    const users = res.data;
    console.log(users);
    const tbody = document.querySelector('#user-list tbody');
    tbody.innerHTML = '';
    users.map(function (user) {
      const row = document.createElement('tr');
      row.addEventListener('click', () => {
        getComment(user.id);
      });
      // 로우 셀 추가
      let td = document.createElement('td');
      td.textContent = user.id;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = user.name;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = user.age;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = user.married ? '기혼' : '미혼';
      row.appendChild(td);
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}
// 댓글 로딩
async function getComment(id) {
  try {
    const res = await axios.get(`/users/${id}/comments`);
    const comments = res.data;
    const tbody = document.querySelector('#comment-list tbody');
    tbody.innerHTML = '';
    comments.map(function (comment) {
      // 로우 셀 추가
      const row = document.createElement('tr');
      let td = document.createElement('td');
      td.textContent = comment.id;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = comment.User.name;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = comment.comment;
      row.appendChild(td);
      const edit = document.createElement('button');
      edit.textContent = '수정';
      edit.addEventListener('click', async () => { // 수정 클릭 시
        const newComment = prompt('바꿀 내용을 입력하세요');
        if (!newComment) {
          return alert('내용을 반드시 입력하셔야 합니다');
        }
        try {
          await axios.patch(`/comments/${comment.id}`, { comment: newComment });
          getComment(id);
        } catch (err) {
          console.error(err);
        }
      });
      const remove = document.createElement('button');
      remove.textContent = '삭제';
      remove.addEventListener('click', async () => { // 삭제 클릭 시
        try {
          await axios.delete(`/comments/${comment.id}`);
          getComment(id);
        } catch (err) {
          console.error(err);
        }
      });
      // 버튼 추가
      td = document.createElement('td');
      td.appendChild(edit);
      row.appendChild(td);
      td = document.createElement('td');
      td.appendChild(remove);
      row.appendChild(td);
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}
// 사용자 등록 시
document.getElementById('user-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  const age = e.target.age.value;
  const married = e.target.married.checked;
  if (!name) {
    return alert('이름을 입력하세요');
  }
  if (!age) {
    return alert('나이를 입력하세요');
  }
  try {
    await axios.post('/users', { name, age, married });
    getUser();
  } catch (err) {
    console.error(err);
  }
  e.target.username.value = '';
  e.target.age.value = '';
  e.target.married.checked = false;
});
// 댓글 등록 시
document.getElementById('comment-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = e.target.userid.value;
  const comment = e.target.comment.value;
  if (!id) {
    return alert('아이디를 입력하세요');
  }
  if (!comment) {
    return alert('댓글을 입력하세요');
  }
  try {
    await axios.post('/comments', { id, comment });
    getComment(id);
  } catch (err) {
    console.error(err);
  }
  e.target.userid.value = '';
  e.target.comment.value = '';
});
 

/** HTML 쪾보다는 서버 코드 위주로 보면됩니다 script 태그에는 버튼들을 눌렀을떄 서버의 라우터로 AJAX요청을 보내는 코드가 들어 있습니다
 * 
 * 조금뒤에 만들 라우터들을 미리 app.js에 연결합니다
 */

 const express = require('express');
 const path = require('path');
 const morgan = require('morgan');
 const nunjucks = require('nunjucks');
 
 const { sequelize } = require('./models');
 const indexRouter = require('./routes');
 const usersRouter = require('./routes/users');
 const commentsRouter = require('./routes/comments');
 
 const app = express();
 app.set('port', process.env.PORT || 3001);
 app.set('view engine', 'html');
 nunjucks.configure('views', {
   express: app,
   watch: true,
 });
 sequelize.sync({ force: false })
   .then(() => {
     console.log('데이터베이스 연결 성공');
   })
   .catch((err) => {
     console.error(err);
   });
 
 app.use(morgan('dev'));
 app.use(express.static(path.join(__dirname, 'public')));
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 
 app.use('/', indexRouter);
 app.use('/users', usersRouter);
 app.use('/comments', commentsRouter);
 
 app.use((req, res, next) => {
   const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
   error.status = 404;
   next(error);
 });
 
 app.use((err, req, res, next) => {
   res.locals.message = err.message;
   res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
   res.status(err.status || 500);
   res.render('error');
 });
 
 app.listen(app.get('port'), () => {
   console.log(app.get('port'), '번 포트에서 대기 중');
 });

 //라우터의 내용은 다음과 같습니다 sequelize.js 에 나오는 GET,POST,PUT,DELETE요청에 해당하는 라우터를 만듭니다 rouees폴다를 만들고 그 안에 index.js를 만듭니다

 //routes/index.js

 const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.render('sequelize', { users });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

//먼저 GET /로 접속했을떄의 라우터입니다. user.findAll메서드로 모든 사용자를 찾은 후 sequelize.html을 렌더링 할떄 결과값인 users를 넗습니다
//시퀄라이즈는 프로미스를 기본적으로 지원하므로 async/await과 tyu/catch 문을 사용해서 각각 조회 성공시와 실패 시의 정보를 얻을수 있습니다.
//이렇게 미리 데이터베이스에서 데이터를 조사한 후 템플릿 렌더링에 사용할수 있습니다.
//다음은 users.js입니다 router.route메서드로 같은 라우트 경로는 하나로 묶었습니다.

//routes/users.js

const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get('/:id/comments', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: {
        model: User,
        where: { id: req.params.id },
      },
    });
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

/** GET /users 와 POST /usets 주소로 요청이 들어올떄의 라우터입니다 각각 사용자를 조회하는 요청과 사용자를 등록하는 요청을 처리합니다
 * GET /에서도 사용자 데이터를 조회했지만 GET / users 에서는 데이터를 JSON 형식으로 반환한다는 것에 차이가 있습니다.
 * 
 * GET /users/:id/comments 라우터에는 findAll메서드에 옵션이 추가되어 있습니다. include옵션에서 model속성에는 User 모델을,where속성에는 :id로 받은 아이디 값을 넣어습니다
 * :id 는 라우터 매개변수로 설명햇습니다.   req.params.id로 값을 가져올수 있습니다. GET/users/1/comments라면 사용자 id가 1인 댓글을 불러옵니다.조회된 댓글 객체에는 include로 넣어준 사용자 
 * 정보도 들어 있으므로 작성자의 이름이나 나이 등을 조회할수 있습니다
 * 다음은 comments.js입니다
 * 
 */


 const express = require('express');
 const { Comment } = require('../models');
 
 const router = express.Router();
 
 router.post('/', async (req, res, next) => {
   try {
     const comment = await Comment.create({
       commenter: req.body.id,
       comment: req.body.comment,
     });
     console.log(comment);
     res.status(201).json(comment);
   } catch (err) {
     console.error(err);
     next(err);
   }
 });
 
 router.route('/:id')
   .patch(async (req, res, next) => {
     try {
       const result = await Comment.update({
         comment: req.body.comment,
       }, {
         where: { id: req.params.id },
       });
       res.json(result);
     } catch (err) {
       console.error(err);
       next(err);
     }
   })
   .delete(async (req, res, next) => {
     try {
       const result = await Comment.destroy({ where: { id: req.params.id } });
       res.json(result);
     } catch (err) {
       console.error(err);
       next(err);
     }
   });
 
 module.exports = router;

 //댓글에 관련된 CRUD작업을 하는 라우터입니다 POST/comments,PATCH/comments/:id.DELETE/comments/:id를 등록했습니다
 //POST/comments라우터는 댓글을 생성하는 라우터입니다 commrnter속성에 사용자 아디디를 널어 사용자와 댓글을 연결합니다

 //PATCH /comments/:id 와 DELETE/comments/:id 라우터는 각각 댓글을 수정,삭제하는 라우터입니다
 //수정과 삭제에는 각각 update.와 destory메서드를 사용합니다 
 //이제 npm start로 서버를 실행하고 3001번 localhost로 접속합니다