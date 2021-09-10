/** global
 * 
 * 브라우저의 window같은 객체 전역객체이므로 모든 파일에서 접근이 가능 또한 wimdow.open메서드를 open으로 호출할 수 있는 것처럼 global도 생략이 가능 require도 global이 생략
 * 
 * $node
 * >global
 * {
 * global: [circluar *1]
 * cleatInterval :[Function : clearInterval],
 * cleatRimeout :[Function : clearTimeout],
 * ...
 * }
 * >global.console{
 * log:[Function:bound consoleCall],
 * warn:[Function:bound consoleCall],
 * dir:[Function:bound consoleCall]]
 * ...
 * }
 * 
 * 노드버전에 따라 콘솔 내용이 다를수 있음 
 * 
 * 전역객체라는 점을 이용하여 파일간에 간단한 데이터를 공유할 떄 사용하기도 함
 * 
 * globalA.js
 * module.exports = () => global.message;
 * 
 * 
 * globalB.js
 * const A = require('./globalA');
 * 
 * global.message = '안녕하세요';
 * console.log(A()); 
 * 
 * globalA 모듈의 함수는 global.message값을 반환합니다 globalB.js에서는 global객체에 속성명이 message인 값을 대입하고 globalA모둘의 함수를 호출합니다 콘솔결과는 globalB에서 넣은
 * global.message값을 globalA에서도 접근할수 잇음을 보여줍니다
 * 
 * $node globalB
 * =>안녕하세요
 * 
 * global형식의 남용은 프로그램 규모가 커질수록 global객체에 값을 어떤파일에서 대입을 하였는지 찾기 어려워 유지보수에 어려움을 겪기 떄문에 남용은 x
 * 모듈형식으로 만들어서 불러오는것이 좋음
 * 
 * console
 * 지금까지 사용한 console도 window대신 global객체 안에 들어있으며 브라우저의 console과 비슷
 * 
 * 
 * 
 * console.js
 * 
 * const string = 'abc';
 * const number = 1;
 * const bollean = true;
 * const obj = {
 * outside:{
 *   inside:{
 *      key:'value',
 * },
 * },
 * 
 * }
 * 
 * console.time('전체시간')
 * console.log('평버한 로그입니다 쉼표로 구분해 여러 값을 찍을 수 잇습니다');
 * console.log('여러 메시지는 consol.error에 담아주세요');
 * 
 * console.table([{name:'제로',birth:1994},{name:'hero',birth:1988}]);
 * 
 * console.dir(obj,{colors:false,depth:2});
 * console.dir(obj,{colors:true,depth:1});
 * 
 * consoe.time('시간측정');
 * for (let i =0; i<100000; i++){}
 * console.timeEnd('시간측정');
 * 
 * function b(){
 * console.trace('에러 위치 추격');
 * }
 * 
 * function a(){
 * b();
 * a();
 * console.timeEnd('전체 시간');
 * }
 * 
 * 
 * console.time(레이블):console.timeEnd(레이블)과 대응되어 같은 레이블을 가진 time과 timeEnd사이의 시간을 측정
 * 
 * console.log(내용) :평범한 로그를 콘솔에 표시합니다 console.log(내용,내용,...)처럼 여러 내용을 동시에 표시 할수도 있습니다
 * console.error(에러내용) :에러를 콘솔에 표시합니다
 * console.table(배열):배열의 요소로 객체 리터럴을 넣으면 객체의 속성들이 테이블 형식으로 표현됩니다 아래 결과를 확인해 보세요
 * console.dir(객체,옵션): 객체를 콘솔에 표시할 떄 사용합니다.첫 번쨰 인수로 표시할 객체를 넣고 두 번쨰 인수로 옵션을 넣습니다. 옵션의 colors를 true로 하면 콘솔에 색이 추가되어 보기가 한결 편해집니다 depth는 객체안의 객체를 몇단계까지 보여줄지를 결정합니다 기본값은 2입니다
 * 
 *console.trace(레이블):에러가 어디서 발생했는지 축적할수 있게 합니다. 일반적으로 에러 발생시 에러 위치를 알려주므로 자주 사용하지는 않지만 위치가 나오지 않는다면 사용할만 합니다


 * $ node console
평범한 로그입니다. 쉼표로 구분해 여러 값을 찍을 수 있습니다
abc 1 true
여러 메시지는 console.error에 담아주세요

index         name           birth

 0             '제로'          1994
 1              'hero'         1988

 {outsude: {inside:{key:'value'}}}]
  {outsude: {inside:[Object]}}
  시간측정 ㅣ1.017ms
  Trace :에러 위치 추적
      -$$ 
  
   전체시간 :5.382ms





 * 타이머
   setTimeout(콜백함수,밀리초):주어진 밀리초(1.000분의 1초)이후에 콜백함수를 실행
   setInterval(콜백함수,밀리초):주어진 밀리초마다 콜백함수를 반복 실행합니다
   setImmediate(콜백함수): 콜백함수를 즉시 실행합니다
   
   이 타이머 함수들은 모두 아이디를 반환합니다 아이디를 사용하여 타이머를 취소할수 있습니다
 * 
 * clearTimeout(아이디):setTimeout를 취소
 * clearInterval(아이디):setInterval를 취소
 * clearImmdiate(아이디):setImmediate를 취소\\
 * 
 * 타이머를 사용한코드
 * 
 * 
 */
