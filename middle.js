/** 미들 웨어는 익스프레스의 핵심입니다 요청과 응답의 중간에 위치하여 미들웨어라 부릅니다
 *  미들웨어가 익스프레스의 핵심이며 미들웨어는 app.use와 함꼐 사용됩니다 app.use(미들웨아)꼴입니다
 * 
 */
 const express = require('express');
 const path = require('path');
 
 const app = express();
 
 app.set('port',process.env.PORT || 3000);

 app.use((req,res,next)=>{
     console.log('모든 요청에 다 실행됩니다');
     next();
 });
 
 app.get('/' ,(req,res,next)=>{
     console.log('GET/요청에서만 실행됩니다.');
     next();
     
 },(req,res)=>{
     throw new Error('에러는 에러 처리 미들웨어로 갑니다')
 });

app.use((err,req,res,next)=>{
    console.error(err);
    res.status(500).send(err.message);
});


 app.listen(app.get('port'),()=>{
     console.log(app.get('port'),'번 포트에서 대기중');
 });
 
 
 
/** app.use에 매개변수가 req,res,next인 함수를 넣으면 됩니다 미들웨어는 위에서부터 아래로 순서대로 실행되면서 요청과 응갑사이에 특별한 기능을 추가할 수 있습니다
 * 이번에는 next매개변수를 사용헀는데 다음 미들웨어로 넘어가는 함수입니다
 * next를 실행하지 않으면 다음 미들웨어가 실행되지 않습니다
 * 주소를 첫번쨰 인수로 넣어주지 않으면 미들웨어는 모든 요청에서 실행되고 주소를 넣는다면 해당하는 요청에서만 실행된다고 보면됩나다
 * 
 * app.use(미들웨어)  모든 요청에서 미들웨어실행
 * app.use('/abc', 미들웨어) abc로 시작하는 요청에서 미들웨어 실행
 * app.post('/abc',미들웨어)abc로 시작하는 post요청에서 미들웨어 실행
 * 
 * app.use나 app.get같은 라우터에 미들웨어를 여러개 장착할 수 있습니다 현대 app.get 라우터에 두개의 미들웨어가 장착되어 잇습니다 다만 이떄도 next를 호춯해야 다음으로 넘어갈수 있습니다
 * 현재 app.get('/')의 두번쨰  미들웨어에서 에러가 발생하고 이에러는  그 아래에 있는 에러처리 미들웨어에 전달됩니다
 * 
 * 에러처리 미들웨어는 매개변수가err,req,res,next로 네개입니다 모든 매개변수를 사용하지 않더라도 매개변수가 반드시 네게여야만합니다 첫번쨰 매개변수안 err에는 에러에 관한 정보가
 * 담벼져있습니다 에러처리 미들웨어를 직접 연결하지 않아도 기본적으로 익스프레스가 애러를 처리하기는 하지만 실무에서는 직접 에러미들웨어를 연결해주는것이 좋습니다
 * 에러처리 미들웨어는 가장 아래에 위차하도록 합니다.
 * 
 * 콘솔
 * 모든요청에 다실행됩니다
 * GET/요청에서만 실행됩ㄴ다
 * ERROR:에러는 에러처리 미들웨어로 갑니다.
 */

/** 실무에서 자주 사용하는 패키지
 * 
 * npm i morgan cookie-parser express-session dotenv
 * 
 * dotrnv를 제외한 다른 패키즈는 미들웨어 입니다
 */

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookir-parser');
const session = require('express-session');
const dotenv = require('doteenv');
const patt = require('path');
const { publicDecrypt } = require('crypto');

dotenv.config();
const app = express();
app.set('port',process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/',express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:fasle}));
app.use(cookieParser(procexx.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
    name:'session-cookie'
}));

app.use((req,res,next)=>{
    console.log('모든 요청에 다 실행됩니다')
});


