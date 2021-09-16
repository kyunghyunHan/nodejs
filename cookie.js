/** 쿠키는 유효기간이 있으며 nama = zerocho와 같이 간수한 키-값의 쌍입니다.
 * 서버는 미리 클라이언트에 요청자를 추정할만한 정보를 쿠키로 만들어 보내고 그 다음부터는 클라이언트로부터 쿠키를 받아 요청자를 파악합니다 쿠키는 사용자가 누구인지 추적하고 있으며
 * 개인정보 유출 방지를 위해 쿠키를 지우라고 권고하는것은 바로 이 이유
 * 
 * 
 */

const http = require('http');

http.createServer((req,res)=>{
    console.log(req.url,req.headers.cookie);
    res.writeHead(200,{'Set-Cookie':'mycookie=test'});
    res.end('hello Cookie');
})
.listen(8083,()=>{
    console.log('8083 포트에서 서배 대기 중입니다');

});

/** 쿠키는 name= zerocho;year=1994 처럼 문자열 형식으로 존재 
 * 쿠키간에는 세미클론으로 구분
 * createServer메서드 콜백에서는 req객체에 담겨있는 쿠키를 가져옵니다 쿠키는 req.headers.cookie에 들어있습니다
 * 
 * set-cookie 는 브라우저한테 다음과 같은 값의 쿠키를 저장하라는 의미입니다.
 * 
 * 콘솔
 * 
 * /undefined
 * /favicon {mycookie:'test}
 * 
 * 요청은 한번만 보냈는데 두개가 기록되어 있습니다/favicon은 요청한적이 없는데 들어 있습니다
 *  첫번쨰 /에서는 쿠키에 대한 정보가 없다고 나오며 
 * 두번쨰 favicon에서는 test쿠키가 기록되었씁니다
 *  파비컨이란 다음과 웹사이트 탭에 보이는 이미지를 뜻합니다
 * 브라우저는 파비콘이 먼지 html에서 유추할 수 없으면 서버에 파비콘 정보에 대한 요청을 보냅니다 현재는 html에 파비콘에 대한 정보를 입력하지 않앗으므로 브라우저가 추가로 요청한 것입니다
 * 
 * 
 * cookie2.js
 */

const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '')=>
    cookie 
        .split(';')
        .map(v=>v.split('='))
        .reduce((acc,[k,v])=>{
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        },{});