const timeout = setTimeout(()=>{
    console.log('1.5 초후  실행');
},1500);

const interval = setInterval(()=>{
    console.log('1초마다 실행');
},1000);

const timeout2 = setTimeout(()=>{
    console.log('실행되지 않습니다');
},3000);

setTimeout(()=>{
    clearTimeout(timeout2);
    clearInterval(interval);

},2500);

const immediate = setImmediate(()=>{
    console.log('즉시싫행');

});

const immediate2 = setImmediate(()=>{
    console.log('실행되지 않습니다');
});

clearImmediate(immediate2);

/**제일먼저 실행되는 것은 immediate입니다 immediate2는 바로 clearImmediate를 사용해서 취소했으므로 실행되지 않습니다 코드 실행 1초후애는 interval의 콜백이 실행됩니다
 * 코드 실행 1.5초후에는 timeout의 콜백이 실행될것입니다 imterval의 콜백은 1초마다 실행되므로 코드 실행 후 2초가 지났을떄도 콜백이 실행됩니다. 2.5초가 지났을떄 cleatTimeout과 clearInterval이 각각
 * timeout2와 interval을 취소합니다 따라서 코드 실행 3초후에는 로그가 아무것도 남지 않습니다
 * 
 * 
 * 실행순서
 * 0      immedate   즉시실행
 *        immedate2-  
 * 
 * 1       interval   1초마다 실행
 * 
 * 1.5     timeout     1.5초마다 실행
 * 
 * 2      interval     1초마다 실행
 * 
 * 2.5    timeout2-
 *         interval-
 * 
 * 
 * $node timer
 * 즉시실행
 * 1초마다 실행
 * 1.5초후 실행
 * 1초마다 실행
 * 
 * setImmediate(콜백)과 setTimeout(콜백,0)에 담긴 콜백함수는 이벤트 루프를 거친 뒤 즉시 실행됩니다 둘의 차이점은 특수한경우에 setImmediate는 settimeout(콜백,0)보다 먼저 실행됩니다파일
 * 시스템 접근 네트워킹같은 I/O 작업의 콜백함수 안에서 타이머를 호출하는 경우입니다 하지만 setImmediate가 항상 setTimeout(콜백,0)보다 먼저 호출되지은 않는다는 사실만 알고 햇갈리지 않도록 setTimeout(콜백,0)은 사용하지 않는 것을 권장
 * 
 * __filename,__firname
 * 
 * filename.js
 * console.log(__filename);
 * console.log(__dirname);
 * 
 * $ node filename.js
 * c:\users\zerocho\filename.js
 * c:\user\zerocho
 * 
 * 경로는 다를수잇음 \아니면 /
 * 경로가 문자열로 반환될수도 있고 구분자 문제도 있으므로 path모듈사용
 * 
 * 지금까지는 모듈을 만들 떄 module.exports만 사용했는데 ,module객체 말고 exports객체로도 모듈을 만들 수 있습니다.
 * 
 * var.js를 다음과 같이 수정하여도 index.js에서는 동일하게 불러올수 있음
 * exports.odd= '홀수입니다';
 * exports.even='짝수입나다';
 * 
 * $ node index
 * 짝수입니다
 * 홀수입니다
 * 
 * exports객체에 add함수를 넣으면 module.exports에도 add함수가 들어갑니다
 * 
 * exports 객체를 사용할떄는 module.exports와의 참조 관계가 꺠지지 않도록 주의해야합니다.module.exports에는 어떤값이든 대입해도 대지만 exports에는 반드시 객체처럼 속성명과 속겅값을 대입해야합니다
 * exports에 다른 값을 대입하면 객체의 참조 관계가 끊겨 더이상 모듈로 기능하지 않습니다
 * exports를 사용할떄는 객체만 사용할수 있으므로 func.js와 같이 module.exports에 함수를 대입한 경우는 exports로 바꿀수 없습니다
 * 
 * node에서의 this
 * 
 * this.js
 * 
 * console.log(this);
 * console.log(this === module.exports)l
 * console.log(this ===exports)
 * 
 * function whatThis(){
 * console.log('function , that === exports , this ===global);
 * }
 * whatThis();
 * 
 * 
 * $node this
 * {}
 * true
 * true
 * function false true
 * 다른부분은 브러우저의 스크립트와 동일하지만 최상위 스코프에 존재하는 this는 module.exports를 가리킵니다 또한 함수 선언문에서는 this는 global을 가리킵니다
 * 
 * var.js가 있는 곳에 require.js를 만듭니다
 * 
 * require.js
 * 
 * console.log(['require가 가장 위에 오지 않아도 됩니다]);
 * module.exports = '저를 찾아보세요';
 * 
 * require('./var');
 * 
 * console.log('require.cache입니다');
 * console.log(require.cache);
 * console.log('require.main입니다);
 * console.log(require.main === module);
 * console.log(require.main.filename);
 * 
 * $node require
 * require가 가장 위에 오지 않아도 됩니다
 * rqquire.cache입니다.
 * [Object:null prototype]{
 * 
 * 'C:\\User\\zerocho\\require.js':Module {
 *  id: '.' ,
 * exports:'저를 찾아보세요.',
 * parent:null,
 * filename:C:\\User\\zerocho\\require.js'
 * loaded:false,
 * children:[ [Module]],
 * paths: [
 * C:\\User\\zerocho\\node_modules',
 * C:\\User\\node_modules',
 * C:\\\node_modules',
 *   ]
 * 
 * },
 * C:\\User\\zerocho\\var.js':Module{
 * 
 * id:C:\\User\\zerocho\\var.js',
 * exports:{odd:'홀수입니다',even:'짝수입니다'},
 * prent:Module {
 * id:','},
 * exports:null,
 * filename:C:\\User\\zerocho\\require.js',
 * loaded:false,
 * children:[Array],
 * path:[Array]
 * },
 * filename:C:\\User\\zerocho\\var.js',
 * loaded:true,
 * children:[],
 * path:[
 *  C:\\User\\zerocho\\node_modules',
 * C:\\User\\node_modules',
 * C:\\\node_modules',
 * 
 * ]
 * 
 * ]
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * }
 * rquire.main입니다
 * true
 * C:\\User\\zerocho\]\require.js
 * 
 * 속성값으로는 각 파일의 모듈 객체가 들어있음,한번 require한 파일은 require.cache에 저장되므로 다음번에 require할떄는 새로 불러오지 않고 requirer.cache에 있는것이 재사용댐
 * 
 * 만일 새로 require하길 원한다면 require.cache의 속성을 제거하면됨 다만 프로그램 동작이 꼬일수 있으므로 권장하지는 않음
 * 
 * require.main은 노드 실행시 첫 모둘을 가리키며 현재node require로 실행했으므로 require.js가 require.main이 됩니다.
 * 
 * 모듈을 사용할떄 주의해야할점  두 dep1과 dep2가 있고 서로를 require를하면
 * 
 * dep1.js
 * const dep2 = require('./dep2');
 * console.log('require dep2' ,dep2);
 * module.exports = ()=>{
 * 
 * console.log('dep2', dep2);
 * }
 * 
 * 
 * dep2.js
 * const dep21= require('./dep1');
 * console.log('require dep1' ,dep1);
 * module.exports = ()=>{
 * 
 * console.log('de1p', dep1);
 * }
 * 
 * 
 * dep-run.js를 만들어 두 모듈 실행
 * 
 * dep-run.js
 * const dep1=require('./dep1');
 * const dep2=require('./dep2');
 * 
 * dep1();
 * dep2();
 * 
 * 코드가 위에서부터 실행되므로 require('./dep1')이 먼저 실행됩니다 dep1.js에서는 제일먼저
 * require('./dep2')가실행됩니다 다시 dep2.js에서는 require('./dep1')이 실행됩니다 이과정이 계속 반복되면 
 * 
 * 
 * 
 * $node dep-run
 * require dep1 {}
 * require dep2[Function (anonymous)]
 * dep2[Function(anonymous)]
 * dep1{}
 * (node2994)warning Error
 */
 

