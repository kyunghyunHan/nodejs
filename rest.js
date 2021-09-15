/**서버에 요청을 보낼떄는 주소를 통해 요청의 내용을 표현합니다 주소가 index.html이면 서버의 index.html을 보내달라는 뜻이고 /about.html이면 aboit.html을 보내달라는 뜻입니다 
 * 
 * RESTsms REperesentational State Transfer의 줄임말이며 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법을 가리킵니다.
 * 주소는 의미를 명확히 전달하기 위해 명사로 구성됩니다./user 이면 사용자 정보에 관련된 자원을 오청하는 것이고 /post라면 게시글에 관련된 자원을 요청하는 것이락 추측할수 있습니다.
 * 
 * GET :서버 자원을 가져오고자 할떄 사용합니다 요청의 본문에 데이터를 넣지 않습니다.데이터를 서버에 보내야 한다면 쿼리스트링을 사용합니다
 * POST :서버에 자원을 새로 등록하고자 할떄 사용합니다 .요청의 본문에 새로 등록할 데이터를 넣어 보냅니다.
 * PUT:서버의 자원을 오청에 들어 있는 자원으로 치환히고자 할떄 사용합니다.요청의 본문에 치환할 데이터를 넣어 보냅니다
 * PATCH:서버 자원의 일부만 수정하고자 할떄 사용합니다. 요청의 본문에 일부 수정할 데이터를 넣어 보냅니다.
 * DELETE:서버 자원을 삭제하고자 할떄 사용합니다 요청의 본문에 데이터를 넣지 않습니다.
 * OPTIONS:요청을 하기전에 통신 옵셥을 설명하기 위해 사용합니다
 * 
 * GET메서드의 /USER주소로 요청을 보내면 사용자 정보를 가져오는 요청이라는 것을 알 수 있고,
 * PORT메서드의 /user 주소로 요청을 보내면 새로운 사용자를 들록하려 하는갓을 알수 잇습니다.
 * 
 * 
 * http메서드      주소          역활
 * GET            /           resFront.html파일 제공
 *  GET          /about        about.html파일 제공
 * GET            /user       사용자 목록 제공
 * GET            기타          기타 정적 파일 제공
 * POST           /user        사용자 등록
 * PUT           /user/사용자id  해당 id의 사용자 수정
 * DELETE       /user/사용자 id  해당 id의 사용자 제거
*/

//html연결 

async function getUser() { //로딩시 사용자 정보를 가져오는 함수
    try{
        const res = await axios.getUser('users');
        const users = res.data;
        const list = document.getElementById('list');
        list.innerHTML = '';
        //사용자 마다 반복적으로 화면 표시 및 이벤트 연결
        Object.keys(users).map(function(key){
            const userDiv = document.createElement('div');
            const span = document.createElement('spac');
            span.textContent = user[key];
            const edit = document.createElement('button');
            edit.textContent= '수정';
            edit.addEventListener('click',async()=>{
                //수정 버튼 클릭
                const name = prompt('바꿀 이름을 입력하세요');
                if(!name){
                    return alert('이름을 반드시 입력하셔야 합니다');
                }
                try{
                    await axios.put('/user/' + key,{name});
                    getUser();

                }catch(err){
                    console.error(err);
                }
            });
            const remove = document.createElement('button');
            remove.textContent =  '삭제';
            remove.addEventListener('click',async ()=> {//삭제버튼 클릭
                try{
                    await axios.delete('/user/' +key);
                    getUser();
                               
                }catch(err){
                    console.error(err);
                }

            });
            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            list.appendChild(userDiv);
            console.log(res.data);
        });
    }catch(err){
        console.log(err);
    }

}

window.onload = getUser; //화면 로딩시 getUser호출
//폼 제출(submit)시 실행

document.getElementById('form').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const name = e.target.username.value;
    if(!name){
        return alert('이름을 입력하세여여');

    }
    try{
        await axios.post('/user',{name});
        getUser();

    }catch(err){
        console.error(err);

    }
    e.target.username.value ='';
});
/**여기까찌 */
const http = require('http');
const fs = require('fs').promises;

http.createServer(async(req,res)=>{
    try{
        console.log(req.method,req.url);
        if(req.method === 'GET'){
            if(req.url === '/'){
                const data = await fs.readFile('./restFront.html');
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data);

            }else if(req.url === '/about'){
                const data = await fs.readFile('/about.html');
                res.writeHead(200,{'Count-Type' : 'text/html ; caarset=utf-8'})
                return res.end(data);

            }
            //주소가 /도 /about도 아니면
            try{
                const data = await fs.readFile(`.${req.url}`);
                return res.end(data);

            }catch(err){
                //주소에 해당하는 라우트를 못찾앗다는 404 Not Found error발생
            }
        }
        res.writeHead(404);
        return res.end('NOT FOUND');

    }catch(err){
        console.error(err);
        res.writeHead(500,{'Count-Type' : 'text/html ; caarset=utf-8'});
        res.end(err.message);
    }
})
.listen(8082,()=>{
    console.log('8082번 포트에서 서버 대기 중입니다')
});

