//라우터를 많이 연결하면 app.js코드가 길어지므로 익스프레스에서는 라우터를 분리 할수 있는 방법을 제공합니다 router폴더를 만들고 그 안에 index.js와 user.js를 작성합니다

//routes/index.js

const express = require('express');

const router = express.Router();

//GET /라우터

router.get('/',(req,res)=>{
    res.send('Hello,Express');
});

module.exports = router;

//routes/user.js

const express =require('express');

const router = express.Router();

//GET/user 라우터
router.get('/',(req,res)=>{
    res.send('Hello,User');
});

module.exports = router;

/** 만들었던 index.js 와 user.js 를 통해 app.js 에 연결합니다.또한 에러 처리 미들웨어위해 404상태 코드를 응답하는 미들웨어를 하나 추가합니다
 * 
 * 
*/

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookir-parser');
const session = require('express-session');
const dotenv = require('doteenv');
const patt = require('path');
const { publicDecrypt } = require('crypto');

dotenv.config();
const indexRouter= require('./ruutes');
const userRouter = require('./routes/user');
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


app.use('/',indexRouter);
app.use('/user',userRouter);

app.use((req,res,next)=>{
    res.status(404).send('Not Found');
});

app.use((err,req,res,next)=>{

})
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
//idnexRouter를 ./routes로 require할수 있는 이유는 index.js는 생략할수 있기 떄문입니다.
//require('./rotues/index.js')와 require('./routes)는 같습니다

//index와 user 은 모양이 겨의 같지만다른 주소의 라루터 역활을 하고 있습니다app.use로 연결할떄의 차이 떄문입니다.
//indexRouter은 app.use('/')에 연결하였고, userRouter은 app.use('/user') 에 연결했습니다

//이전에 next함수에 다음 라우터로 넘어가는 기능이 있다고 했스빈다. next('route')이며 , 라우터에 연결된 나머지 미들웨어들을 건너뛰고 싶을떄 사용합니다

router.get('/',function (req,res,next){
    next('route');
},function (req,res,next) {
    console.log('실행되지 않습니다');
    next();
    
},function (req,res,next) {
    console.log('실행되지 않습니다');
    next();
});
router.get('/',function (req,res) {
    console.log('실행됩니다');
    res.send('Hello Express');
    
});

/** 위처럼 같은 주소의 라우터를 여러개 만들어도 됩나다 라우터가 몇개든 next 를 호출하면 다음 미들웨어가 실행됩니다
 * 
 * 첫번쨰 라우터의 첫번쨰 마들웨어에서 next대신 next('router')을 호출했습니다.이경우에 다음 미들웨어는 실행되지 않습니다.대신 주소와 일치하는 다음 라우터로 넘어갑니다
 * 
 * 유용한팁 라우터 주소에는 정규표현식을 비롯한 특수패턴을 사용할수 있습니다 여러가지 패턴이 있지만 자주쓰이는 패턴하나만 보면 라우트 매개변수라는 패턴이 있습니다
 */

router.get('/user/:id',function (req,res) {
    console.log(req,params,req.query);
    
});

/** 주소에 id 가 있습니다 문자그대로 id가 아닌 이부분에 다른 값을 넣을수 있습니다
 * 
 * /user/1이나 /user/123등의 요청도 이 라우터가 처리하게 됩니다. 이방식의장점은 id에 해당하는1이나 123을 조회할수 있다는 점이며 req.params객체 안에 들어 있습니다.
 * 
 * :id면 req.params.id로 :type이면 req.params.type으로 조회할수 있습니다.
 * 이 패턴을 사용할떄 주의할점은 일반 라우터 보다 뒤에 위치해야 한다는 것입니다 다양한 라우터를 아우르는 와일드카드 역활을 하므로 일반 라우터 보다는 뒤에 위치해야 다른 라우터를 방해하지 않습니다
 * 
 */

router.get('/user/:id', function (req,res) {
    console.log('얘만 실행됩니다');
    
});
router.get('/user/like',function (req,res) {
    console.log('전혀 실행되지 않습니다');
    
});

/** /userlike 같은 라우터는 /user/:id 같은 라우터 매개변수를 쓰는 라우터보다 위에 위치해여합니다
 * 
 * 주소에 쿼리스트링을 쓸떄도 있습니다 쿼리스트링 키-값 정보는 req.query객체 안에 들어 있습니다
 * 
 * /users/123?limit=5&skip=10이라는 주소의 요청이 들어왔을떄 req.params와 req.query객체는 다음과 같습니다
 * 
 * 콘솔
 * {id:'123'} {limit:'5',skip:'10'}
 * 
 * app.use((req,res,next)=>{
 * res.status(404).send('Not Found);
 * });
 * 
 * 이 미들웨어 제거하고 3000포트/abc 접속하게 되면404코드와 함꼐 Cannot Get/abc 메세지가 응답됩니다
 * 
 * 다음과 같이 주소는 같지만 메서드가 다른 코드가 있을떄 이를 하나의 덩어리로 줄일수 있습니다
 */

router/this.get('/abc',(req,res)=>{
    res.send('GET/abc');
});
router.post('/abc',(req,res)=>{
    res.send('POST/abc');
});

//다음과 같이 관련있는 코드끼리 묶여 있어 더보기 좋아집니다

router.route('/abc')
    .get((req,res)=>{
        res.send('GET/abc');
    })
    .post((req,res)=>{
        res.send('POST/abc');
    });