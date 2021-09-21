/** html로 1000개나 되는 데이터를 모두 표햔하고 싶다면 일일이 직접 코딩하여 넣어야합니다 템플릿 엔진은
 * 자바스크립트를 사용하여HTML을 렌더링 할수 있게 해줍니다.
 * 
 * 
 * 
 * 콘솔  npm i -pug
 * 
 * 
 */

app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.use(morgan('dev'));

/** view은 템플릿 파일들이 위치한 폴더를 지정하는 것입니다 res.render메서드가 이폴더 기준으로 템플릿 엔진을 찾아서 렌더링 합니다 
 * res.render('index')라면 views/index.pug 를 렌더링합니다 res.render('admin/main')이라면 views/admin/main.pug를 렌더링합니다
 * 
 * view engine 은 어떠한 종류의 템플릿 엔진을 사용할지를 나타냅니다.
 * 
 * 기존 html과 다르게 화살괄호가 없으며 탭 또는 스페이스로만 태그의 부모자식 관계를 규명합니다 모든파일에 동일한 종류의 들여쓰기를 적용하면 됩니다.
 * 들여쓰기에 제대로 렌더링하지 않으면 오류가나며 렌더링 되지 않습니다
 * doctype html 은 <!DOCTYPE html>과 같습니다
 * 
 * 퍼그  
 * 
 * doctype html
 * html
 *  head
 *   title=title
 *   link(rel='stylesheet',href='/sty;esheets/style.css)
 * 
 * <!DOCTYPE html>
 * <html>
 *   <head>
 *     <title>익스프레스</title>
 *     <link rel='stylesheet',href='/sty;esheets/style.css">
 *  </heaad>
 * <hetml>
 * 
 * 속성중 아이디와 클래스가 있는 경우 다음과 같이 표현 할 수 있습니다 div태그인경우 div문자는 생략이 가능합니다/
 * 
 * #login-button
 * .post-image
 * span#highlight
 * p.hidden.full
 * 
 * html
 * 
 * <div id="login-button"></div>
 * <div class="post-image"></div>
 * <span id="highlight"></span>
 * <p class="hidden full"></P>
 * 
 * 
 * HTML텍스트는 다음과 같이 태그 또는 속성 뒤에 한칸을 띄고 입력하면 됩니다.
 * 
 * p welcome to Express
 * button(type='submit) 전송
 * 
 * html
 * 
 * <p>welcome to Express</P>
 * <button type='submit>전송  </button>
 * 
 * pug
 * 
 * p
 *   | 안녕하세요
 *   | 여러줄을 입력합니다
 *   br
 *   | 태그도 중간에 넣을 수 있습니다
 * 
 * html
 * <p>
 *   안녕하세요  여러줄을 입력합니다
 *  <br/>
 * 태그도 중간에 넣을 수 있습니다
 * </p>
 * 
 * style이나 script태그로 css 또는 자바스크립트 코드를 작성하고 싶다면 태그뒤에 .을 붙입니다
 * 
 * pug
 * 
 * style.
 *   h1{
 *     font-sizeL30px;
 * }
 * script.
 *   const message='Pug;
 *   alert(message);
 * 
 * 
 * 
 * Html과 다르게 자바스크립트 변수를 템플렛에 렌더링 할 수 있습니다.res.render 호출시 보내는 변수를 퍼그가 처리합니다 routers/index.js의 코드를 보면 다음 부분이 있습니다
 * 
 * 
 */
roter.get('/',function (req,res,next) {
    res.render('index',{title:'Express'});
});

/** res.render(템플릿 ,변수 객체)는 익스프레스가 res 객체에 추가한 템플릿 랜더링을 위한 메서드입니다
 * index.pug를 HTML로 렌더링하면서{tile:Express}라는 객체를 변수로 집어넣습니다. layout.pug와 index.pug의 title부분이 모두 Express로 치환됩니다 
 * res.render메서드에 두번쨰 인수로 변수 객체를 넣는 대신 res.locals 객체를 사용해서 변수를 넣을수도 있습니다.
 * 
 */

router.get('/', function (req,res,next) {
    res.locals.title='Express';
    res.resder('index');
    
});

