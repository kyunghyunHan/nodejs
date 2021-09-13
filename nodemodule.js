/**노드는 웹 브라우저에서 사용하는 자바스크립트보다 더 많은 기능을 제공
 * 운영체제에 접근할 수 있고 클라이언트가 요청한 주소에 대한 정보도 가져올 수 있습니다
 * 
 * os
 * os모듈의 대표 메서드
 * 
 * os.js = require('os');
 * 
 * console.log('운영체제 정보 -----------------');
 * console.log('os.arch();'os arch()); 
 * console.log('os.platform():',os.platform());
 * console.log('os.type():' ,os.type());
 * console.log('os.uptime():',os.uptime());
 * console.log('os.hostname():',os,hostname());
 * console.log('os.release():',os.release());
 * 
 * console.log('경로-------------------------');
 * console.log('os.homedir():',os.homedir());
 * console.log('os.tmpdir():,os.tmpdir());
 * 
 * console.log('cpu정보'----------------------)
 * console.log('os.cpus():',os.cpus());
 * console.log('os.cpus().length:',os.cpus().length);
 * 
 * console.log('메모리 정보-------------------------);
 * console.log('os.freemem():',os.freemem());
 * console.log('os.totalmem():',os.totalmem());
 * 
 * 
 * 콘솔
 * node os
 * 운영체제 정보 ------------------------
 * os.arch():x64
 * os.platform():win32
 * os.type():windows_NT
 * os.uptime():53354
 * os.hostname():DESKTOP-PRANDNC
 * os.release():10.0.18362
 * 
 * 경로----------------
 * os.homedir():C:USER\zerocho
 * os.tmpdir(): C:\User\zerocho\AppData\Local\Temp
 * cpu정보----------------------
 * os.cpus():[{model:Intel(R) core(TM)i5-9400f}]
 * os.cpus().length:6
 * 메모리 정보 -------------------
 * os.freemem():2333421341
 * os.totalmem():312313124124
 * 
 * os.arch(): process.arch과 동일합니디
 * os.platform(): process.platform과 동일합니다
 * os.type():운영체제의 종류를 보여줍니다
 * os.uptime():운영체제 부팅 이후 흐른 시간(초)를 보여줍니다 process.uptime은 노드의 시간
 * os.hostname()컴퓨터의 이름을 보여줍니다
 * os.release(): 운영체제의 버전을 보여줍니다
 * os.homedir(): 홈 디렉터리 경로를 보여줍니다
 * os.tmpdir() 임시파일저장 경로를 보여줍니다
 * os.cpus(): 컴퓨터의 코어 정보를 보여줍닌다
 * os.freemem():사용 가능한 메모리 (ram)을 보여줍니다
 * os.totalmem()전체 메모리 용량을 보여줍니다
 * 
 * 코어개수 확인하기
 * os.cpus()를 하면 코어의 개수가 숫자로 나옵니다 하지만 노드에서는 싱글스레드 프로그래밍을 하면 코어가 몇개이든 상관없이 대부분의 경우 코어를 하나밖에 쓰지 않습니다 하지만
 * cluste모듈을 사용하는 경우에는 코어 개수에 맞춰서 프로세스를 늘릴수 있습니다
 * 
 * os.constants라는 객체도 있습니다.그안에는 각종 에러 신호에 대한 정보가 담겨있습니다 
 */

/**path
 * 
 * 폴더와 경로를 쉽게 조작하도록 도와주는 모듈
 * 
 * 윈도우 타입 \으로 구별
 * prosix : /으로 구별 (맥이나 리눅스)
 * 
 * __filename,__dirname은 각각 현재파일과 현재 폴더의 경로를 나타냄
 * 
 *path.sep : 경로의 구분자
 * path.delimiter : 환경변수의 구분자 , process.env.PATH를 입력하면 여러 개의 경로가 이 구분자로 구분되어 있습ㄴ디ㅏ 윈도는 세미클론; ,posix는 :입니다
 * path.dirnama(경로) : 파일이 위치한 폴더 경로를 보여줍니다 
 * path.extname (경로) : 파일의 확장자를 보여줍니다 
 * path.basename(경로,확장자) : 파일의 이름 (확장자 포함) 을 표시합니다 파일의 이름만 표시하고 싶다면 basename의 두번쨰 인수로 파일의 확장자를 넣으면 댑니다
 * path.parse(경로) : 파일 경로를 root , dir , base,ext, name 으로 분리합니다
 * path .format(객체) : path.parse()한 객체를 파일 경로로 합칩니다
 * path.normalize(경로) : /나 \ 를 실수로 여러번 사용했거나 혼용했을떄 정상적인 경로로 변경합니다
 * path.isAbsolute(경로) : 파일의 경로가 절대 경로인지 상대경로인지 true나 flase로 알립나다
 * path.relatuve L (기준경로,비교경로) : 경로를 두개 넣으면 첫번쨰 경로레서 두번쨰 경로로 가는 방법을 알립나다
 * path.join(경로,...) : 여러 인수를 넣으면 하나의 경로로 합침 ,상대 경로인...(부모디렉토리)와 (현위치)더 알아서 처리
 * path.resolve(경로,...) : path.join()과 비슷하지만 차이가 있습니다 차이점은 다음에 나오는 note에서 설명합니다 */

