/** 멀티스레드 프로그램에서는 스레드 하나가 멈추면 그일을 다른 스레드가 대신합니다 하지만 메인 스래드는 하나뿐 이므로 그 하나를 소중히 보호해야합니다
 * 메인 스레드가 에러로 인해 멈춘다는 것은 스레드를 갖고 있는 프로세스가 멈춘다는 뜻이고, 전체 서버도 멈춘다는 뜻과 같습니다
 * 
 * 따라서 에러를 처리하는 방법을 익혀두어야 합니다
 * 
 * 프로세스가 멈추지 않고록 trt문으로 감싸면댑니다
 * 
 */

setInterval(()=>{
    console.log('시잗');
    try{
        throw new Error('서버를 고장내주마');

    }catch(err){
        console.error(err);
    }
},1000);

//setInterval을 사용한것은 프로세스가 멈추는지 여부를 체크하기위해서 입니다 프로세스가 에러로 인해 멈추면 setInterval도 멈출 것입니다 setInterval soqndp throw new Error
//를 써서 에러를 강제로 발샐시켯습니다

/** node error1
 * 
 * 시작
 * 서버를고장내주마
 * 
 * 시작
 * 서버를 고장내주마
 * //계속반복
 * 
 * 
 * 
 * 
 * 이버에는 노드 자체에서 잡아주는에러를 알아보겟습니다
 * 
 * 
 */

const fs =require('fs');

setInterval(()=>{
    fs.unlink('./abcdefg.js',(err)=>{
        if(err){
            console.log(err);
        }
    });
},1000);


//fs.unlink로 존재하지 않는 파일을 지우고 있스빈다 에러가 발생하지만 다행이 노드 내장모듈의에러는 실행중인 프로세스를 멈추지 않습니다
//에러 로그를 기록해두고 나중에 원인을 찾아서 수정하면 됩니다
//프로미스의 에러는 carch하지 않아도 알아서 처리됩니다
//프로미스를 사용할떄는 항상 catch를 붙여주어 에러를 방지합니다

//예측이 불가능한 에러를 처리하는 방법

process.on('uncaughtException',(err)=>{
    console.log('예기치 못한 에러',err);
});

setInterval(()=>{
    throw new Error('서버를 고장내주마');
},1000);

setTimeout(()=>{
    console.log('실행됩니다');
},2000);

/**  process객체에 uncaughtException 이벤트 리스너를 달았습니다.처리하지 못한 에러가 발생했을 떄 이벤트 리스너가 실행되고 프로세스가 유지됩니다
 * 이 부분이 없다면 settimeout이 실행되지 않습니다 실핼후 1초만에 에러가 발생하여 프로세스가 멈추기 떄문입니다
 * 하지만 uncaughtException 이벤트 리스너가 연결되어 있으므로 프로세스가 멈추지 않습니다
 * 어떨게 보면 uncaughtException 이벤트 리스너로 모든 에러를 처리할 수 있을것 만 같습니다
 * 하지만 uncaughtException는 노드 공식사이트에서 최후의 수단으로 사용할것으로 명시되어 잇습니다
 * 노드는 에러 uncaughtException발생후 제대로 동작이 되는지 보증하지 않습니다 
 * 따라서 uncaughtException는 단순히 에러 내용을 기록하는 정도로 사용하고 에러를 기록하고 process.exit으로 종료하는 것이 좋습니다
 * 
 * 자주 발생하는 에러들
 * 
 * node : command not found:노드를 설치햇지만 이 에러가 발생하는 것은 환경 변수가 제대로 설정되있지 않아서 입니다.환경 변수에는 노드가 설치된 경로가 포함되어야 합니다
 * node외에 다른 명령어도 마찬가지 입니다. 그 명령어를 수행할수 있는 피일이 환경 변수에 들어 있어야 콘솔에서 사용할수 있습니다
 * 
 * ReferenceError :모듈 is not defined:모듈을 require했는지 확인합니다
 * 
 * Error:Cannot find module 모듈명 : 해달 모듈을 require했지만 설치하지 않았습니다 npm i명령어로 설치하세요
 * 
 * Error:can't set jeaders after they are sent :요청에 대한 응답을 보낼떄 응답을 두번이상 보냈습니다 요청에 댇한 응답은 한번만 보내야 합니다 응답을보내는 메서드를 
 * 두번이상 사용하지 않았는지 체크하세요
 * 
 * FATAL ERROR:CALL_AND_RETRY_LAST Allocation failed -Javascript heap out of
 *   -memory :코드를 실행할떄 메모리가 부족하여 스크립트가 정상 작동하지 않는 경우입ㄴ다 코드가 잘못되었을 확률이 높으므로 코드를 점갬해 보세요 만약 코드는 정상이지만
 *   노드가 활용할 수 있는 메모리가 부족한 경우라면 노드의 메모리를 늘릴수 있습니다 노드를 실행할떄 node--max-space-size=4096 파일명과 같은 명령어를 사용하면 됩니다
 *   4096은 4gb을 의미합니다
 * 
 * UnhandledPromiseRejectionWarning : Unhandled promise rejection :프로미스 사용시 catch메서드를 붙이지 않으면 발생합니다 항상 catch를 붙여 에러가 나는 상황에 대비하세요
 * 
 * EADDRINUSE 포트번호 : 해당 포트 번호에 이미 다른 프로세스가 연결되어 있습니다 그 프로세스는 노드 프로세스 일 경우도 있고 다른 프로그램일수도 있습니다 그 프로세스를 종료하거나
 * 다른 포트번호를 입력해야 합니다
 * 
 * 맥/리눅스에서 프로세스 종료
 * 
 * $ lsof -i tcp:포트
 * # kill -9 프로세스 아이디
 * 
 * EACCES또는 EPERM:노드가 작업을 수행하는데 권한이 충분하지 않습니다 파일/폴더 수정,삭제,생성권항을 확인해보는 것이 좋습니다 맥이면 sudo를 붙으닌것도 방법입니다
 * 
 * EJSONPARSE:package.json등의 JSON파일에 문법 오류가 있을떄 발생합니다 
 * 
 * ECONNREFUSED :요청을 보냈으나 연결이 성립하지 않을 떄 발생합니다 요청을 받는 서버의주소가 올바른지 꺼져있지는 않는지 확인해봐여합니다
 * 
 * ETARGET:package.json에 기록한 패키지 버전이 존재하지 않을떄 발생합니다 
 * 
 * ETIMEOUT : 요청을 보냈으나 응답이 일정시간 내에 오지 않을 떄 발생합니다 요청을 받는 서버의 상태를 점검해봐야 합니다
 * 
 * ENOENT:no such file or directory :지정한 폴더나 파일이 존재하지 않는 경우입니다 맥이나 리눅스 운영체제에서는 대소문자도 구별하므로 확인해봐여합니다
 * 
  */
