/**  fs 모듈은 파일 시스템에 접근하는 모듈입니다 즉 파일을 생성하거나 삭제하고 읽거나 쓸수 있습니다. 폴더도 만들거나 지울 수 있습니다 웹 브라우저에서 자바스크립트를 사용할 떄는 일부를
 * 재외하고는 파일 시스템 접근이 금지되어 있으므로 노드의 fs모듈이 낮설것입니다.
 * 
 */

const fs = require('fs');

fs.readFile('./readme.txt',(err,data)=>{
    if (err){
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});

/**fs 모듈을 불러온뒤 읽을 파일의 경로를 지정합니다 여기서는 파일의 경로가 현재 파일 기준이 아니라 node명령어기준이 아니라 node명령어를 실행하는 콘솔 기준이라는 점에 유의해야합니다
 * 
 * readFile의 결과물은 buffer라는 형식으로 제공됩나다 지금은 단순히 버퍼를 메모리의 데이터 라고 생각하면 됩니다
 * 
 * fs 는 기본적으로 콜백 형식의 모듈이므로 실무에서 사용하기가 불편합니다 따라서 fs모듈을 프로미스 형식으로 바꿔주는 방법을 사용합니다
 * 
 * 
 */

const fs = require('fs').promises;

fs.readFile('./readme.txt')
.then((data)=>{
    console.log(data);
    console.log(data.toString());

})
.catch((err)=>{
    console.error(err);
});

//fs 모듈에서 promise속성을 불러오면 프로미스 기반의fs모듈을 사용할 수 있게 됩니다

const fs = require('fs').promises;

fs.watchFile('./writeme.txt','글이 입력됩니다')
.then(()=>{
    return fs.readFile('./writme.txt');

})
.then((data)=>{
    console.log(data.toString());
})
.catch((err)=>{
    console.error(err);
});


//비동기 메서드와 동기 메서드

const fs = require('fs');

console.log('시작');ㅂ
fs.readFile('./readme2.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.log('1번',data.toString());
});
fs.readFile('./readme2.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.log('2번',data.toString());
});
fs.readFile('./readme2.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.timeLog('3번',data.toString());
});
console.log('끝');

/** 시작과 끝을제외하고는 결과 순서가 다를수 있습니다 비동기 메서드들은 백그라운드에 해달파일을 읽으라고만 요청하고 다음작업으로 넘어갑니다
 * 따라서 읽기 요청만 세번 보내고 끝을찍습니다 나중에 읽기가 완료되면 백그라운드가 다시 메인스레드에 알립니다 메인스레드는 그제서애 등록된 콜백함수를 실행합니다
 * 
 * 이 방식은 상당히 유용합니다 수백개의 I/O요청이 들어와도 메인 스레드는 백그라운드에 요청처리를 위임합니다 그 후로도 얼마든지 요청을 받을수 있습니다
 * 나중에 백그라운드가 각각의 요청처리가 완료되었다고 알리면 그떄 콜백함수를 처리하면 됩니다
 * 
 * 
 * 
 * 동기와 비동기 블로킹과 논 블러킹
 * 
 * 동기와 비동기 : 백그라운드 작업 완료 확인 여부
 * 블로킹과 논블로킹 함수가 바로 return되는지 야부
 * 
 * 노드에서는 동기 -블로킹방식과  비동기 논 블로킹 방식이 대부분입니다 동기 - 논블로킹이나 비동이 -블로킹은 없다고 봐도 됩니다
 * 동기 블로킹방식에서는 백그라운드 작업 완료 여부를 계속 확인하며 호출함수가 바로 return되지 않고 백그라운드 작업이 끝나야 return됩니다
 * 
 * 비동기 -논 블로킹 방식에서는 호출함수가 바로 return되어 다음작업으로 넘어가며 백그라운드 작업 완료 여부는 신경 쓰지 않고 나중에 백그라운드가 알림을 줄때 비로서 처리합니다
 */