/** env
 * 
 * COOKIE_SECRET:cookisesecret
 * 
 * 실행됫던 패키지들을 불러온 뒤 app.use에 연결합니다 req,res,next같은 것들이 보이지 않지만 미들웨어 내부에 들어 있습니다.next도 내부적으로 호출하기에 다음 미들웨어로 넘어갈수 있습니다
 * 
 * dotenv패키지는 .env파일을 읽어서 process.env로 만듭니다 doteenv패키지의 이름이 dote+env인 이유입니다 procexx.env.COOKIE_SECRET에 값이 할당됩니다
 * 
 * 키=값형식으로 추가하면 되며 process.env를 별도의 파일로 관리하는 이유는 보안과 설정의 편의성 떄문입니다.비밀 키들을 소스코드에 그래도 적어두면 소스코드가 유출되었을떄 키도 같이 유출됩니다
 * 따라서.env같은 파일에 비밀 키를 적어두고 doteenv패키지로 비밀 키를 로딩하는 방식으로 관리하곤 합니다
 * 
 * morgan
 * morgan연결 후 3000포트에 연결해보면 기존 로그 외에 추가적인 로그를 볼수 있습니다
 * 
 * 콘솔
 * 
 * 3000번 포트에서 대기중
 * 모든 요청에 다 실행됩니다
 * GET/요청에서만 실행됩니다
 * ERROR:에러는 에러 처리 미들웨어로 갑니다
 * //에러스택 트레이스 생력
 * 
 * GET/500 7.409ms-50
 * 
 * morgan미들웨어
 * 
 * app.use(morgan('dev))l
 * 
 * 인수로 dev외에combined ,common,short,tiny등을 넣을수 잇습니다 인수를 바꾸면 로그가 달라집니다
 * 
 * 개발환경에서는 dev,배포 환경에서는 combined를 추천
 * 
 * dev 모드 기준이르 GET/500 7.409ms - 50   HTTP메서드 주소 HTTP상태 코드 응답속도 응답 바이트를 의미합니다
 * 
 * 
 * 
 * static
 * 
 * static미들웨어는 정적인 파일들을 제공하는 라우터 역활을 합니다 기본적으로 제공되기에 따로 설치할 필요 없이 express객체 안에서 꺼내 장착하면 됩니다
 * 
 */

app.use('요청 경로', express.static('실제 경로'));
app.use('/',express.static(path.join(__dirname,'public')));

//함수의 인수로 정적 파일들이 담겨있는 폴더를 지정하면 됩니다 현재 public폴더가 지정되어 있습니다
//예를 들어 public/stylesheets/style.css  는 hrrp://locallhost:3000/stylesheets/style.css로 접근할수 있습니다

/** public폴더를 만들고 css나 js,이미지 파일들을 public  폴더에 넣으면 브라우저에 접근할수 있게 됩니다
 * 실제 서버의 폴더 경로에는 pubic이 들어있지만 요청주소에는 public이 들어 있지안습니다
 * 
 * 서버의 폴더 경로와 요청경로가 다르므로 외부인이 서버의 구조를 쉽게 파악할수 없습니다
 * 
 * 또한 정적 파일들을 알아서 제공해주므로 fs.readfile로 파일을 직접 읽어서 전송할 필요가 없습니다
*/


/** body-parser
 * 
 * 요청의 본문에 데이터를 해석해서 req.body객체로 만들어 주는 미들웨어 보통 폼 데이터나 AJAX요청의 데이터를 처리합니다 단 멀티파트(이미지 동영상 파일)데이터는 처리하지 못합니다
 * 
 * 그 경우에는 뒤에 나오는 multer 모듈을 사용하면됩니다
 * 
 */

app.use(express.json());
app.use(express.urlencoded({extended:false}));

/**익스프레스 4.16.0 버전부터 body-parser미들웨어의 일부 기능이 익스프레스 에 내장되었으므로 따로 설치할 필요가 없습니다
 * 
 * 
 * Raw는 요청의본문이 버퍼 데이터 일떄 text,텍스트 데이터 일떄 해석하는 미들웨어 입니다
 * 버퍼나 텍스트 요청을 처리할 필요가 있다면 body-parser를 설치 한 후 다음과 같이 추가합니다
 * 
 * npm i body-parser
 */

