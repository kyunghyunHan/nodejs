//npm에는 서버를 제작하는 과정에서의 불편함을 해소하고 편의 기능을 추가한 웹 서버 프레임 워크가 있습니다
//대표적인것이 익스프레스 입니다.
//npm init
//npm i express
//npm i d nodemon

/** scripts 부분에 start속성을 잊지말고 넣어줘야 합니다 nodemon app을 하면 app.js를 nodemon으로 실행한다는 뜻입니다
 * 서버 코드에 수정사항이 있을떄마다 매번 서버를 재시작 하기는 귀찮으므로 nodemon모듈로 서버를 자동으로 재시작합니다
 * nodemon은 개발용으로만 사용하는 것을 권장합니다 배포 후에는 서버 코드가 빈번한게 변경될 일이 없으므로 nodemon을 사용하지 않아도 됩니다.
 */

const express  = require('express');

const app = express();

app.set('port',process.env.PORT || 3000);

app.get('/',(req,res)=>{
    res.send('hello,Express');
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기중');
});

/**Express 모듈을 실행해 app변수에 할당합니다 익스프레스 내부에 http모둘이 내장되어 있으므로 서버의 역활을 할수 있습니다
 * 
 * app.set로 서버가 실행될 포트를 설정합니다 peocess.env내부에 PORT속성이 있다면 그 값을 사용하고 없다면 기본 값으로 3000번 이용하도록 되어 있습니다 이렇게 app.set을 사용하여 데이터를 저장할 수 있습니더
 * 
 * app.get(주소,라우터)는 주소에 대한 get 요청이 올떄 어떤 동작을 하지는지 적는 부분입니다.매개변수 req는 요청에 관한 정보가 들어 있는 객체고 res는 응답에 관한 정보가 들어있는 객체입니다
 * 
 * 현재 Get/요청시 응답으로 Hello,express 를 전송합니다 익스프레스에서는 res.write res.end대신 res.send를 사용하면 됩니다
 * GET요청 외에도 POST,PUT,PATCH,DELETE,OPTION,에 대한 라우터를 위한 app.post,app.put,app.patct,app.delete,app.options메서드가 존재합니다
 * 
 * 단순한 문자열 대신 html로 응답하고 싶다면 res.sendfile메서드를 사용하면됩니다
 * 
 * 
 */
const express = require('express');
const path = require('path');

const app = express();

app.set('port',process.env.PORT || 3000);

app.get('/' ,(req,res)=>{
    //res.send(hello express);
    res.sendFile(path.join(__dirname,'index.html'));
});
app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기중');
});