/** 위와 같이 하게 되면템플릿 엔진이 res.local객체를 읽어서 변수를 집어 넣습니다 이 방식의 장점은 현재 라우터뿐만 아니라 다른 미들웨어에서도 res.locals 객체에 접근할수 있다는 것입니다
 * 
 * 퍼그
 * 
 * h1=title
 * p welcome to #{title}
 * button(class=title,type='submit')전송
 * input(placeholder=title + '연습)
 * 
 * 
 * 
 * html
 * 
 * <h1>Express</h1>
 * <p>welcome to Express</P>
 * <button class="Express" type="submit">전송</button>
 * <input placeholder="Express 연습">
 * 
 * 
 * 서버로부터 받은 변수는 다양한 방식으러 퍼그에서 사용할수 잇습니다 변수를 텍스트로 사용하고 싶다면 태그 뒤에 = 을 붙인 후 변수를 입력합니다 속성에도 = 을 붙인 후 변수를 사용할 수 있습니다
 * 
 * 텍스트 중간에 변수를 넣으랴먄 #{변수}를 사용하면 됩니다.#{}의 내부와 =기호 뒷부분은 자바스크립트로 해석하므로 input태그의 경우처럼 자바스크립트 구문을 싸도 됩니다
 * 
 * 서버에서 데이터를 클라이언트로 내보낼떄 #{}와 =을 빈번히 사용합니다 내부에 직접 변수를 선언할수더 있습니다. 뺴기(-)를 먼저 입력하면 뒤에 자바스크립트 구문을 작성할수도 있습니다.
 * 
 * -const node = 'node.js'
 * -const js= 'Javascript'
 * p#{node}와 #{js}  
 * 
 * 
 * html
 * 
 * <P>NOde.js와 Javascript</P>
 * 
 * 퍼그는 기본적으로 변수의 특수문자를 HTML 엔티티로 이스케이프(문법과 관랸없는 문자로 바꾸는 행위 )합니다 이스케이프를 원하지 않는다면 = 대신 ! 을사용하면 됩니다.
 * 
 * 퍼그
 * 
 * p='<strong>이스케이프</strong>'
 * p!='<strong>이스케이프하지 않음</strong>
 * 
 * html
 * 
 * <p>&ltstrong&gt;이스케이프&lt;</p>
 * <p><strong>이스케이프 하지 않음</strong><p>
 * 
 * 자바스크립트 문자열과 HTML 텍스트를 혼용할 떄 특수 문자 떄문에 가끔 에러가 발생합니다 예를 들어'<strong>강조</strong>'같은 자바스크립트 문자열이 있다면
 * 이것을 HTML에 사용했을떄 태그로 오해할 경우가 있스빈다
 * 이를 방지하기 위해 특수문자를 HTML엔티티 라는 코드로 변환합니다.대표적인 HTML엔티티는 다음과 같습니다.
 * 
 * <:&lt;
 * >: &gt;
 * &:&amp;
 * 띄어씌기:&nbsp;
 * ":&quot;
 * ':&apos;
 * 
 * 반복문
 * each로 반복문을 돌릴수 있습니다 each대신 for을 써도 됩니다
 * 
 * ul
 *   each fruit in['사과','배','오렌지','바나나','복숭아']
 *     li=fruit
 *      
 * 
 * html
 * 
 * <ul>
 *   <li>사과</li>
 *   <li>배</li>
 *   <li>오랜지</li>
 *   <li>바나나/li>
 *   <li>복숭아</li>
 * </ul>
 * 
 * 
 * 반복문 사용 시 인덱스도 가져올 수 있습니다.
 * 
 * ul 
 *   each fruit,index in ['사과','배','오렌지','바나나','복숭아']
 *     li=(index +1)+'번쨰'+fruit
 * 
 *  
 * <ul>
 *   <li>1번쨰사과</li>
 *   <li>2번쨰배</li>
 *   <li>3번쨔오랜지</li>
 *   <li>4번쨰 바나나/li>
 *   <li>5번쨰 복숭아</li>
 * </ul>
 * 
 * 
 * 조건문으로 편리하게 분기 처리할 수 있습니다
 * if,else,if,else를 사용할수 있습니다 다음은 isLoggedin변수로 로그인 여부에 따라 다르게 HTML을  렌더링 하는 예시입니다.
 * 
 * if isLoggedIn
 *   div 로그인되었습니다
 * else 로그인이 필요합니다
 * 
 * isLoggedIn이 true일떄
 * <div>로그인 되었습니다<div>
 * * isLoggedIn이 false일떄
 * <div>로그인이 필요합니다<div>
 * 
 * case문도 가능합니다.
 * 퍼그
 * 
 * case fruit
 *   when 'apple'
 *     p 사과입니다
 *   when 'banana'
 *     p 바나나입니다
 *   when 'oprange'
 *     p 오렌지입니다
 *   defauli 
 *     p 사과도 바나나도 오렌지도 아닙니다.
 * 
 * 
 * include
 * 다른 퍼그나 HTML파일을 넣을수 있습니다.
 * 해더나 푸터,내비게이션 처럼 웹 제작시 공통되는 부분을 따로 관리 할수 있어 매 페이지마다 동일한 HTML을 넣어야 하는 번거로움을 없앱니다.include파일 경로로 시용합니다
 * 
 * header.pug
 * header
 *   a(href='/')Home
 *   a(href='/about')About
 * 
 * footer.pug
 * footer
 *   div 푸터입니다
 * 
 * main.pug
 * include header
 * main
 *   h1 메인파일
 *   p 다른파일을 include할 수 없습니다
 * include footer
 * 
 * <header>
 *   <a href='/'>Home</a>
 *   <a href="/about">About</a>
 * </header>
 * <main>
 *   <h1>메인파일</h1>
 *   <p>다른 파일을 incliude할 수 없습니다</p>
 * </main>
 * <footer>
 *   <div>푸터입니다</div>
 * </footer>
 * 
 * extends와 block
 * 레이아웃을 정할 수 있습니다 공통되는 레이아웃 부분을 따로 관리 할 수 있어좋습니다
 * 
 * 퍼그
 * 
 * layout.pug
 * doctype html
 * html
 *  head
 *    title=title
 *    link(rel='stylesheet',href='/style.css')
 *    block style
 *  body
 *    header 헤더입니다
 *    block content
 *    footer 푸터입니다
 *    block script
 * 
 * body.pug
 * extends layout
 * 
 * block content
 *   main
 *      p  내용입니다
 * block script
 *    script(src="/main.js")
 * 
 * <!DOCTYPE html>
 * <html>
 *  <head>
 *   <title>Express</title>
 *   <link rel ="stylesheet" href="/style.css"/>
 *  </head>
 *  <body>
 *    <header>헤더입니다</herader>
 *    <main>
 *     <p>내용압니다</P>
 *    </main>
 *    <footer>푸터입니다.</footer>
 *    <script src="/main.js"></script>
 *  </body>
 * </html>
 * 
 * 레이아웃이 될 파일에는 공통된 마크업을 넣되,페이지 마다 달라지는 부분을 block
 * 이로 비워둡니다 block은 여러개 만들어도 됩니다. block은 block[블록명]으로 선언합니다
 * block이 되는 파일에서는 extends 키워드로 레이아웃 파일을 지정하고 blcok부분을 넣습니다
 * block 선언보다 한 단계 들여쓰기 되어 있어야합니다 나중에 익스프레스애서 res.render('body')를 사용해 하나의 HTML로 합쳐 렌더링 할수 있습니다 퍼그 확장자는 생략 가능합니다
 * block부분이 서로 합쳐집니다
 * 
 * 
 * views폴더에 layout.pug, index.pug , error.pug생성
 * layout.pug
 * 
 * doctype html
 * html
 *  head
 *   title=title
 *   link(rel='stylesheet',href='/style.css')
 *  body
 *   block content
 * 
 * 
 * index.pug
 * extends layout
 * 
 * block content
 *    h1= title
 *    p= Welcome to #{title}
 * 
 * error.pug
 * 
 * 
 * block content
 *    h1=message
 *    h2=error.status
 *    pre #{error.stack}
 * 
 * 
 * index.pug를 보면 extends layout과 block content가 있습니다 layout.pug 의 block content부분에 index.pug의 block content를 넣습니다
 * index.pug는 res.render로부터 title이라는 변수를 받아 렌더링 합니다
 * error.pug 도 block content부분이 layout,pug와 연결됩니다 res.render로부터 message와 error변수를 받아 렌더링 합니다
 * 
 * 
 * 에러 처리 미들웨어
 * 
 * app.js
 * 
 * 
 */