const bodyParser =require('body-parser');
const { format } = require('path');
app.use(bodyParser.raw());
app.use(bodyParser.text());

/** 요청 데이터 종류
 * 
 * Json 은 JSON형식의 데이터 전달 방식이고 URL-encoded는 주소 형식으로 데이터를 보내는 입니다
 * 
 * 폼 전송은 URL-encoded방식을 주로 사용합니다
 * urlencoded메서드를 보면 {extended:false}라는 옵션이 들어 있습니다 이 옵션은 false면  노드의 querystring모듈을 사용하여 쿼리 스트링을 해석하고 true면 qs모둘을 사용하여
 * 쿼리 스트링을 해석합니다 qs모듈은 내장 모듈이 아니라 npm패키지이며 querystring모듈의 기능을 확장한 모듈입니다
 * 
 * POST와 PUT 요청의 본문을 전달받으러면 req.on('data)와 req.on('end)로 스트림을 해야햇지만
 * body-parser을 사용하면 그럴 필요가 없습니다 이 패키지르 사용하면 내부적으로 스트림 처리해 req.body에 추가합니다
 * 예를 들어 JSON형식으로 {name:'zerocho',book:'node.js'}를 본문으로 보낸다면 req.body에 그대로 들어갑니다
 * 
 * 
 * 
 */

/**cookie-parser
 * 
 * cookie-parser은 요청에 동봉된 쿠키를 해석해 req.cookies객체로 만듭니다 
 * 
 */

app.use(cookieParser(비밀키));

/**해석된 쿠키들은 req.cookies객체에 들어갑니다 name=zerocho 쿠키를 보냈다면 req.cookies{name:'zerocho'} 가 됩니다 
 * 
 * 첫번쨰 인수로 비밀 키를 넣어 줄 수있습니다.서명된 쿠키가 있는 경우 제공한 비밀 키를 통해 해당 쿠키가 내 서버가 만든 쿠키임을 검증 할수 있습니다. 쿠키는 클라이언트에서 위조하기 쉬우므로
 * 비밀 키를 통해 만들어낸 서명을 쿠키 값 뒤에 붙입니다 서명이 붙으면 쿠키가  name =zerocho,sign 과 같은모야양이 됩니다. 서명된 쿠키는 req.cookies대신
 * req.signedCookies객체에 들어있습니다
 * 
 * cookies-parser가 쿠키를 생성할떄만 쓰이는 것은 아닙니다. 쿠키를 생성/제거하기 위해 res.cookie , res.clesrCookir메서드를 사용해야합니다
 * 
 * res.cookie(키,값,옵션)형식으로 사용합니다. 옵션은 domain,expires,httpOnly,maxAge,path,secure등이 있습니다
 * 
*/
res.cookie('name','zerocho',{
    expires:new Date(Date.new() + 900000),
    httpOnly:true,
    secure:true,
});
res.clearCookie('name','zerocho',{httpOnly:true,secure:true});

/** 쿠키를 지우려면 키와 값 외에 옵션도 정확히 일치해야 쿠키가 지워집니다 
 * 옵션 중에는 singed라는 옵션이 있는데 이를 true로 설정하면 쿠키 뒤에 서명이 붙습니다 내 서버가 쿠키를 만들었다는 겁증할수 있으므로 대부분의 경우 서명 옵션을 켜두는 것이 좋습니다
 * 서명을 위한 비밀 키는 cookieparser미들웨어에 인수로 넣은 process.env.COOKIE_SECRET이 됩니다
 */

/**express-session
 * 세샨 관리용 미들웨어입니다. 로그인 등의 이유로 세션을 구현하거나 특정 사용자를 위한 데이터를 임시적으로 저장해둘 떄 매우 유용합니다.세션은 사용자 별로 req.session객체 안에 유지됩니다.
 * 
 */

app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
    name:'session-cookie'
}));