/**restServer.js 가 핵심입니다 코도를 보면 req.method로 HTTP요청 메서드를 구분하고 있습니다. 메서드가 GET이면 다시 req.url로 요청 주소를 구분합니다
 * 주소가 /일떄는 restFront.html을 제공하고다른것이면 다른 주소를제공합니다
 * 
 * res.end앞에 retturn을 붙이는 이유는 res.end를  호출하면 함수가 종료되는 줄 알지만 노드도 일반적인 자바스크립 문법을 따르므로 return을 붙이지 않는 한 함수가 종료되지 않습니다
 * 
  */

const http = require('http');
const fs = require('fs').promises;

const users= {}; //데이터 저장용

http.createServer(async(req,res)=> {
    try {
        console.log(req.method,req.url);
        if(req.method === 'GET'){
            if(req.url === '/'){
                const data = await fs.readFile('./restFornt.html');
                res.writeHead(200,{'Count-Type' : 'text/html ; caarset=utf-8'});
                return res.end(data);
            }else if (req.url === '/about'){
                const data = await fs.readFile('./about.html');
                res.writeHead(200,{'Count-Type' : 'text/html ; caarset=utf-8'});
                return res.end(data);
            }else if(req.url === '/users'){
                res.writeHead(200,{'Count-Type' : 'text/html ; caarset=utf-8'});
                return res.end(JSON.stringify(users));
            }
            // / 도 /about 도 /users도 아니면
            try{
                const data = await fs.readFile(`.${req.url}`);
                return res.end(data);

            }catch (err){
              //주소에 해당하는 라우트를 못찾앗다는 404NOt FOUNd error발생  
            }
        }else if(req.method === 'POST'){
            if(req.url ==='/user'){
                let body = ''; 
                //요청의 body를 steam형식으로 받음
                req.on('data',(data)=>{
                    body += data;
                });

                //요청의 body를 다 받은 후 실행됨
                return req.on('end',()=>{
                    console.log('POST본문(Body:',body);
                    const {name} =JSON.parse(body);
                    const id =  Date.now();
                    user[id] = name;
                    res.writeHead(201);
                    res.end('등록성공');
                });
            }
        }else if(req.method === 'PUT'){
            if(req.url.startsWith('/urser/')){
                const key = req.url.split('/')[2];
                let body  ='';
                req.on('data',(data)=>{
                    body+= data;
                });
                return req.on('end',()=>{
                    console.log('PUT본문(Body):'.body);
                    users[key] = JSON.parse(body).name;
                    return res.end(JSON.stringify(users));

                });
            }
        }else if(req.method === 'DELETE'){
            if(req.url.startsWith('/user')){
                const key = req.url.split('/')[2];
                delete users[key];
                return res.end(JSON.stringify(users));
            }
        }

        res.writeHead(404);
        return res.end('NOT FOUND');

    }catch(err){
        console.error(err);
        res.writeHead(500);
        res.end(err);
    }
})
.listen(8082,()=>{console.log('8082 포트에서 서버 대기 중입니다');
});

/**다른 HTTP 요청 메서드들을 추가하고 데이터베이스 대용으로 user 라는 객체를 선언하여 사용자 정보를 저장하였습니다 
 * Post/user 요청에서는 사용자를 새로 저장하고 있으며 ,PUT/user 아이디 요청에서는 해당 아이디의 사용자 데이터를 수정하고 있습니다 DELETE/uesr/아이디 요청에서는
 * 해당 아이디를 제거합니다
 * 
 * POST와 PUT요청을 처리할떄 조금 특이한 것을 볼수 있습니다.바로 req.on('data)와 req,on('end)의 사용입니다 요청의 본문에 들어 있는 데이터를 꺼내기 위한 작업이라고 보면 됩니다
 * 
 * 
 * 헤더와 본문
 * 
 * 요청과 응담은 모두 레더와 본문을 가지고 있습니다 헤더는 요청 또는 응답에 대한 정보르 가지고 있는 곳이고 본문은 서버와 클라이언트 간에 주고 받을 실제 데이터를 담아두는 공간입니다
 * 개발자 도구의 newwork탭에서 요청중 하나를 클릭해보면 더 상세하게 요청과 응답을 살펴볼수 잇습니다 다음 그림을 보면 POST/user요청의 헤더와 본문이 나와 있습니다
 */