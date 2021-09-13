const http = require('http');
const fs = require('fs').promises;

const users= {}; //데이터 저장용

http.createServer(async(req,res)=> {
    try {
        console.log(req.method, req.url);
        if(req.method === 'GET'){
            if(req.url === '/'){
                const data = await fs.readFile('./restFront.html');
                res.writeHead(200,{'Count-Type' : 'text/html ; charset=utf-8'});
                return res.end(data);
            }else if (req.url === '/about'){
                const data = await fs.readFile('./about.html');
                res.writeHead(200,{'Count-Type' : 'text/html ; charset=utf-8'});
                return res.end(data);
            }else if(req.url === '/users'){
                res.writeHead(200,{'Count-Type' : 'text/html ; charset=utf-8'});
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
                    users[id] = name;
                    res.writeHead(201);
                    res.end('등록성공');
                });
            }
        }else if(req.method === 'PUT'){
            if(req.url.startsWith('/user/')){
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
            if(req.url.startsWith('/user/')){
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