/**cookie-parser 미들웨어 뒤에 놓는 것이 안전하며
 * express-session은 인수로 세션에 대한 설정을 받습니다.resave는 요청이 올떄 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지 설정하는 것이고 ,saveUninitialized라는
 * 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정하는 것입니다
 * 
 * express-seeeion은 세션 관리시 클라이언트에 쿠키를 보냅니다 안전하게 쿠키를 전송하려면 쿠키에 서명을 추가해야하고 쿠키를 서명하는데 secret의 값이 필요헙니다
 * cookie-parser과 같게 설정하는 것이 좋습니다. 세견 쿠키의 이름은 name옵션으로 설정합니다 기본이름은 connect.sid입니다
 * 
 * cokie옵션은 세션 쿠키에 대한 설정입니다. maxAGE,domain,path,expires,sameSite,httpOnly,secure등 일반적인 쿠키 옵션이 모두 제공됩니다 현재
 * httpOnly를 true로 설정해 클라이언트에 쿠키를 확인하지 못하도록 하엿고 secure는f false로해서 https 가 아닌 환경에서도 사용할수 있게 해놨습니다
 * 배포시에는 https 를 적용하고 secure도 true로 설정하는 것이 좋습니다
 * 
 * store라는 옵션도 있습니다. 현재는 메모리에 세션을 저장하도록 되어잇습니다 문제는 서버를 재시작하면 초기화 되기 떄문에
 * 배포시에는 store에 데이터베이스를 연결하여 세션을 유지하는것이 좋습니다 보통 레디스가 자주 쓰입니다
 * 
 * 
 */

req.session.name='zerocho';//세션등록
req.sessionID;//세션 아디 확인
req.session.destory();//세션 모두 제거

//s%3A의 뒷부분이 실제 암호화된 쿠키 내용입니다. 앞에s%3A가 붙은경우 이 쿠키가 express-session 미들웨어에 의해 암호화 된것이라 생각하면됩니다.

/** 미들웨어 특성활용*/

app.use((req,rea,next)=>{
    console.log('모든 요청에 다 실행됩니다');
    next();
});
/** 미들웽는 req,res,next를 매개변수로 가지는 함수로서 app.use나 app.get, app.post 등으로 장착합니다 특정한 주소의 요청에만 미들웨어가 실행되게 하려면 첫 번쨰 인수로 주소입력
 * 
 * 
 */

app.use(
    morgan('div'),
    express.static('/',path.join(__dirname,'public')),
    express.json(),
    express.urlencoded({extended:false}),
    cookieParser(process.env.COOKIE_SECRET)
);

/** 위와 같이 동시에 여러개의 미들웨어를 장착할수 도 있으며 
* 다음 미들웨어로 넘어가려면 next함수를 호출해야합니다
* next 호춯하지 안ㅇㅎ는 미들웨어는 res.send나 res.sendfile 등의 메서드료 응답을 보내야 합니다

express.static 과 같은 미들웨어는 정적 파일을 제공할떄 next 대신 res.sendfile메서드로 응답을 보냅니다 따라서 정적 파일을 제공할떄 express.json,ecpress.urelencoded
cookieparser 미들웨어는 실행되지 않습니다.

지금 까지는 next에 아무런 인수를 넣지 않았지만 next함수에 인수를 넣을수동 있습니다.route라는 문자열을 넣으면 다음 라우터의 미들웨어로 이동하고 그 외에 인수를넣는다면 바로 에러처리 미들웨어로 이동합니다

next()  다음 미들웨어로
next('route')  다음 라우터로
next(error)  애러 핸들러로
*/

/** 마들웨어간에 데이터를 전달하는 방법도 있습니다. 세션을 사용한다면 req.session객체에 데이터를 넣어도 되지만, 세션이 유지되는 동안에 데이터도 계속 유지된다는 장점이 있습니답
 * 요청이 끝날떄까찌만 데이터를 유지하고 싶다면 req객체에 데이터를 널어두면됩니다.
 */

app.use((req,res,next)=>{
    req.data = '데이터 넗기';
    next();

},(req,res,next)=>{
    console.log(req.data); //데이터 받기
    next();
})