app.use((req,res,next)=>{
    const error= new Error(`${req.method} ${req.url} 라우터가 없습니다`);
    error.status = 404;
    next(error);
});

app.use((err,req,res,next)=>{
    res.locals.message=err.message;
    res.locals.error=process.env.NODE_ENV !=='production'? err:{};
    res.status(err.status ||500 );
    res.render('error');
});

/** 만약 404에러가 발생하면 res.locals.message 는`${req.method} ${req.url} 라우터가 없습니다`가 됩니다
 * next에서 넘겨준 인수가에러처리 미들웨어의err로 연결되기 떄문입니다
 * 
 * 에러처리 미들웨어는 erro라는 템플릿 파일을 렌더링 합니다 렌더리시 res.locals.message 와 res,locals.error에 넣어준 값을 함꼐 렌더링 합니다
 * res.render에 변수를 대입하는 것 외에도 이렇게 res.locals속성에 값을 대입하여 템플릿 엔진에 변수를 주입할수 있습니다
 * error객체의 스택 트레이스(error.html의 error.stack)는 시스템 환경(process.env.NODE_ENV)이 production(배포환경)이 아닌경우에만
 * 표시됩니다.배포 환경인 경우에는 에러 메세지만 표시됩니다.에러 스택 트레이스가 노출되면 보안에 취약할수 있기 떄문입니다.
 * 
 * 
 * 
 * 
*/