const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('./readme2.txt');
console.log('1번',data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('2번',data.toString());
data=fs.readFileSync('./readme2.txt');
console.log('3번' , data.toString());
console.log('끝');

//readfile대신 readfilesync메서드를 사용했습니다 그런데 콜백함수 대신 직접 리턴값을 받아옵니다

/**  코드는 이해하기 쉽지만 치명적인 단점이 있습니다
 * readFileSync매서드를 사용하면 요청이 수백개 이상 들어올때 성능에 문제가 생깁니다 sync메서드를 사용할 떄는 이전 작업이 완료되어야 다음 작업을 진행 할 수 있습니다
 * 즉 백그라운드가 작업하는 동안에는 메인스레드는 대기하고 있어야합니다
 * 백그라운드는 fs작업을 동시에 처리할 수 있는데 sync메서드를 사용하면 백그라운드조차 동시에 처리 할 수 없게 됩니다
 * 비동기 fs메서드를 사용하면 백그라운드가 동시에 처리 할수 있고 메인 스레드는 다음작업을 처리할수 있습니다
 * 
 * 동기 메서드들은 sync가 붙어있어 구분하기 쉽습니다
 */

//비동가 방식으로 하되 순서를 유지하고 싶을면

const fs= require('fs');

console.log('시작');
fs.readFile('./readme2.txt',(err,data)=>{
    if(err){
        throw err;
    }
    consolr.log('1반',data.toString());
    fs.readFile('./readme2.txt',(err,data)=>{
        if(err){
            throw err;
        }
        console.log('2번',data.toString());
        fs.readFile('./readme2.txt',(err,data)=>{
            if(err){
                throw err;
            }
            console.log('3번',data.toString());
            console.log('끝');
        });
    });
});

//콜백지옥이 펼쳐지지만적어도 순서가 어긋나는일은 없습니다

//async/await으로 해결가능

const fs = require('fs').promises;

console.log('시작');
fs.readFile('./readme2.txt')
.then((data)=>{
    console.log('1번',data.toString());
    return fs.readFile('./readme2.txt');
})
.then((data)=>{
    console.log('2번',data.toString());
    return fs.readFile('./readme2.txt');

})
.then((data)=>{
    console.log('3번',data.toString());
    console.log('끝');
})
.catch((err)=>{
    console.error(err);
});

/** readfile에서 받아온 데이터를 data.tostring으로 변환하는 이유는 data가 버퍼이기 때문
 * 
 * 파일을 읽거나 쓰는 방식에는 크게 두가지 방식 즉 버퍼를 이요하는 방식 스트림을 이용하는 방식이 있습니다
 * 
 * 영상을 로딩할떄는 버퍼링 한다 하고 영상을 실시간 송출할떄는 스트리밍 한다고 합니다
 * 
 * 버퍼링은 영상을 재생할수 있을떄까지 데이터를 모으는 과정이고 스트링은 방송인의 컴퓨터에서 시청자의 컴퓨터로 영상 데이터를 조금씩 전송하는 방식입니다.
 *  앞에서 readfile를 사용할떄 읽엇던 파일이 버퍼 형식으로 출력되엇습니다 노드는 파일을 읽을떄 파일 크기만큼 공간을 마련해 두며  파일 데이터를 메모리에 저장한 뒤
 * 사용자가 조작할 수 있게 합니다 이떄 메모리에 저장된 데이터가 바로 버퍼 입니다,
 * 여기에 버퍼를 직접 다룰수 있는 클래스가 buffer입니다
 * 
 */

const buffer = Buffer.from('저를 버퍼로 바꿔보새요');
console.log('from():',buffer);
console.log('length:' ,buffer.length);
console.log('toString():' ,buffer.toString());

const array  = [Buffer.from('띄엄'),Buffer.from('띄엄'),Buffer.from('띄어쓰기')];
const buffer2=Buffer.concat(array);
console.log('concat():',buffer2.toString());

const buffer3=Buffer.alloc(5);
console.log('alloc():',buffer3);

/**
 * from(문자열) :문자열을 버퍼로 바꿀수 있습니다 length속성은 버퍼의 크기를 알립니다 바이트 단위입니다
 * toString(바파) : 버퍼를 다시 문자열로 바꿀수 있습니다 이떄 base64나 ,hex를 인수로 넣으면 해당 인코딩으로도 변환 가능합니다
 * concat(배얄):배열 안에든 버퍼드들을 하나로 합칩니다
 * alloc(바이트) :빈 버퍼를 생성합니다 바이틀를 인수로 넣으면 해당 크기의 버퍼가 생성됩니다
 * 
 * reafile 방식의 버퍼가 편리하기는 하지만 문제점도 있습니다 용량이 100mb인 파일이잇으면 매모리에 100mb크기의 버퍼를 만들어야 합니다
 * 또한 모든 내용을 다쓴후에야 다음 동작으로 넘어가므로 파일 일기, 압축 파일쓰기 등 조작을 연달아 할떄 매번 전체 용량을 버퍼로 처리해야 다음단계로 넘어갈수 잇습니다
 * 
 * 그래서 버퍼의 크기를 작게 만든후 여러번 나누어 보내는 스트림 방식이 등장했습니다
 *  
 * 
 * */

const fs = require('fs');
const readStream = fs.createReadStream('./readme3.txt',{highWaterMark:16});
const data = [];

readStream.on('data',(chunk)=>{
    data.push(chunk);
    console.log('data:',chunk,chunk.length);
});
readStream.on('end',()=>{
    console.log('end :',Buffer.concat(data).toString());

});

readStream.on('error',(err)=>{
    console.log('error : ',err);
});

/** 먼저 createReadStream으로 읽기 스트림을 만듭니다 첫 번쨰 인수로 읽을 파일 경로를 넣습니다
 * 두번쨰 인수는 옵션 객체인데 highWaterMark 라는 옵션이 버퍼의 크기(바이트단위)를 정할 수 있는 옵션입니다
 * 기본값은 64kb이지만 여러번 나눠서 보내는 모습을 보여주기 위해 16으로 낮추엇습니다
 * readStream은 이벤트 리스너를 붙여서 사용합니다 보통 data,end,error이벤트를 사용하빈다
 * 
 * 
 * 이번에는 파일을 써보겟습니다
 */

const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2.txt');
writeStream.on('finish',()=>{
    console.log('파일 쓰기 완료');
});

writeStream.write('이 글을 씁니다./n');
writeStream.write('한 번 더 씁니다');
writeStream.end();

/**  먼저 createWriteStream으로 쓰기 스트림을 만듭니다 첫번쨰 인수로는 파일명을 입력 두번쨰는 옵션을 넣습니다
 * writeStream에서 제공하는 write메서드로 넣을 데이터를 씁니다 여러번 호출할수 있습니다
*/

const fs = require('fs');

const readStream =fs.createReadStream('readme4.txt');
const writeStream =fs.createWriteStream('writeme3.txt');
readStream.pipe(writeStream);

/** readme4와 같은 내용의 writeme3가 생성되었을 것입니다 미리 읽기 스트림과 쓰기 스트림을 만들어 둔 후 두개의 스트림 사이를 pipe메서드로 연결하면
 * 저절로 데이터가 writeStream으로 넘어갑니다
 * pipe는 스트림 사이에 여러번 연결할 수 있습니다 
 * 
 * 다음은 파일을 읽은 후 gzip방식으로 압축하는 코드입니다
 * 
 */

const zip=require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./readme4.txt');
const zlibStream = Zlib.createGzip();
const writeStream = fs.createWriteStream('./readme4.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);

/**노드에서 파일을 압축하믄 zlib라는 모듈도 존재합니다
 * 
 * 
 * 다음은 1gb용량의 텍스트 파일을 만드는 코드입니다 먼저 드리이브에 충분한 용량이 있는지 확인해야합니다
 * 
 * 
 */

const fs =require('fs');
const file = fs.createWriteStream('./big.txt');

for (let i = 0;i<=1000000; i++){
    file.write('안녕하세요 엄청나넥 큰 파일을 만들어 볼 것입니다/n')

}
file.end();

//readfile메서드를 사용하여 big.txt를 big2로 복사해보겠습니다

const fs = require('fs');
console.log('before:',process.memoryUsage().rss);
const data1= fs.readFileSync('./big.txt');
fs.writeFileSync('./big.txt',data1);
console.log('buffer:',process.memoryUsage().rss);

/**node buffer-memory
 * 
 * before 18137088
 * buffer 1019133952
 */

//처음 18mb파일이 1gb가 넘었씁니다이번에는 스트림을 사용하여 big3으로 복사해보겠습니다

const fs= fs.require('fs');

console.log('before:',process.memoryUsage().rss);
const readStream =fs.createReadStream('./big.txt');
const writeStream = fs.createWriteStream('./big3.txt');
readStream.pipe(writeStream);
readStream.on('end',()=>{
    console.log('stream:',process.memoryUsage().rss);
});

/** 스트림을 사용하여 복사햇더니 메모리를 62mb  밖에 차지하지 않앗습니다 큰 파일을 조각내어 버퍼 단위로 옮겻기 떄문입니다
 * 이렇게 스트림을 이요하면 효과적으로 데이터를 전송할 수 있습니다 동영상 같은 파일을 전솔할떄는 이러한 이유로 스트림을 사용합니다
 */

//fs 는 파일 시스템을 조작하는 다양한 메서드르 제공합니다 지금까지는 단순히 파일 읽기 쓰기를 했지만 파일을 생성허고 삭제할수 있으며 폴더를 생성하고 삭제할수도 있습니다

const fs = require('fs').promises;
const contants = require('fs').constants;

fs.access('./folder', contants.F_OK | contants.W_OK | contants.R_OK)
.then(()=>{
    return Promise.reject('이미 폴더 있음');
})
.catch((err)=>{
    if(err.code === 'ENOENT'){
        console.log('폴더없음');
        return fs.mkdir('./folder');

    }
    return Promise.reject(err);
})
.then(()=>{
    console.log('폴더 만들기 성공');
    return fs.open('./folder/file.js','w');
})
.then((fd)=>{
    console.log('빈 파일 만들기 성공',fd);
    return fs.rename('./folder/file.js','./folder/newfile.js');
})
.then(()=>{
    console.log('이름 바꾸기 성공');
})
.catch((err)=>{
    console.log(err);
});

/**node fsCreate
 * 
 * 폴더없음
 * 폴더만들기 상공
 * 빈 파일 만들기 성공 3
 * 이름 바꾸기 성공
 * 
 * node fsCreate
 * 이미 폴더있음
 * 
 * 
 * 
 * 
 * 비동기 메서드
 * 
 * fs.access(경로,옵션,콜백):폴더나 파일에 접근할 수 있는지를 체크합니다 두번재 인수로 상수들을 넣었습니다 f_ok는 파일 존재 여부
 * r_ok는 읽기 권한 여부 ,W_ok는 쓰기 권한 여부를 체크합니다 파일/폴더나 권한이 없다면 에러갑 발생하는데 파일/폴더가 없을떄의 에러코드는 ENOENT입니다
 * fa.mkdir(경로.콜백): 폴더를 만드는 메서드입니다 이미 폴더가 있다면 에러가 발생하므로 먼저 access메서드를 호춯하여 확인 하는 것링중요합니다
 * fs.open(걍로,옵션,콜백) : 파일의 아이디(fd)를 가져오는 메서드 입니다 파일이 없다면 파일을 생성한 뒤 그 아이디를 가져옵니다 가져온 아이디를 사용해 fs.read나 fs.write로 읽거나 쓸수 있습니다
 * 두번쨰 인수로 어떤 동작을 할것인지를 설정 할수 있습니다 쓰려면 w.읽으려면 r.가본파일에 추가하려면 a입니다 앞의 예제에서는 w했으므로 파일이 없을떄 새로 만들 수 있엇습니다 r이엇다면 에러가 발생햇을것 입니다.
 * fs.rename(기존 경로,새 걍로,콜백) ; 파일의 이름을 바꾸는 메서드입니다 기존 파일 위치와 새로운 파일 위치를 적으면 됩니다 꼭 같은 폴더를 지정할 필요는 없으므로 잘라내기 같은 기능을 사용할수 있습니다
 * 
 */

//폴더 내용 확인 및 삭제와 관련된 메서드

const fs = require('fs').promises;

fs.readdir('./folder')
.then((dir)=>{
    console.log('폴더 내용 확인',dir);
    return fs.unlink('./folder/newFile.js');
})
.then(()=>{
    console.log('파일 삭제 성공');
    return fs.rmdir('./folder');
})
.then(()=>{
    console.log('폴더 삭제 상공');
})
.catch((err)=>{
    console.error(err);
});

/** fs.readdir(경로,콜백) :폴더 안의 내용물을 확인할 수 있습니다 배열안에 내부 파일과 폴더 명이 나옵니다
 * fs.unlink(경로,콜백):파일을 지울 수 있습니다 파일이 없다면 에러가 발생하므로 먼저 파일이 있는지를 꼭 확인해야합니다
 * 
 * fs.rmdir(경로,콜백) :폴더를 지울수 있습니다 폴더 안에 파일들이 있다면 에러가 발생하므로 먼저 내부 파일을 모두 지우고 호출해야합니다
 * 
 * node fsDelete 를 한번 더하면 ENOENT에러가 발생합니다 존재하지 않는 파일을 지웟다는 에러입니다
 * 
 * 노드 8.5버전에서는 createReadStream과  createWtiteStream을 pick을 하지 않아도 파일을 복사 할 수 있습니다 
 * 
*/

const fs = require('fs').promises;

fs.copyFile('readme4.txt','writeme4.txt')
.then(()=>{
    console.log('복사완려');
})
.catch((error)=>{
    console.error(error);
});

//readme.txt와 동일한 내용의 writeme4가 생성되었을 것입니다 첫번째 인수로 복사할 파일 두번쨰 인수로 복사될 경로를 세버쨰 인수로 복사후 실행될 콜백함수를 넣어줍니다

//마지막으로 파일/폴더의 변경사항을 감시 할 수 있는 Watch메서드를 알아보겠습니다 빈 파일인 target.txt를 만들고 watch.js를 작성합니다

const fs = require('fs');
fs.watch('./target.txt',(eventType,filename)=>{
    console.log(eventType,filename);
});

//watch.js를 실행하고 target.txt의 내용물을 수정해봅니디
//node watch
//내용물 수정후
//change target.txt
//change target.txt

//파일 명 변경 또는 파일 삭제 후
//rename target.txt

//rename이벤트가 발생한 후에는 더이상 watch가 수행되지 않습니다

/** 비동기 메서드들은 백그라운드에서 실행되고 실행된 후에는 다시 메인 스레드의 콜백함수나 프로미스의 then부분이 실행됩니다 이떄 fs메서드를 여러번 실행해도 백그라운드에서
 * 동시에 처리되는데 스레드 풀이 있기떄문에 가능합니다
 * 
 * 
 */

const cryto = require('crypto');

const pass = 'psss';
const salt = 'salt';
const start = Date.now();

cryto.pbkdf2(pass,salt,1000000,128,'sha512',()=>{
    console.log('1:',Date.now() =start);
});

cryto.pbkdf2(pass,salt,1000000,128,'sha512',()=>{
    console.log('2:',Date.now() -start);
});
cryto.pbkdf2(pass,salt,1000000,128,'sha512',()=>{
    console.log('3:',Date.now() -start);
});
cryto.pbkdf2(pass,salt,1000000,128,'sha512',()=>{
    console.log('4:',Date.now() -start);
});
cryto.pbkdf2(pass,salt,1000000,128,'sha512',()=>{
    console.log('5:',Date.now() -start);
});
cryto.pbkdf2(pass,salt,1000000,128,'sha512',()=>{
    console.log('6:',Date.now() -start);
});
cryto.pbkdf2(pass,salt,1000000,128,'sha512',()=>{
    console.log('7:',Date.now() -start);
});
cryto.pbkdf2(pass,salt,1000000,128,'sha512',()=>{
    console.log('8:',Date.now() -start);
});

/** node threadpool
 * 4:1548
 * 2:1583
 * 1:1590
 * 3:1695
 * 6:3326
 * 5:3463
 * 7:3659
 * 8:3682
 * 
 * 실행될떄마다 시간과 순서가 달라집니다. 스레드풀이 작업을 동시에 처리 하므로 여덟개의 작업중에서 어느 것이 처리 될줄 모릅니다 하지만 하나의 규칙을 발견할 수는 있습니다 1~4가 그룹으로 묶여져 있고
 * 5~8이 그룹으로 묶여져 있고 5~8이 1~4보다 시간이 더 소요됩니다 바로 기본저긴 스레드풀의 개수가 네개이기 떄문입니다 스레드풀이 네게이므로 처음 네작업이 동시에 실행되고 그것들이 종료되면
 * 다음네게의 작업이 실행됩니다
 * 우리는 스레드풀을 직접 컨트롤 할수는 없지만 개수를 조절할수는 있습니다
 * 터미널에 맥이라면 UV_THREADPOOL_SIZE=1을 입력한후 다시 node threadpool 명령어를 입렵해보세요 작업이 순서대로 실행돨 것입니다
 * 
*/