/**현재 요청이 처리되는 동안 req.data를 통해 미들웨어 간에 데이터를 공유할 수 없습니다. 새로운 요청이 오면 req.data는 초기화 됩니다.
 * 속성명이 data일 필요는 없지만 다른 미들웨어와 겹치지 않게 해야합니다 속성명을 body로 한다면 body-parser미들웨어와 기능이 겹치게됩니다
 * 
 * app.set과의 차이
 * app.set으로 익스프레스에서 데이터를 저장할수 있다는 것을 배웠습니다.
 * 하지만 app.set을 사용하지 않고 req 객체에 데이터를 넣어서 다음 미들웨어에 전달하는 이유는
 * app.set은 익스프레스에서 전역적으로 사용되므로 사용자 개개인에게 값을 넣기에는 부적절하며,앱 전체의 설정을 공유할때 사용하면됩니다.
 * req 객체는 요청읇 보낸 사용자 개개인에게 귀속되므로 req객체를 통해 개인의 데이터를 전달하는 것이 좋습니다.
 * 
 * 미들웨어를 사용할떄 유용한 패턴
 * 
 */
app.use(morgan('dev'));
//또는
app.use((req,res,next)=>{
    morgan('dev')(req,res,next);
});

// 이패턴이 유용한 이유는 기존 미들웨어의 기능을 확장할 수 있기 떄문에 예를 들어 다음과 같이 분기 처리를 할수도 잇습니다 조건문에 따라 다른 미들웨어를 적용하는 코드

app.use((req,res,next)=>{
    if(process.env.NODE_ENV === 'production'){
        morgan('combined')(res,res,next);
    }else{
        morgan('dev')(req,res,next);
    }
});

/** multer
 * 
 * 이미지 동영상 등을 여러가지 파일들을 멀티파트 형식으로 업로드 할떄 사용하는 미들웨어
 * 
 * <form action="/upload" method="post" enctype="multipart/form-data">
 *    <input type = "file" name = "image"/>
 *    <input type = "text" name = "title"/>
 *    <button type= "submit">업로드</button>
 * </form>
 */

//이러한 폼을 통해 업로드 되는 파일은 body-parser로는 처리할 수 없고 직접 파싱하기도 어렵습니다.
//node i multer

//기본적인 설정

const multer = require('multer');

const upload = multer({
    storage:multer.diskStorage({
        destination(req,file,done){
            done(null,'upload/');
        },
        filename(req,file,done){
            const ext =path.extname(file.originalname);
            done(null,path.basename(file.originalname,ext)+ Date.now()+exit);
        },
    }),
    limits:{fileSize:5*1024*1024}
});

/**   multer함수의 인수로 설정을 넣습니다. storage속성에는어디에(destination) 어떤 이름으로(filename)   저장할지를 넣습니다
 *   destination,filename 함수의 req매개변수에는 요청에 대한 정보,file 객체에는 업로드한 파일의 정보가 있습니다. done매개변수는 함수입니다
 * 
 * 첫번쨰 인수에는 에러가 있다면 애러를 넣고,두번쨰 인수에는 실제경로나 파일이름을 넣어주면 됩니다.req나 file의 데이터를 가공해서 done으로 넘기는 형식입니다
 * 
 * 현재 설정으로는 upload라는 폴더에 [파일명+현재시간,확장자]파일명으로업로드 하고 있습니다.시간을 넣어주는 이유는 파일명이 겹치는 것을 막기 위함입니다
 * 
 * limits속성에는 업로드에 대한 제한 사항을 설정할 수 있습니다.
 * 위설정을 실제로 활용하기 위해서는 서버에 uploads폴더가 존재해야합니다 없다면 직접 만들어주거나 fs모듈을 사용해서 서버를 시작할떄 생성합니다
 * 
*/

const fs = require('fs');

try{
    fs.readdirSync('upload');
} catch(error){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다');
    fs.mkdirSync('uploads');
}