/** process
 * 
 * process객체는 현재 실행되고 있는 노드 프로세스에 대한 정보를 담고 있습니다 process객체 안에는 다양한 속성이 있는데REPL에 입력 결과값은 컴퓨터마다 다를수 잇음
 * 
 * $node
 * process.version
 * -노드의 버전
 * process.arch
 * x64 -프로세서 아키덱처 정보
 * process.platform
 * win32
 * process.pid
 * 14736 프로세스 아이디
 * process.uptime()
 * 199.36 프로세스가 시작된 후 흐른 시간
 * process.exePath
 * 노드의 경로
 * process.cwd()
 * 현재 프로세스가 실행되고 있는 위치
 * process.spuUsage()
 * 현재 cpu사용량
 * 
 * process.env process.nextTick, process.exit()은 중요
 * 
 * 
 * 
 * 
 * process.env
 * 
 * PEPL에 process.env를 입력하면 정보 출력 이 정보들은 시스템의 환경변수
 * 
 * NODE_OPTIONS = --max--old-space-size=8192
 * UV_THREADPOOL_SIZE=8
 * 
 * 왼쪽이 환경변수 오른쪽이 값 NODE_OPTIONS는 노드를 실행할떄 의 옵션들을 입력받는 환경변수--max--old-space-size=8192는 노드의 메모리를 8gb까지 사용할수 있게함
 * V_THREADPOOL_SIZE 는 노드에서 기본작으로 사용하는 스레드풀의 스래드 개수를 조절할수 있게 함
 * 
 * 시스템 환경변수 외에도 임의로 환경변수를 저장할수 잇음
 * process.env는 서비스의 중요한 키를 저장하는 공간으로 사용 서버나 데이터베이스의 비밀번호와 각종 API키를 코드에 입력하는것은 위험하므로 중요한 비밀번호는 다음과 같이 process.env의 속성으로 대체
 * 
 * const secretId= process.env.SECRET_ID;
 * const secrectCode = process.env.SECRET_CODE;
 * 
 * 이제 직접 SECRET_ID와 SECRET_CODE를 넣으면 됨 넣는방법은 운영체제마다 다르고 한번에 모든 운영체제에 넣는 방법이잇음
 * dotenv사용
 * 
 * 
 * process.nextTick(콜백)
 * 
 * 이벤트루프가 다른 콜백 함수들보다 nextTick의 콜백함수를 우선으로 처리하도록 만듬
 * 
 * nextTick.js
 * setImmediate(()=>{
 * console.log('immediate');
 * });
 * 
 * process.nexrtTick(()=>{
 * console.log('nextTick');
 * });
 * setTimeout(()=>{
 * console.log('timeout');
 * },0);
 * Promise.resolve().then(()=>console.log('promise));
 * 
 * process.nextTick은 setImmediate나 setTimeout보다 먼저 실행 코드 맨 밑에 promise를 넣은것은 resolve된 promise도 nextTick처럼 콜백들보다 우선시 되기 때문
 * 그래서 process.nextTick과 promise를 마이크태스크 라고 따로 구분지어 부름
 * 
 * $node nextTick
 * nextTick
 * promise
 * timeout
 * immediate
 * 
 * //ex )  process.nextTick으로 받은 콜백함수나 resolve된 promise는 다른 이벤트 루프에서 대기하는 콜백 함수보다도 먼저실행 그래서 비동기 처리를 할떄 setImmediate.nextTick을 더 선호하는 개발자도잇음
 * 하지마 이런 마이크로테스크를 재귀 호출하게 되면 이벤트 루프는 다른 콜백함수보다 마이크로 타스크를 우선하여 처리하므로 콜백함수들이 실행되지 않을 수도 잇음
 * 
 * process.exit(코드)
 * 실행중인 노드프로세스를 종료합니다 서버 환경에서 이 함수를 사용하면 서버가 멈추므로 특수한 경우를 제외하고는 서버에서 잘 사용하지 않습니다 하지만 서버 외의 독립전인 프로그램에서는 수동으로 노드를 멈추기 위해 사용   
 * 
 * setInterval로 반복되고 있는 코드를 process.exit()으로 멈춰보겠습니다
 * 
 * let i =1;
 * setInterval(()=>{
 * if (i ===5){
 * console.log('종료!');
 * process.exit();
 * }
 * console.log(i);
 * i+=1;
 * },1000);
 * 
 * 1부터 4까지 표시한 뒤 i가 5가 되었을떄 종료
 * 
 * $node exit
 * 1
 * 2
 * 3
 * 4
 * 종료!
 * 
 * process.exit 메서드는 인수로 코드 번호를 줄수 있습니다 인수를 주지 않거나 0을 주면 정상 종료를 뜻하고 1을 주면 비정상 종료를 뜻합니다 만약 에러가 발생해서 종료가 발생하는 경우에는 1을 넣으면 댑니다
 * 
 */ 