/** join 괴 resolve의 차이
 * 
 * path.join ('/a' , '/b', '/c')  결과  /a/b/c
 * path.resolve('/a ', '/b','c')  결과 /b/v
 */

/**어떨떄 \\을 사용하고 어떨떄 \사용
 * 
 * 콘솔결과를 보면 어떤떄는 \\을사용하고 어떨떄는 \를 사용하여 윈도 경로를 표시,기본적으로 경로는 \하나를 사용하여 표시,하지만 자바스스크립트 문자열에서는 \ 가 특수문자이므로 \를 2개를 붙여 경료를 표시
 * 예를 들어 \n은 자바스크립트 문자열에서 줄바꿈이라는 뜻이르모 C:\node 와 같은 경로에서 의도하지 않는 오류가 발생할 수 있음 이떄는 C:\\node 로 표시해야함
 * path모듈은 위와 같은 경웨 발생하는 문제를 알아서 처리함 이는 윈도에서 path모듈이 꼭필요함을 말함
 * 
 */

/**상대경로와 절대경로
 * 
 * 절대경로는 루트폴더(윈도우의 ;C:\ posix /  )나 노드 프로세스가 실행되는 위치가 기준이 됨
 * 상대 경로는 현재 파일이 기준이댐 현재 파일과 같은 경로면 점하나를 현재 파일보다 한 단계 상위 경로면 점 두개를 표시해 사용
 * 
 */


/**url
 * 
 * 인터넷 주소를 쉽게 조작하도록 도와주는 모듈
 * 
 * url모듈안에 URL생성자가 있으며 이생성자에 주소를 넣어 객체로 만들면 주소가 부분별로 정리됨 이방식이 WHATWG의 url
 * 
 * 기존 노드방식에서는 두 메서드를 주로사용
 * 
 * url.parse(주소) : 주소를 분해합니다 WHATWG 방식와 비교하면 username과 password대신 auth속성이 있고,searParames대신 query가 있습니다
 * 
 * url.format(객체) : WHATWG 방식 url과 기존 노드의 url을 모두 사용이 가능 분해 되었던 url객체를 다시 원래 상태로 조립
 * 
 * 
 * WHATWG 와 노드의 url은 취향에 따라 사용하면 되지만 노드의 url형식을 꼭 사용해야 하는 경우가 있습니다
 * host부분없이 pathname부분만 오는 주소인 경우 WHATWG방식이 처리할 수 없습니다 
 * WHATWG방식은 search부분을 searchParams라는 특수한 객체로 반환하므로 유용합니다
 * search부분은 보통 주소를 통해 데이터를 전달할 떄 사용됩니다 search는 물음표 ? 로 시작하고 그뒤에 키 =값 형식으로 데이터를 전달합니다 여러키가 있을 경우 &로 구분합니디
 */

/**
 * getALl(키) :키에 해당괴는 모듈을 가져옵니다 category키에는 node.js와 javascript라는 두가지 키 값이 들어잇습니다
 * get(키) : 키에 해당하는 첫번쨰 값만 가져옵니다
 * has(키) :해당 키가 있는지 없는지를 검사합니다
 * ksys() : searcjParams의 모든 키를 반벅기 개체로 가져옵니다
 * values(): searchParams의 모든 값을 반복기 객체로 가져옵니다
 * append(키,깂) : 해당 키를 추가합니다 같은 키의 값이 있다면 유지하고 하나 더 추가합니다
 * set (키,값) append와 비슷하지만 같은 키의 값들을 모두지우고 새로 추가합니다
 * delete(키) 해당 키를 제거합니다
 * toString() 조작한 searchParms객체를 다시 문자열로 만듭니다 이 문자열을 search에 대입히면 주소 객체에 반영됩니다
 * 
 * query같은 문자열보다 searchParams가 유용한 아유는 quary의 경우 다음에 배우는 querystring모듈을 한번더 사용해야 하기 떄문
 * 
 * querystring
 * WHATWG방식의 url대신 기존 노드의 url을 사용할떄 search부분을 사용하기 쉽게 객체로 만드는모듈
 * 
 * querystring.parse(쿼리) :url의 query 부분을 자바스크립트 객체로 분해합니다
 * querystring.stringfy(객체)분대횐 query객체를 문자열로 다시 조립합니다

  * 
 */