/** 설정이 끝나면 upload변수가 생기는데 다양한 미들웨어가 들어 있습니다. 먼저 파일읋 하나만 업로드하는 경우(multipart.html과 같은 경우)에는 single미들웨어를 사용합니다 
 * 
*/

app.post('/upload' , upload.single('image'),(req,res)=>{
    console.log(req.file,req.body);
    res.send('ok');
});


/**single 미들웨어를 라우터 미들웨어 앞에 넣어 두면multer 설정에 따라 파일 업로드 후 req.file객체가 생성됩니다. 인수는 input태그의 name이나 폼데이터의 키와 일치하게 넣으면 됩니다
 * 
 * 여러 파일의 경우
 * <form action="/upload" method="post" enctype="multipart/form-data">
 *    <input type = "file" name = "many  multiple"/>
 *    <input type = "text" name = "title"/>
 *    <button type= "submit">업로드</button>
 * </form>
 * 
 */
//미들 웨어는 single 대신 array로 교체합니다
app.post('/upload' , upload.array('many'), (req,res)=>{
    console.log(req.files,req.body);
    res.send('ok');
});

/**
 *  <form  id =form action="/upload" method="post" enctype="multipart/form-data">
 *    <input type = "file" name = "image1"/>
 *    <input type = "file" name = "image2"/>
 *    <input type = "text" name = "title"/>
 *    <button type= "submit">업로드</button>
 * </form>
 *  
 * 파일을  여러개 업로드하지만 input태그나 폼 데이터의 키가 다른 경우 fields미들웨어를 사용합니다
 */
app.post('/upload',
    upload.fields([{name:'image1'},{name:'image2'}]),
    (req,res)=>{
        console.log(req.files,req.body);
    },
);

//특수한 경우이지만 파일을 업로드 하지 않고멀티파트 형식으로업로드 하는 경우가 있습니다 그럴떄는 none 미들웨어를 사용합니다

/**
 * <form  id =form action="/upload" method="post" enctype="multipart/form-data">
 *    <input type = "text" name = "title"/>
 *    <button type= "submit">업로드</button>
 * </form>
 */

app.post('/upload',upload.none(),(req,res)=>{
    console.log(req.body);
    res.send('ok');
});

//파일을 업로드 하지 않앗으므로 req.body만 존재합니다

//실제로 multer예제 실습을 하고 싶다면 app.js을 다음과 같이 수정합니다

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookir-parser');
const session = require('express-session');
const dotenv = require('doteenv');
const patt = require('path');
const { publicDecrypt } = require('crypto');

dotenv.config();
const app = express();
app.set('port',process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/',express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:fasle}));
app.use(cookieParser(procexx.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
    name:'session-cookie'
}));

const multer = require('multer');
const fs = require('fs');

try{
    fs.readdirSync('uploads');

}catch(error){
    console.error('upload폴더가 없어 uploads 폴더를 생성합니다');
    fs.mkdirSync('uploads');
}
const upload = multer({
    storage:multer.diskStorage({
        destination(req,file,done){
            done(null,'uploads/');

        },
        filename(req,file,done){
            const ext = path.extname(file.originalname);
            done(null,path.basename(file.originalname,ext) + Date.now() + ext);
        },
    }),
    limits:{fileSize:5*1024*1024},
});
app.get('/upload',(req,res)=>{
    res.sendFile(path.join(__dirname,'multipart.html'));
});
app.post('/upload',
    upload.fields([{name:'image1'},{name:'image2'}]),
    (req,res)=>{
        console.log(req.files,req.body);
        res.send('ok');
    }
);
app.get('/',(req,res,next)=>{
    console.log('GET/요청에서만 실행됩나다');
});


/**
 * <form  id =form action="/upload" method="post" enctype="multipart/form-data">
 *    <input type = "file" name = "image1"/>
 *    <input type = "file" name = "image2"/>
 *    <input type = "text" name = "title"/>
 *    <button type= "submit">업로드</button>
 * </form>
 * 
 * 
 * 3000/upload 에 접속해서 실습하면 됩니다.
 */
