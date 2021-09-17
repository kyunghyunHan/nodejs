/** https 모듈은 웹 서버에 SSL암호화를 추기합니다 GET이나 POST요청을 할떄 오가는 데이터를 암호화해서 중간에 다른사람이 요청을 가로채더라도 내용을 확인할수 없게 합니다
 * 요즘은 로그인이나 결제가 필요한 창에서 https적용이 필수가 되는 추세입니다
*/

const http = require('http');

http.createServer((req,res)=>{
    res.writeHead(500,{'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node</h1>');
    res.end('<p>hello server</p>');
})
.listen(8080,()=>{
    console.log('8080포트 서버 대기중');
});

/** 이 서버에 암호화를 적용하려면 https 모듈을 적용해야합니다 하지만 https는 아무나 사용할 수 없습니다
 * 암호화를 적용하는 것 만큼 그것을 인증해 줄수 있는 기관도 필요합니다 인증서는 인증기관에서 구입해야하며 let's Encrypt같은 기관에서 무료로 발급해주기도 합니다
 * 인증서서 발급과정은 복잡하고 도메인도 필요하며 발급받은 인증서가 있다면 다음과 같이 해주면 ㅗ딥나다
 * 
 * 
 * 
 */

const https = require('https');
const fs = require('fs');

http.createServer({
    cert:fs.readFileSync('도메인 인증서 경로'),
    key:fs.readFileSync('도메인 비밀키 경로'),
    ca:[
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로')
    ],
}, (req,res)=>{
    res.writeHead(200,{'Cotent-Type': 'text/html; charset=utf8'});
    res.write('<h1>hellonode</h1>');
    res.end('<p>hello server</p>');
})
.listen(443,()=>{
    console.log('443번 포트 서버 대기');
});

/** 비슷하지만 createServer 메서드가 인수를 2개 받습니다 두번쨰 인수는 http모듈과 같이 서버 로직이고 첫번쨰 인수는 인증서에 관련된 옵션 객체입니다 
 * 인증서를 구입하면 pem이나 crt, key확장자를 가진 파일들을 제공합니다 파일들을 fs.readFileSync메서드로 읽아서 cert,key,ca옵션에 맞게 넣으면 됩니다
 * 실제 서버에서는 80포트 대신 443포트를 사용하면 됩니다. 
 * 
 * 노드의 http2모듈은 SSL암호화와 더불어 최신 HTTP 프로토콜인 http/2 를 사용하수 있게 합니다
 * 
 * 다음은 http2를 적용합니디
 */

const http2 = require('http2');
const fs=require('fs');

http2.createServer({
    cert:fs.readFileSync('도메인 인증서 경로'),
    key:fs.readFileSync('도메인 비밀키 경로'),
    ca:[
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로')
    ],

}, (req,res)=>{
    res.writeHead(200,{'Content-Type' : 'text/html; charset=utf-8'});
    res._write('<h1>hello node</h1>');
    res.end('<p>hello server</p>');
})
.listen(443,()=>{
    console.log('443포트 대기중')
})