/**cryto 
 * 
 * 다양한 방식의 암호화를 도와주는 모듈
 * 
 * 단방향 암호화
 * 비밀번호는 보통 단방행 암호화 알고르즘을 사용해서 암호화 합니다 단방행 암호화란 복호화 할수 없는 암호화 방식을 뜻합니다.복호화는 문자열을 원래 문자열로 되돌려 놓는 것을 의미합니다
 * 즉 단방향암호화는 한번 암호화하면 원래 문자열을 찾을수 없습니다 복호화 할수 없으므로 암호화 라고 표현하는데 대신 해시 함수라 부릅니다
 * 고객의 비밀번호를 암호화해서 데이터베이스의 저장합니다.그리고 로그인 할떄마다 비교하면 됩니다. 원래 비밀번호는 어디에도 저장되지 않고 암호화된 문자열로만 비교하는 겁니다
 * 
 * 노드에서의 해시함수
 * hash.js
 * 
 * const crypto = require('crypto');
 * 
 * console.log('base64' ,cryto.createHash('sha512').update('비밀번호').digest('base64'));
 * console.log('hex:',crypto.createHash('sha512').update('비밀번호').digest('hex'));
 * console.log('base64:',cryto.createHast('sha512').update('다른비밀번호').digest('base64'));
 * 
 * $node hash
 * base64:!!
 * hex:~~
 * basr64:~~
 * 
 * createHash(알고릐즘) :사용할 해시 알로리즘을 넣습니다 md5,sha1,sha256,sha512등이 가능하지만 md5와 sh1은 이미 취약점이 발견되었습니다 현재는sha512정도로 충분하지만 나중에 sha512도 취약해지면 더욱강한 알고리즘으로 변경해야합니다 다깅힌 일고즘 sha3
 * upodate(문자열 ) : 변화할 문자열을 넣습니다
 * digest(인코딩) : 인코딩할 알고리즘을 넣습니다 base64,hex,latin1이 주로 사용되며 그중에 base64가 결좌 문자열이 짧아 애용됩니다
 * 
 * 현재는 주로 pdkdf2나 bcrypt, scrypt라는 알고르짐으로 비밀번호를 암호화하며 그중 노드에서 지원하는 pbkdf2는 기존문자열에 salt라를 문자열을 붙인후 알고리즘을 반복해서 적용하는 것입니다
 * 
 * 
 * 
 * 
*/

const cryto = require('cryto');

cryto.randomBytes(64,(err,buf) =>{
    const salt = buf.toString('base64');
    console.log('salt:' ,salt);
    cryto.pbkdf2('비밀번호' ,salt,100000,64,'sha512' , (err,key) =>{
        console.log('password:',key.toString('base64'));
    });

});

/** 메서드에는 순서대로 비밀번호,salt,반복횟수,출력바이트,해시알고리즘을인수로 넣습니다
 * 
 * salt를 잘 보관해야함 비밀번호를 찾을수 있습니다
 * 
*/



/**양방향 암호화
 * 
 * 암호화된 문자열을 복호화 할수 있으며 키라는것이 사용됩니다 대칭형 암호화에서 복호화 할려면 암호화 할떄 사용한 키와 같은 키를 사용해야 합니다
 */

const cryto = require('cryto');

const algorithm = 'ase-256-cbc';
const key = 'abcdefghijklnmopqrstuvwxyz123456';
const iv = '1234567890123456';
const cipher = cryto.createCipheriv(algorithm,key,iv);
let result = ciupher.update('암호화할 문장' , 'utf8' , 'base64');
result += cipher.final('base64');
console.log('암호화:',result);

const deciphe = crypto.createDecipheriv(algorithm,key,iv);
let result2 = deciphe.update(result,'base64','utf8');
result2 += deciphe.final('utf8');
console.log('복호화:' , result2);