http.createServer(async(req,res) =>{
    const cookies = parseCookies(req.headers.cookie);

    //주소가 /login으로 시작하는 경우
    if(req.url.startsWith('/login')){
        const{query} = url.parse(req.url);
        const {name} = qs.parse(query);
        const expires = new Date();
        //쿠키 유효 시간을 현재시간 + 5분으로 설정
        expires.setMinutes(expires.getMinutes()+5);
        res.writeHead(302,{
            Location:'/',
            'Set-Cookie' : `name=${encodeURLComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();

        //name이라는 쿠키가 있는 경우
        }else if(cookies.name){
            res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
            res.end(`${cookies.name}님 안녕하세요`);
        }else{
        try{
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(data);
        }catch (err){
            res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }
})
.listen(8084,()=>{
    console.log('8084번 포트에서 대기중입니다');
});

/**  쿠키는 mycookie=test 같은 문자열입니다 이를 쉽게하기 위해 자바스크립트 객체 형식으로 바꾸는 함수입니다 이 함수를 거치면 {mycookie:test} 가 됩니다
 *   주소가 /login 으로 시작 할경우네는 url과 querystring 모듈로 각각 주소와 주소에 딸려오는 query를 분석합니다 그리고 쿠키의 만료 시간도 지금으로부터 5분뒤로 설정했씁니다
 *   이제 302 응답코드 ,리다이렉트 주소와함꼐 쿠키를 헤더에 넣습니다 브라우저는  이 응답 코드를 보고 페이지를 해당주소로 리다이렉트 합니다 헤더에는 한글을 설정할수 없으므로
 * name변수를 encodeURLComponent메서드로 인코딩했습니다 또한 Set-cookie의 값으로는 제한된 ASCII 코드만 들어가야 하므로 줄바꿈을 넣으면 안됩니다
 * 
 * 쿠키에는 한글과 줄바꿈은 들어가 있으면 안되며 한글은 encodeURLComponent로 감싸서 넣습니다
 * 
 * 쿠키명 = 쿠키값 : 기본적인 쿠키의 값입니다 mycookie=test 또는 name = zerocho와 같이 설정합니다
 *  Expires=날짜 :만료 기한입니다 이가한이 지나면 쿠키가 제거됩니다 기본값은 클라이언트 가 종료될 떄 까지 입니다
 * Max-age=초  Expires와 비슷하지만 날짜 대신 초를 입력할 수 있습니다 해당 초가 지나면 쿠키가 제거됩니다. Expires보다 우선시합니다
 * Domain=도메인 명 쿠키가 전송될 도메인을 특정할수 잇습니다 기본값은 현재 도메인 입니다
 * Path=URL 쿠키가 전송될 URL을 특정할수 있습니다 기본값은'/'이고 이경우 모든 URL에서 쿠키를 전송할수 있습니다
 * Secure HTTPS일경우에만 쿠키가 전송됩니다
 * HttpOnly 설정시 자바스크립트에서 쿠키에 접근할수 없습니다 쿠키 조작을 방지하기 위해 설정해 놓는것이 좋습니다
 */

/** 8084번 접속
 * 
 * 새로고침을 해도 로그인이 유지 됩니다
 * 이 방법은 정보 유출의 취약합니다
 * 
 * 서버가 사용자 정보를 관리하도록합니다
 * 세션
*/

const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '')=>
    cookie
        .split(';')
        .map(v =>v.split('='))
        .reduce((acc,[k,v])=>{
            acc[k.trim()] =decodeURIComponent(v);
            return acc;
        },{});

const session = {};

http.createServer(async (req,res) =>{
    const cookies = parseCookies(req,headers.cookie);
    if (req.url.startsWith('/login')){
        const {query } = url.parse(req.url);
        const {name} = qs.parse(query);
        const expirse = new Date();
        expirse.setMinutes(expirse.getMinutes()+5);
        const uniqueInt = Date.now();
        session[uniqueInt]={
            name,
            expirse
        };
        res.writeHead(302,{
            Location: '/',
            'Set-Cookie': `session=${uniqueInt}; Expires=${expirse.toGMTString()};HttpOnly;Path=/`
        });
        res.end();
        //세션 쿠카가 존재하고 만료 기간이 지나지 않았다면

    }else if (cookies.session && session[cookies.session].expires>new Date()){
        res.writeHead(200,{'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`${session[cookies.session].name}님 안녕하세요`);

    }else {
        try{
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(data);
        }catch (err){
            res.writeHead(500,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(err.message);
        }
        }
    
})
.listen(8085,()=>{
    console.log('8085포트에서 서버 대기 중입니다');
});


/**쿠키와는 살작 달라진 부분이 있습니다 쿠키에 이름을 담아서 보내는 대신 uniqueInt라는 숫자 값을 보냈씁니다 사용자의 이름과 uniqueInt속성명 아래에 있는 session이라는
 * 객체에 대신 저장합니다
 * 
 * 세션은 서버에 사용자 정보를 제공하고 클라이언트와는 세션 아이디로만 소통합니다
 * 세션 아이디는 꼭 쿠키를 사용해서 주고 받지 않아도 됩니다 하지만 많은 웹사이트가 쿠키를 사용합니다 세션을 위해 사용하는 쿠키를 세션쿠키라합니다
 * 실제 베포용에서는 세션을 위와같이 변수에 저장하지 않습니다 서버가 멈추가나 재시작되면 저장된 변수가 초기화 되기떄문입니다 보통은 레디스나 맴케시드 같은
 * 데이터베이스에 넣어두니다
 */
