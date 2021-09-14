//이벤트 리스너를 가지 노드서버

//createServer콜백 부분을 보면 req와 req매개변수가 있습니다 보통 reqest줄여 req라고 표현하고, respones를 줄여 res를 표현합니다

const { error } = require('console');
const http = require('http');
http.createServer((req,res)=>{
    //여기에 어떻게 응답할지 적습니다
    res.writeHead(200,{'Content-Type' : 'text/html; charest = utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello SERVER!<P>');
})
.listen(8080,()=>{
    //서버연결
    console.log('8080포트에서 서버 대기중입니다');
});

//$ node server1

//localhost:8080 접속

/** 포트는 서버내에서 프로세스를 구분히는 번호입니다 서버는 http요청을 대기하는 것 외에도 다양한 작업을 합니다 데이터베이스와 통신해야 하고 FTP요청을 처리하기도 합니다
 * 
 * 자주 사용 포트 21(FTP).80(HTTP),443(HTPPS),3306(MYSQL) 실제로 배포할떄는 80번 또는 443번 포트를 사용
 * 
 * 
 */

 const http = require('http');
 http.createServer((req,res)=>{
     //여기에 어떻게 응답할지 적습니다
     res.writeHead(200,{'Content-Type' : 'text/html; charest = utf-8'});
     res.write('<h1>Hello Node!</h1>');
     res.end('<p>Hello SERVER!<P>');
 })
 .listen(8080,()=>{
     //서버연결
     console.log('8080포트에서 서버 대기중입니다');
 });
 
 /** createServer 매서드 뒤에 listen메서드를 붙이고 클라리언트에 공개할 포트번호와 포트 연결 완료 후 실행될 콜백함수를 넣습니다 이제 이파일을 실항 하면 서버는 8080포트에서 요청이 오기를 기다립니다
  * 
  * res.wtiteHead는 응답에 대한 정보를 기록하는 메서드입니다 첫번째 인수로 성공적인 요청임을 의미하는 200을 두번쨰 인수로 응답에 대한 정보를 보내는데 콘텐츠의 형식이 htmldladmf 알리고 있습니다
  * 또한 한글 표시를 위해 charset을 utf8로 지정햇습니다 이 부분을 헤더라 합니다
  * 
  * res.write메서드의 첫번쨰 인수는 클라이언트로 보낼 데이터입니다. 지금은 html모양의 문자열을 보냇지만 버퍼를 보낼수도 있습니다 또한 여러번 호출하여 데이터를 여러개 보내도 댑니다
  * 이부분을 body라 부릅니다
  * 
  * res.end는 응답을 종료하는 메서드입니다 만약 인수가 있다면 그 데이터도 클라이언트로 보내고 응답을 종료합니다
 */


  const http = require('http');
  const sercer=  http.createServer((req,res)=>{
     //여기에 어떻게 응답할지 적습니다
     res.writeHead(200,{'Content-Type' : 'text/html; charest = utf-8'});
     res.write('<h1>Hello Node!</h1>');
     res.end('<p>Hello SERVER!<P>');
 });
 server.listen(8080,);
 server.console('listening',()=>{
     //서버연결
     console.log('8080포트에서 서버 대기중입니다');
 });
 server.console('error',(error)=>{
     console.log(error);
 });

 //소스코드 변경 
 //서버의 소스코드를 변경할떄 서버가 자동으로 변경사항을 반영하지는 않습니다 서버를 종료햇다가 다시 실행해야합니다

 //한번에 여러 서버를 실행할수도 있습니다. createServer를 원하는 만큼 호출하면 됩니다


 const http = require('http');

 http.createServer((req,res)=>{
     res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
     res.write('<h1>Hello Node!<h1>');
     res.end('<p>Hello SErver</p>');
 })
 .listen(8080,()=>{
     console.log('8080 포트에서 서버 대기 중입니다');
 });

 http.createServer((req,res)=>{
     res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
     res.write('<h1>hello node</h1>');
     res.end('<p>Hello Server</p>');

 })
 .listen(8081,()=>{
     console.log('8081포트에서 서버 대기 중입니다');
 });
 /**각각 8080포트와 8081포트에 주소로 접속할수 있습니다 이떄 포트 번호가 달라야 한다는 점을 주의
  * html파일을 불러오기
  */

 const http = require('http');
 const fs = require('fs').promises;

 http.createServer(async(req,res)=>{
    try{
        const data = await fs.readFile('./server2.html');
        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
        res/end(data);
    } catch(err){
        console.log(err);
        res.writeHead(500,{'Content-Type': 'text/html; charset=utf-8'});
        res.end(err.message);
    }

 })
 .listen(8081,()=>{
     console.log('8081포트에서 서버 대기중입니다')
 });

 /**요청이 들어오면 fs으로 html파일을 읽고 data변수애ㅔ 저장된 버퍼를 그대로 클라이언트에 보내면 댑니다
  * 
  * HTTP상태 코드
  * 200이나 500같은 숫자는 http상태 코드입니다 res.writeHead에 인수로 상태코드를 넣었는데 브라우저는 서버에서 보내주는 상태코드를 보고 요청이 성공했는지 실패했는지 판단합니다
  * 
  * 2xx :성공을 알리는 상태코드 200(성공),201(작성)
  * 3** :리다이렉션(다른펭이로 이동)을 알리는 상태코드 어떤 주소를 입력했는데 다른 주소의 페이지로 넘어갈꺠 이코드가 사용됩니다 대표적으로 301(영구이동)302(임시이동) 304(수정되지 않음)은 요청의 응답으로 캐시를 사용했다는 뜻
  * 4**:요청 오류를 나타냅니다 요청 자체에 오류가 있을때 표시됩니다 대표적으로 400(잘못된 요청).401(권한없음 ).403(금지됨)404(찾을 수 없음)
  * 5**:서버 오류를 나타냅니다 요청은 제대로 왓지만 서버에 오류가 생겻을떄 발생합니다 이 오류가 뜨지않게 주의해서 프로그래밍 해야합니다 이 오류흫 res.writeHead로 클라이언트에 직접 보내는 경우는 거의 없고 예기치 못한 에러 발생시 서버가 알아서 5**대 코드를 보냅니다 500(내부서버 불량)502(불량 게이트웨이) 503(서비스를 사용할수 없음)
  * 
  * 요청 처리 과정중에서 에러가 발생하였다고 응답을 보내지 않으면 안됩니다 요청이 성공했든 실패하엿든 응답을 클라이 언트로 보내서 요청이 마무리 되었음을 알려야 합니다 응답을 보내지 않는다면 클라이 언트는 서버로부터 응답이 오길 하염없이 기다리다가 일정 시간 후 처리합니다
  */