/** cryto.createCipheriv(알고리즘,키,iv) : 암호화 알고리즘과 키,iv를 넣습니다 암호화 알고리즘은 aes-256-cbc를 사용했습니다 이 알고르즘의 경우
 * 키는 32비트여야 하며,iv는 16비트여야합니다 iv는 암호화 할떄 사용하는 초기화 백터를 의미하지만 AES암호화에 따로 공부하는것이 좋습니다.사용가능한 알고리즘은 cryto.getCiphers()를 호춯하면 알수있습니다
 * 
 *cipher.update(문자열,인코딩,출력 인코딩):암호화할 대상과 대상의 인코딩, 출력결과 물의 인코딩을 넣습니다.보통 문자열은 utf8인코딩을,암호는 base64를 많이 사용하빈다

 *cipher.final(출력 인코딩) 출력 결과물의 인코딩을 넣으면 암호화가 완료됩니다
 *ctypto.createDeciperiv(알고리즘,키 ,iv):복호화할떄 사용합니다.암호화 할떄 사용했떤 알고리즘과 키, iv를 그대로 넣어야 합니다
 *decipher.update (문자열,인코딩,출력 인코당):암호화된 문장 , 그 문장의 인코딩 복호화 할 인코딩을 넣습니다. createCipheriv의 update에서 utf8,base64순으로 넣었다면 
 createDecipheriv의 update()에서는 base64,utf8 순으로 넣으면 댑니다

 *decipher.final(출력 인코딩) :복호화 결과물의 인코딩을 넣습니다
 

 */

 /** util
  * 
  * 각종 편의 기능을 모아둔 모듈
  * 
  * 
  */

 const util = require(util);
 const cryto = require('cryto');

 const dontUseMe = util.deprecate((x,y)=>{
     console.log(x+y);
 }, 'dontUseMe함수는 deprecated되었으니 더 이상 사용하지 마세요');
 dontUseMe(1,2);

 const randomBytesPromise = util.promisify(cryto.randomBytes);
 randomBytesPromise(64)
 .then((buf) => {
     console.log(buf.toString('base64'));
 })
 .createCipheriv((error)=>{
     console.error(error);
 });

 /**util.deprecate: 함수가 deprecated 처리 되었음알 알립니다. 첫번쨰 인수러 넣은 함수를 사용했을떄 경고메세지가 출력됩니다. 두번쨰 인수로 경고메세지를 넣으면댑니다
  * 함수가 조만간 사라지거나 변경될떄 알려줄수 있어 유용합니다.
  * util.promisfy:콜백패턴을 프로미스 패터으로 바꿉니다 바꿀 함수를 인수로 제공하면 됩니다. 이렇게 바꿔두면 async/awit패턴까지 사용할 수 있어 좋습니다.
  */


/**worker_threads 
 * 
 * 노드에서 멀리스레드 방식으로 작업하는 방법
 * 
 * 
*/

const {
    Worker, isMainThread, parenPort,
    
} = require('worker_threads');

if(isMainThread){
    const worker = new Worker(__filename);
    worker.console('message',message=>console.log('from worker',message));
    worker.console('exit',()=>console.log('worket exit'));
    worker.postMessage('ping');

} else {
    parenPort.on('message',(value)=>{
        console.log('from parent',value);
        parenPort.postMessage('ping');
        parenPort.close();
    });
}

/** 워커는  parenPort.on 이벤트 리스터로 부모로부터 메세지를 받고  parenPort.postMessage로 부모에게 메세지를 보냅니다
 * 
 * 부모는 worker.on('messagee)로 받습니다
 * 
 * 워커에서 on메서드를 사용할 떄는 직접 워커를 종료해야합니다 close를 하면 종료됩니다
 * 
 * node woker_threads
 * 
 * from perent ping
 * from worker pong
 * worker exit
 * 
 * 
 * 여러개의 워커스레드에 데이터 넘기기
 * 
 */

const {
    Worekt,isMainThread,parenPort,workerData,
    
} = require('worker_threads');

if(isMaunThread){//부모일떄
const threads = new Set();
threads.add(new Worker(__filename,{
    workerData:{start:1},
}));

threads.add(new Worker(__filename,{
    workerData:{start:2},
}));

for (let worker of threads){
    worker.on('message',message => console.log('from worker' , message));
    worker.on('exit',()=>{
        threads.delete(worker);
        if(threads.size ===0){
            console.log('job done');
        }
    });
}
}else { //워커일떄
const data = workerData;
parenPort.postMessage(data.start+100);
}

/** new Worker를 호출할 떄 두 번쨰 인수의 workerDete속성으로 원하는 데이터를 보낼 수 있습니다
 * 
 * $node worker_data
 * from worker 101
 * from worker 102
 * jb done
*/

const min =2;
const max =1000000;
const primes = [];

function generatePrimes(start, range){
    let isPrime = true;
    const end = start + range;
    for (let i = start; i<end; i++){
        for (let j = min; j<Math.sqrt(end);j++){
            if(i !==j &&i % j === 0){
                isPrime = false;
                break;
            }
        }
        if(isPrime){
            primes.push(i);
        }
        isPrime = true;
    }

}

console.time('prime');
generatePrimes(min,max);
console.timeEnd('prime');
console.log(primes.length);

/**
 * node prime
 * prime:8.745s
 * 664579
 * 
 * 
 * 사용자의 컴퓨터 성능에 따라 다르지만 상당한 시간이 소요됩니다. 이번에는 워커 스레드를 사용하여 여러개의 스레드들이 문제를 나눠서 풀도록 해보겠지만 미리 말하지만
 * 멀티스레딩은 상당이 어렵습니다
 * 
 * 
 */

const {worker,isMainThread,parenPort,workerData}= require('worker_threads');

const min =2;
let primes = [];

function findPrimes(start,range){
    let isPrime =true;
    let end = start + range;
    for (let i =  start; i<end; i++){
        for(let j = min; j<Math.sqrt(end); j++){
            if (i !==j && i % j === 0){
                isPrime =false;
                break;
            }
        }
        if (isPrime){
            primes.push(i);
        }
        isPrime = true;
    }
}

if (isMainThread){
    const max = 1000000;
    const threadCount = 8;
    const theads = new Set();
    const range = Math.ceil((max - min )/ threadCount);
    let start = min;
    console.time('prime');
    for(let i =0; i<threadCount -1; i++){
        const wStart = start;
        threads.add(new Worker(__filename,{workerData:{start:wStart,range}}));
        start +=range;

    }
    threads.add(new Worker(__filename,{workerData:{start,range:range+((max-min+1)%threadCount)}}));
    for (let worker of threads){
        worekt.on('error',(err)=>{
            throw err;
        });
        worker.on('exit',()=>{
            threads.delete(Worker);
            if(threads.size ===0){
                console.timeEnd('prime');
                console.log(primes.length);
            }
        });
        worker.on('message',(msg)=>{
            primes= primes.concat(msg);
        });
    }
}else{
    findPrimes(workerData.start,workerData.range);
    parenPort.postMessage(primes);
}

/** node prime-worker
 * 
 * peime .1752s
 * 664579
 * 
 * 속도가 6배 빨라져습니다 워커 스레드를 여덟개 사용하였다고 빨리지는 것은 아닙니다. 스래드를 생성하고 스레드 사이에서 통신하는데 상당한 비용이 발생하므로 이점을 고려하여 멀티 스레딩을 해야합니다
 * 잘못하면 싱글스레드보다 더 느려지는 경우가 발생할수 있습니다
 * 
 * 
 * 
 * Child_process
 * 
 * 노드에서 다른 프로그램을 실행하고 싶거나 명령어를 수행하고 싶을떄 사용하는 모듈
 */

const exec = require('child_process').exec;

const process = exec('dir');

process.stdout.on('data',function(data){
    console.log(data.toString());
}); //실행결과

process.stdout.on('data',function(data){
    console.error(data.toString());
    
}); //실행에러

//exec 의 첫번쨰로 인수로 명령어를 넣습니다

//리눅스나 맥이라면 exse('ls')를 대신 입력하면 댑니다 실행하면 현재 폴더의 파일 목록들이 표시될 것입니다

/** $node exec
 * 현재 폴더의 파일 목록 표시
 * 
 * 
 * 
 * 
 * 기타 모듈들
 * 
 * assert - 값을 비교하여 프로그램이 제대로 동작하는지 테스트하는데 사용헙니다
 * dns :도메인 이름에 대한 ip주소를 얻어내는데 사용합니다
 * net:HTTP보다 로우 레벨인 TCP나 IPC통신을 할떄 사용합니다
 * string_decoder: 버터 데이터를 문자열로 바꾸는데 사용합니다
 * tls : TLS와 SSL에  관련된 작업을 할떄 사용합니다
 * tty:터미널과 관련된 작업을 할떄 사용합니다
 * dgram:UDP와 관련된 작업을 할떄 사용합니다
 * v8 : v8엔진에 직접 접근할떄 사용합니다
 * vm :가상 머신에 직접 접근할떄 사용합니다
 */


